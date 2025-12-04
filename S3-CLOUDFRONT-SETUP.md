# S3 + CloudFront Deployment Setup

## Overview
This guide walks you through setting up AWS S3 and CloudFront for serving your React application.

## Architecture
```
GitHub → CodeBuild → S3 bucket → CloudFront CDN → Users
                                      ↓
                             Cache Invalidation
```

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- CodeBuild project created
- GitHub repository connected

## Option 1: Automated Setup (Recommended)

### Using the Setup Script

1. **Make the script executable:**
   ```bash
   chmod +x aws-s3-cloudfront-setup.sh
   ```

2. **Run the script:**
   ```bash
   # Basic setup (auto-generated bucket name)
   ./aws-s3-cloudfront-setup.sh

   # With custom bucket name and region
   ./aws-s3-cloudfront-setup.sh flyora-shop-prod ap-southeast-1

   # With custom domain
   ./aws-s3-cloudfront-setup.sh flyora-shop-prod ap-southeast-1 www.flyora.com
   ```

3. **Save the output:**
   - Copy the S3 bucket name
   - Copy the CloudFront Distribution ID
   - Note the CloudFront domain

### What the Script Does
1. Creates S3 bucket
2. Enables static website hosting
3. Configures bucket policy for public read access
4. Enables versioning for rollback capability
5. Creates CloudFront distribution
6. Outputs configuration for CodeBuild

## Option 2: Manual Setup

### Step 1: Create S3 Bucket

```bash
# Create bucket
aws s3 mb s3://flyora-shop-prod --region ap-southeast-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket flyora-shop-prod \
  --versioning-configuration Status=Enabled
```

### Step 2: Configure Static Website Hosting

```bash
aws s3api put-bucket-website \
  --bucket flyora-shop-prod \
  --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "index.html"}
  }'
```

### Step 3: Set Bucket Policy

```bash
aws s3api put-bucket-policy \
  --bucket flyora-shop-prod \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::flyora-shop-prod/*"
    }]
  }'
```

### Step 4: Create CloudFront Distribution

```bash
# Create distribution with S3 origin
aws cloudfront create-distribution \
  --distribution-config '{
    "CallerReference": "'$(date +%s)'",
    "Enabled": true,
    "Comment": "CDN for Flyora Shop",
    "DefaultRootObject": "index.html",
    "Origins": {
      "Quantity": 1,
      "Items": [{
        "Id": "S3Origin",
        "DomainName": "flyora-shop-prod.s3.ap-southeast-1.amazonaws.com",
        "S3OriginConfig": {"OriginAccessIdentity": ""}
      }]
    },
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3Origin",
      "ViewerProtocolPolicy": "redirect-to-https",
      "TrustedSigners": {"Enabled": false, "Quantity": 0},
      "ForwardedValues": {
        "QueryString": false,
        "Cookies": {"Forward": "none"}
      },
      "MinTTL": 0,
      "DefaultTTL": 86400,
      "MaxTTL": 31536000
    },
    "CustomErrorResponses": {
      "Quantity": 1,
      "Items": [{
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }]
    }
  }'
```

## CodeBuild Configuration

### 1. Create CodeBuild Project

1. Go to **AWS CodeBuild** console
2. Click **Create build project**
3. Configure:
   - **Project name:** `flyora-shop-build`
   - **Source:** GitHub (connect your repo)
   - **Build spec:** `buildspec.yml`
   - **Environment:** 
     - OS: Ubuntu
     - Runtime: Node.js
     - Runtime version: 18
     - Image: Standard
   - **Service role:** Create new or use existing

### 2. Add Environment Variables

In CodeBuild project settings → **Environment variables**, add:

| Name | Value | Notes |
|------|-------|-------|
| `AWS_REGION` | `ap-southeast-1` | Your AWS region |
| `AWS_S3_BUCKET` | `flyora-shop-prod` | Your bucket name |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `E1234ABCD...` | Distribution ID from Step 4 |

### 3. Update IAM Role

Ensure the CodeBuild IAM role has these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
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
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetDistribution"
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
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

## buildspec.yml Breakdown

### Pre-build Phase
```yaml
pre_build:
  commands:
    - npm ci                          # Clean install dependencies
    - npm run lint --if-present       # Run linter if available
```

### Build Phase
```yaml
build:
  commands:
    - npm test -- --watchAll=false    # Run tests
    - npm run build                   # Build React app
```

### Post-build Phase (S3 + CloudFront)
```yaml
post_build:
  commands:
    # Sync build folder to S3
    - aws s3 sync build/ s3://$AWS_S3_BUCKET --delete
    
    # Set index.html cache control (no caching for dynamic content)
    - aws s3 cp build/index.html s3://$AWS_S3_BUCKET/index.html \
      --cache-control "public, max-age=300"
    
    # Invalidate CloudFront cache
    - aws cloudfront create-invalidation \
      --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID \
      --paths "/*"
```

## Cache Strategy

### Static Assets (JS, CSS, Images)
- **Cache Duration:** 1 year (31536000 seconds)
- **Fingerprinting:** React build automatically adds hash to filenames
- **Invalidation:** Not needed (files have unique names)

### HTML (index.html)
- **Cache Duration:** 5 minutes (300 seconds)
- **Reason:** Allows quick updates without cache invalidation
- **Invalidation:** Automatic via buildspec

### Dynamic Content
- **Cache Duration:** 1 hour (3600 seconds)
- **Invalidation:** Manual if needed

## Testing Deployment

### 1. Trigger a Build
```bash
# Push to main branch to trigger CodeBuild
git push origin main
```

### 2. Monitor Build
- Go to CodeBuild console
- Click on your project
- View build logs in real-time

### 3. Test S3 Upload
```bash
# Check S3 contents
aws s3 ls s3://flyora-shop-prod/
```

### 4. Test CloudFront
```bash
# Get CloudFront domain
aws cloudfront get-distribution \
  --id E1234ABCD \
  --query 'Distribution.DomainName'

# Visit: https://d1234.cloudfront.net
```

## Custom Domain Setup

### 1. Create SSL Certificate
```bash
# In AWS Certificate Manager (ACM)
# Create certificate for: www.flyora.com, flyora.com
```

### 2. Update CloudFront Distribution
```bash
aws cloudfront update-distribution \
  --id E1234ABCD \
  --distribution-config file://config.json
```

### 3. Update DNS
Add CNAME record in your DNS provider:
```
Name: www.flyora.com
Value: d1234.cloudfront.net
TTL: 3600
```

## Monitoring

### CloudWatch Metrics
```bash
# View CloudFront metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=E1234ABCD
```

### S3 Access Logs
```bash
# Enable S3 access logging
aws s3api put-bucket-logging \
  --bucket flyora-shop-prod \
  --bucket-logging-status file://logging.json
```

### CodeBuild Logs
- CloudWatch Logs: `/aws/codebuild/flyora-shop-build`
- CodeBuild Console: Build project → Build history

## Rollback

### Quick Rollback (S3 Versioning)
```bash
# List S3 versions
aws s3api list-object-versions \
  --bucket flyora-shop-prod

# Restore previous version
aws s3api copy-object \
  --copy-source flyora-shop-prod/index.html?versionId=XXXXX \
  --bucket flyora-shop-prod \
  --key index.html
```

### Invalidate Cache
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234ABCD \
  --paths "/*"
```

## Cost Optimization

### 1. S3 Storage
- **Cost:** ~$0.023 per GB/month
- **Optimization:** Delete old versions periodically

### 2. Data Transfer
- **Cost:** ~$0.085 per GB outbound
- **Optimization:** CloudFront compression, caching

### 3. CloudFront
- **Cost:** ~$0.085 per GB (varies by region)
- **Optimization:** Leverage caching, use Origin Shield

### 4. Requests
- **S3 PUT/POST:** $0.005 per 1,000 requests
- **CloudFront:** $0.0075 per 10,000 requests

## Troubleshooting

### Build Fails
```bash
# Check CodeBuild logs
aws codebuild batch-get-builds \
  --ids flyora-shop-build:xxxxx \
  --query 'builds[0].logs'
```

### S3 Upload Fails
- Verify IAM permissions
- Check S3 bucket name spelling
- Ensure bucket exists

### CloudFront Not Updating
- Check CloudFront distribution status (Creating/Deployed)
- Verify invalidation is running
- Check cache headers in response

### 404 Errors on Refresh
- Verify `CustomErrorResponses` is set in CloudFront
- Index.html should be error response page
- Check S3 bucket policy

## Security Best Practices

1. **Enable S3 Versioning** - Already enabled
2. **Block Unnecessary Public Access** - Only allow CloudFront
3. **Use Origin Access Control** - Restrict direct S3 access
4. **Enable CloudFront Compression** - Reduce bandwidth
5. **Use HTTPS Only** - Redirect HTTP to HTTPS
6. **Enable WAF** - Optional, adds cost

## Performance Tips

1. **Enable Gzip Compression**
   ```bash
   # Automatically done by CloudFront for text files
   ```

2. **Optimize Images**
   ```bash
   # Before build, optimize images
   npm install -D imagemin
   ```

3. **Code Splitting**
   ```bash
   # React automatically does code splitting with React.lazy
   ```

4. **Monitor Performance**
   - CloudFront Metrics dashboard
   - CloudFront Access Logs

## Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS CodeBuild Documentation](https://docs.aws.amazon.com/codebuild/)
- [React Production Build](https://create-react-app.dev/docs/production-build/)
- [CloudFront Caching Best Practices](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio.html)
