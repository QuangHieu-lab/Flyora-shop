# CI/CD Setup Guide for AWS CodeBuild Deployment

## Overview
This project uses AWS CodeBuild to automatically build, test, and deploy to AWS. The setup supports both static S3 hosting and containerized ECS deployment.

## Prerequisites

### 1. AWS Account Setup
- AWS Account with appropriate permissions
- IAM Role/User with the following permissions:
  - CodeBuild (create and manage builds)
  - S3 bucket access (GetObject, PutObject, DeleteObject)
  - CloudFront invalidation (optional)
  - ECR access (if using container deployment)
  - ECS deployment permissions (if using ECS)

### 2. CodeBuild Environment Variables
Configure these in AWS CodeBuild project settings:

```
AWS_REGION                     # AWS region (e.g., ap-southeast-1)
AWS_ACCOUNT_ID                 # Your AWS account ID
AWS_S3_BUCKET                  # S3 bucket name for hosting
IMAGE_REPO_NAME                # ECR repository name (for Docker deployments)
CONTAINER_NAME                 # ECS container name (for ECS deployments)
AWS_CLOUDFRONT_DISTRIBUTION_ID # (Optional) CloudFront distribution ID
NODE_ENV                       # Environment (development, production)
REACT_APP_API_BASE_URL         # API endpoint URL
```

## Deployment Options

### Option 1: AWS S3 + CloudFront (Using buildspec.yml)
**Best for:** Simple React apps, cost-effective, fast CDN delivery

**Setup:**
1. Create S3 bucket for hosting
2. Enable "Static website hosting" in S3
3. Create CloudFront distribution pointing to S3 bucket
4. Create CodeBuild project using `buildspec.yml`
5. Configure build source (GitHub, CodeCommit, etc.)
6. Set environment variables in CodeBuild

**Configuration in CodeBuild Console:**
- Source: GitHub repository
- Build spec: Use `buildspec.yml`
- Environment variables: AWS_REGION, AWS_S3_BUCKET, AWS_CLOUDFRONT_DISTRIBUTION_ID

### Option 2: ECS/Fargate (Container Deployment using buildspec-docker.yml)
**Best for:** Microservices, complex setups, container orchestration

**Setup:**
1. Create ECR repository in AWS
2. Create ECS cluster and task definition
3. Create CodeBuild project using `buildspec-docker.yml`
4. Configure CodePipeline to deploy to ECS

**Configuration in CodeBuild Console:**
- Source: GitHub repository
- Build spec: Use `buildspec-docker.yml`
- Environment: Docker enabled
- Environment variables: AWS_ACCOUNT_ID, AWS_REGION, IMAGE_REPO_NAME, CONTAINER_NAME

### Option 3: AWS Amplify (Alternative)
**Best for:** Full-stack apps with automatic deployments

**Setup:**
1. Connect GitHub repo to AWS Amplify Console
2. Amplify auto-detects and uses `amplify.yml`
3. Set environment variables in Amplify Console

**Trigger:** Push to `main` branch

## File Descriptions

### `buildspec.yml` (Recommended for S3 + CloudFront)
AWS CodeBuild configuration that:
- Installs Node.js dependencies with `npm ci`
- Runs linter and unit tests
- Builds React application to `build/` directory
- Outputs artifacts to S3
- Generates test and coverage reports
- Caches node_modules for faster builds

**Phases:**
- `pre_build`: Install dependencies, run linter
- `build`: Run tests and build application
- `post_build`: Generate reports

### `buildspec-docker.yml` (For ECS/Fargate deployment)
AWS CodeBuild configuration for containerized deployment:
- Builds React application
- Runs tests with coverage
- Builds Docker image
- Pushes to Amazon ECR
- Generates ECS task definition
- Uses Docker image tagging with commit hash

**Additional variables needed:**
- AWS_ACCOUNT_ID
- IMAGE_REPO_NAME
- CONTAINER_NAME

### `Dockerfile`
Multi-stage Docker build for containerized deployment:
- Stage 1: Build the React app with Node 18
- Stage 2: Serve with lightweight Node.js image using `serve`
- Includes health checks
- Exposes port 3000

### `.dockerignore`
Excludes unnecessary files from Docker image to reduce size

### `amplify.yml`
AWS Amplify configuration file (alternative deployment method)

### `.env.example`
Template for environment variables. Copy to `.env` locally:
```bash
cp .env.example .env
# Edit .env with your actual values
```

## Local Development

### Setup
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your API endpoint
```

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Testing Docker Image Locally
```bash
docker build -t flyora-shop:latest .
docker run -p 3000:3000 flyora-shop:latest
```

## AWS CodeBuild Configuration

### Step 1: Create CodeBuild Project
1. Go to AWS CodeBuild console
2. Click "Create build project"
3. Fill in project details:
   - **Project name:** `flyora-shop-build`
   - **Source:** Connect to GitHub
   - **Build spec:** Choose "Use a buildspec file"
   - **Buildspec name:** `buildspec.yml` (or `buildspec-docker.yml` for ECS)
   - **Environment:** Managed image, Ubuntu, Standard runtime
   - **Runtime:** Node.js 18

### Step 2: Configure Environment Variables
In CodeBuild project settings → Environment → Additional configuration:

**For S3 + CloudFront Deployment:**
```
AWS_REGION                      = ap-southeast-1
AWS_S3_BUCKET                   = your-bucket-name
AWS_CLOUDFRONT_DISTRIBUTION_ID  = E1234ABCD (optional)
NODE_ENV                        = production
REACT_APP_API_BASE_URL          = https://api.yourdomain.com
```

**For ECS/Fargate Deployment:**
```
AWS_REGION                 = ap-southeast-1
AWS_ACCOUNT_ID             = 123456789012
IMAGE_REPO_NAME            = flyora-shop
CONTAINER_NAME             = flyora-shop-container
NODE_ENV                   = production
REACT_APP_API_BASE_URL     = https://api.yourdomain.com
```

### Step 3: Create CodePipeline (Optional)
1. Go to AWS CodePipeline console
2. Create new pipeline
3. Add source stage (GitHub)
4. Add build stage (CodeBuild)
5. Add deploy stage:
   - For S3: Use "Deploy to S3"
   - For ECS: Use "Deploy to ECS"

### Step 4: Configure IAM Role
Ensure CodeBuild IAM role has permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

## Monitoring & Logs

### AWS CodeBuild
- View logs: CodeBuild → Build projects → Select project → Build history
- CloudWatch Logs: Check `/aws/codebuild/flyora-shop-build`
- Build artifacts: S3 bucket specified in artifacts

### AWS CloudWatch
- Monitor build metrics via CloudWatch
- Check S3 access logs
- Monitor CloudFront performance
- Track ECS deployment events

## Troubleshooting

### Build Fails in CodeBuild
- Check Node.js version (18.x required)
- Verify buildspec.yml syntax (YAML format)
- Check environment variables in CodeBuild project
- View CloudWatch logs for detailed error messages
- Ensure S3 bucket and ECR repository exist

### Deployment Fails
- Verify IAM role has necessary permissions
- Check S3 bucket policy and versioning
- Ensure CloudFront distribution exists
- Verify Docker image is pushing to correct ECR repo
- Check ECS task definition and cluster configuration

### Environment Variables
- Set in CodeBuild project → Environment → Additional configuration
- Use `REACT_APP_` prefix for React app variables
- Reference in buildspec: `$ENV_VAR_NAME`
- For sensitive data: Use AWS Secrets Manager instead

### Docker Build Issues
- Verify Dockerfile is in project root
- Check .dockerignore for excluded files
- Ensure Docker is enabled in CodeBuild environment
- Check ECR repository permissions

## Best Practices

1. **Use `npm ci`** instead of `npm install` in CI/CD for consistency
2. **Always run tests** before deployment
3. **Use environment variables** for sensitive data
4. **Enable CloudFront caching** for better performance
5. **Implement code coverage** monitoring
6. **Use branch protection rules** (require reviews before merge)

## Cost Optimization

- **S3**: Pay only for storage and requests (~$0.023 per GB)
- **CloudFront**: Reduced costs with CloudFront caching
- **Data Transfer**: Outbound data transfer costs apply
- **Amplify**: Free tier for 15GB storage + 40 compute hours/month

## Next Steps

### For S3 + CloudFront Deployment:
1. [ ] Create S3 bucket and enable static website hosting
2. [ ] Create CloudFront distribution (optional but recommended)
3. [ ] Create CodeBuild project with `buildspec.yml`
4. [ ] Configure environment variables in CodeBuild
5. [ ] Update IAM role with S3 and CloudFront permissions
6. [ ] Trigger first build and verify in CodeBuild console
7. [ ] Test deployed application via CloudFront URL
## Support & Resources

- [AWS CodeBuild Documentation](https://docs.aws.amazon.com/codebuild/)
- [Buildspec Reference](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)
- [AWS CodePipeline Documentation](https://docs.aws.amazon.com/codepipeline/)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Amazon ECR Documentation](https://docs.aws.amazon.com/ecr/)
- [Amazon ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)ml`
5. [ ] Configure environment variables in CodeBuild
6. [ ] Update IAM role with ECR and ECS permissions
7. [ ] Create CodePipeline with ECS deployment stage
8. [ ] Trigger first build and verify ECS deployment

### General Setup:
1. [ ] Connect GitHub repository to AWS (CodeBuild/CodePipeline)
2. [ ] Test buildspec.yml locally with `aws codebuild batch-get-builds`
3. [ ] Set up CloudWatch alarms for build failures
4. [ ] Enable build reports in CodeBuild
5. [ ] Configure source control webhooks (automatic on GitHub)
6. [ ] Test with a pull request before merging

## Support & Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS S3 Static Website Hosting](https://docs.aws amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
