# AWS CodeBuild Manual Setup Guide

## Table of Contents
1. [Creating a CodeBuild Project](#creating-a-codebuild-project)
2. [Connecting GitHub](#connecting-github)
3. [Configuring Environment](#configuring-environment)
4. [Setting Environment Variables](#setting-environment-variables)
5. [IAM Role Configuration](#iam-role-configuration)
6. [Running Builds](#running-builds)
7. [Monitoring Builds](#monitoring-builds)
8. [Troubleshooting](#troubleshooting)

---

## Creating a CodeBuild Project

### Step 1: Navigate to AWS CodeBuild Console

1. Open [AWS Console](https://console.aws.amazon.com/)
2. Search for "CodeBuild" in the search bar
3. Click on **AWS CodeBuild**
4. Click **Create build project** (blue button)

### Step 2: Project Configuration

**Section: Project Name and Description**

- **Project name:** `flyora-shop-build`
  - Use kebab-case (lowercase with hyphens)
  - This will be referenced in logs and pipelines

- **Description:** (optional)
  ```
  React frontend build and deployment to S3 + CloudFront
  ```

- **Build badge:** (optional)
  - Enable to get a badge for your README

### Step 3: Source Configuration

**Section: Source**

1. **Source provider:** Click dropdown → Select **GitHub**

2. **Repository:**
   - Select **Repository in my GitHub account**
   - Click **Connect using OAuth** (if first time)
   - GitHub will ask for permissions → **Authorize aws-codesuite**

3. **Repository name:**
   - Search and select `QuangHieu-lab/Flyora-shop`
   - Or paste: `https://github.com/QuangHieu-lab/Flyora-shop`

4. **Source version (optional):**
   - Leave blank for default (main)
   - Or specify: `main`, `develop`, etc.

### Step 4: Primary Source Webhook Triggers (Optional)

**Section: Primary source webhook events**

Enable if you want automatic builds on push:

- ☑ **Rebuild every time a code change is pushed to this repository**

**Which events should trigger a rebuild?**
- ☑ **Push** (for commits)
- ☑ **Pull request** (for PRs)

**Branch filter:**
- Select **Include** 
- Pattern: `main` (or use `.*` for all branches)

---

## Configuring Environment

### Step 5: Environment Configuration

**Section: Environment**

1. **Environment image:** Select **Managed image**
   - Other option is "Custom image" (for Docker images)

2. **Operating system:** Select **Ubuntu**
   - Other options: Amazon Linux, Windows

3. **Runtime(s):** Select **Node.js**
   - Runtime versions available: 14, 16, 18, 20

4. **Runtime version:** Select **18** (or latest LTS)
   ```
   Node.js 18.x is recommended for React 19
   ```

5. **Image:** Select **Standard**
   - Standard: General purpose (most common)
   - Other options: AWS CodeBuild curated images

6. **Image version:** Select **Latest** or specific version
   - Latest is recommended for security updates

7. **Privileged:** ☑ (if you want to run Docker)
   - Needed only for building Docker images
   - For S3 + CloudFront: Leave unchecked

8. **Service role:** 
   - Select **New service role**
   - Role name: `codebuild-flyora-shop-build-role`
   - CodeBuild will create the IAM role automatically

---

## Setting Environment Variables

### Step 6: Additional Configuration

**Section: Additional configuration** (Expand this)

1. **Environment variables** - Click **Add environment variable**

Add these variables one by one:

**Variable 1:**
- **Name:** `AWS_REGION`
- **Value:** `ap-southeast-1` (your region)
- **Type:** Plaintext

**Variable 2:**
- **Name:** `AWS_S3_BUCKET`
- **Value:** `flyora-shop-prod` (your bucket name)
- **Type:** Plaintext

**Variable 3:**
- **Name:** `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- **Value:** `E1234ABCDEF...` (your distribution ID)
- **Type:** Plaintext

**Variable 4 (Optional):**
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Type:** Plaintext

**For Sensitive Data (API Keys, etc.):**
- **Type:** Select **Secrets Manager** instead of Plaintext
- **Value:** `arn:aws:secretsmanager:region:account:secret:name`

**VPC Configuration (Optional):**
- Leave default unless your backend is in a VPC
- VPC: None
- Subnets: (empty)
- Security groups: (empty)

**Compute resources:**
- **Compute type:** `BUILD_GENERAL1_SMALL` (default, cheapest)
  - Options: SMALL ($0.005/min), MEDIUM ($0.01/min), LARGE ($0.02/min)
- **Capacity:** Keep as is (auto-scaling)

---

## IAM Role Configuration

### Step 7: Update Service Role Permissions

CodeBuild automatically creates a role, but you need to add permissions.

**Using AWS Console:**

1. Go to **IAM** → **Roles**
2. Search for `codebuild-flyora-shop-build-role`
3. Click on it
4. Click **Add permissions** → **Attach policies**

**Attach these policies:**

1. **For S3 Access:**
   - Search: `AmazonS3FullAccess`
   - ☑ Select it
   - Click **Attach policies**

2. **For CloudFront:**
   - Create custom policy (more secure):
   - Click **Add inline policy**
   - Copy this JSON:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation",
           "cloudfront:GetDistribution",
           "cloudfront:ListDistributions"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

3. **For CloudWatch Logs:**
   - Search: `CloudWatchLogsFullAccess`
   - ☑ Select it
   - Click **Attach policies**

**Optimized Policy (Recommended for Production):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Access",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::flyora-shop-prod",
        "arn:aws:s3:::flyora-shop-prod/*"
      ]
    },
    {
      "Sid": "CloudFrontAccess",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::ACCOUNT-ID:distribution/E1234ABCDEF"
    },
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:ap-southeast-1:ACCOUNT-ID:log-group:/aws/codebuild/*"
    }
  ]
}
```

Replace:
- `ACCOUNT-ID`: Your AWS account ID (find in IAM console)
- `flyora-shop-prod`: Your S3 bucket name
- `E1234ABCDEF`: Your CloudFront distribution ID

---

## Build Specification

### Step 8: Build Spec Configuration

**Section: Buildspec** (Further down the form)

1. **Build specifications:**
   - Select **Use a buildspec file**

2. **Buildspec name:** 
   - `buildspec.yml` (default location: repo root)
   - Or custom path: `path/to/buildspec.yml`

3. **Click Create build project** (blue button at bottom)

---

## Running Builds

### Method 1: Manual Trigger

1. Go to **CodeBuild** → **Build projects**
2. Select `flyora-shop-build`
3. Click **Start build** (orange button)
4. **Source version:** Leave blank or specify branch
5. **Environment variables (optional):** Override if needed
6. Click **Start build**

### Method 2: GitHub Webhook (Automatic)

**Already configured if you selected "Rebuild every time"**

Just push to the repository:
```bash
git push origin main
```

CodeBuild will automatically trigger.

### Method 3: AWS CLI

```powershell
# List projects
aws codebuild list-projects

# Start build
aws codebuild start-build `
  --project-name flyora-shop-build `
  --source-version main

# Start build with specific commit
aws codebuild start-build `
  --project-name flyora-shop-build `
  --source-version 1a2b3c4d5e6f
```

### Method 4: AWS CodePipeline (Advanced)

Create a pipeline:
1. Go to **CodePipeline** → **Create pipeline**
2. **Pipeline name:** `flyora-shop-pipeline`
3. **Source stage:** GitHub → Select your repo
4. **Build stage:** AWS CodeBuild → Select `flyora-shop-build`
5. **Deploy stage:** (Optional) S3 deploy or skip
6. **Create pipeline**

---

## Monitoring Builds

### Real-time Build Logs

1. Go to **CodeBuild** → **Build projects**
2. Select `flyora-shop-build`
3. Click **Build history** tab
4. Click on a build ID (recent at top)
5. Scroll to see **Build logs**

**Build phases visible:**
- **PROVISIONING** - Spinning up build environment
- **DOWNLOAD_SOURCE** - Cloning GitHub repo
- **INSTALL** - Installing dependencies
- **PRE_BUILD** - Running pre_build commands
- **BUILD** - Running build commands
- **POST_BUILD** - Running post_build commands
- **UPLOAD_ARTIFACTS** - Uploading build outputs
- **FINALIZING** - Cleanup

### CloudWatch Logs

1. Go to **CloudWatch** → **Log groups**
2. Search for `/aws/codebuild/flyora-shop-build`
3. Click on it
4. View real-time log streams

### Build Reports

1. Go to **CodeBuild** → Build projects → `flyora-shop-build`
2. Click **Reports** tab
3. View test results and coverage reports

### Artifacts

1. Go to **S3** → Your bucket
2. Navigate to artifacts folder
3. Download build artifacts if stored

---

## Troubleshooting

### Build Fails at "INSTALL" Phase

**Error: "npm ci failed"**

**Solution:**
```bash
# Check package.json syntax
cat package.json | python -m json.tool

# Verify node version compatibility
node --version  # Should be 18.x

# Check buildspec.yml
cat buildspec.yml
```

**Common issues:**
- Missing `package-lock.json` (use `npm ci`)
- Node version mismatch
- Locked dependencies

---

### Build Fails at "BUILD" Phase

**Error: "npm run build failed"**

**Check buildspec.yml:**
```yaml
build:
  commands:
    - npm run build  # This command must exist in package.json
```

**Verify in your package.json:**
```json
"scripts": {
  "build": "react-scripts build"
}
```

---

### S3 Upload Fails (POST_BUILD)

**Error: "An error occurred (AccessDenied) when calling the PutObject operation"**

**Solution:**
1. Go to **IAM** → **Roles** → `codebuild-flyora-shop-build-role`
2. Check attached policies
3. Ensure `S3FullAccess` or custom S3 policy is attached
4. Verify bucket name is correct in environment variable

**Test permissions:**
```bash
# From CodeBuild console or local
aws s3 ls s3://flyora-shop-prod/

# Try uploading
aws s3 cp test.txt s3://flyora-shop-prod/test.txt
```

---

### CloudFront Invalidation Fails

**Error: "An error occurred (AccessDenied) when calling the CreateInvalidation operation"**

**Solution:**
1. Verify distribution ID is correct
2. Check IAM policy includes `cloudfront:CreateInvalidation`
3. Verify distribution ID matches your CloudFront setup

**Test manually:**
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234ABCDEF \
  --paths "/*"
```

---

### Build Never Starts

**Possible causes:**

1. **GitHub webhook not configured**
   - Go to GitHub repo → Settings → Webhooks
   - Check if AWS CodeBuild webhook exists
   - If missing, manually retrigger in CodeBuild console

2. **Source not properly connected**
   - Go to CodeBuild project settings
   - Click "Connect source" again
   - Re-authorize GitHub if needed

3. **Branch filter prevents trigger**
   - Check "Branch filter" in webhook settings
   - Pattern should match your branch (e.g., `main`)

---

### Build Timeout

**Error: "Build command timed out"**

Default timeout: **15 minutes**

**Solution:**
1. Go to **CodeBuild** → Project settings
2. Scroll to **Logs**
3. **CloudWatch logs timeout:** Change to higher value (e.g., 30 minutes)
4. Check if build is actually slow (npm install on slow connection)
5. Enable cache for node_modules (see buildspec.yml)

---

### View Detailed Build Logs

**In CodeBuild Console:**
1. Click build ID
2. Scroll to "Build logs" section
3. Click **View in CloudWatch**
4. Expand each log event to see details

**Via AWS CLI:**
```powershell
# Get build info
aws codebuild batch-get-builds `
  --ids flyora-shop-build:1a2b3c4d-5e6f-7890-abcd-ef1234567890

# View logs (use log group name from output)
aws logs tail /aws/codebuild/flyora-shop-build --follow
```

---

## Environment Variable Reference

### Available in buildspec.yml

You can reference any environment variable defined:

```yaml
build:
  commands:
    - echo "Region: $AWS_REGION"
    - echo "Bucket: $AWS_S3_BUCKET"
    - echo "Distribution: $AWS_CLOUDFRONT_DISTRIBUTION_ID"
```

### CodeBuild Built-in Variables

Available automatically (no setup needed):

```yaml
build:
  commands:
    - echo "Build ID: $CODEBUILD_BUILD_ID"
    - echo "Build Number: $CODEBUILD_BUILD_NUMBER"
    - echo "Commit SHA: $CODEBUILD_RESOLVED_SOURCE_VERSION"
    - echo "Build Status: $CODEBUILD_BUILD_SUCCEEDING"
    - echo "Source Repo: $CODEBUILD_SOURCE_REPO_URL"
    - echo "Build Time: $CODEBUILD_START_TIME"
```

---

## Best Practices

### 1. Use Cache for Dependencies

In buildspec.yml:
```yaml
cache:
  paths:
    - '/root/.npm/**/*'
    - 'node_modules/**/*'
```

**Result:** Faster builds (10-30% improvement)

### 2. Fail Fast

```yaml
build:
  commands:
    - npm test || exit 1  # Stop on test failure
    - npm run build || exit 1  # Stop on build failure
```

### 3. Log Everything

```yaml
post_build:
  commands:
    - echo "Build completed at $(date)"
    - echo "Artifacts uploaded to $AWS_S3_BUCKET"
```

### 4. Use Phases Correctly

- **pre_build:** Setup, install, lint
- **build:** Main build tasks
- **post_build:** Deploy, cleanup, notifications

### 5. Monitor Costs

- **Compute type:** Use SMALL unless you need MEDIUM
- **Build time:** Optimize dependencies, use caching
- **Storage:** Clean up old artifacts regularly

---

## Cost Estimation

**Example monthly cost:**

| Item | Details | Cost |
|------|---------|------|
| Compute | 100 builds × 5 min (SMALL) | $0.005/min × 500 = $2.50 |
| Logs | 500 MB logs @ $0.50/GB | $0.25 |
| S3 Storage | 100 MB @ $0.023/GB | $0.00 |
| S3 Requests | 100 uploads @ $0.005/1000 | $0.00 |
| **Total** | | **~$3.00/month** |

*CloudFront costs separate (data transfer)*

---

## Quick Reference

### Common Commands

```bash
# List all CodeBuild projects
aws codebuild list-projects

# Get project details
aws codebuild batch-get-projects --names flyora-shop-build

# Start a build
aws codebuild start-build --project-name flyora-shop-build

# Stop a build
aws codebuild stop-build --build-id flyora-shop-build:1a2b3c4d

# View recent builds
aws codebuild list-builds-for-project --project-name flyora-shop-build

# Get build details
aws codebuild batch-get-builds --ids flyora-shop-build:BUILD-ID
```

### Buildspec.yml Structure

```yaml
version: 0.2

phases:
  install:
    commands: []
  pre_build:
    commands: []
  build:
    commands: []
  post_build:
    commands: []

artifacts:
  files: []
  base-directory: 'build'

cache:
  paths: []

reports:
  test-report:
    files: []
```

---

## Next Steps

1. ✅ Create CodeBuild project
2. ✅ Connect GitHub repository
3. ✅ Configure environment variables
4. ✅ Update IAM role permissions
5. ✅ Test first build manually
6. ✅ Verify S3 upload
7. ✅ Verify CloudFront invalidation
8. ✅ Set up GitHub webhook
9. ✅ Monitor logs and reports
10. ✅ Set up alerts (optional)

---

## Support & Resources

- [AWS CodeBuild Documentation](https://docs.aws.amazon.com/codebuild/)
- [Buildspec Reference](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)
- [AWS CodeBuild Best Practices](https://docs.aws.amazon.com/codebuild/latest/userguide/best-practices.html)
- [Troubleshooting Guide](https://docs.aws.amazon.com/codebuild/latest/userguide/troubleshooting.html)
