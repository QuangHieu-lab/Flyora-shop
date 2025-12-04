#!/bin/bash

# AWS S3 + CloudFront Setup Script for Flyora Shop
# This script automates the creation and configuration of S3 bucket and CloudFront distribution

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="${1:-flyora-shop-${RANDOM}}"
AWS_REGION="${2:-ap-southeast-1}"
DOMAIN_NAME="${3:-}"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}AWS S3 + CloudFront Setup${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Verify AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI not found. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ AWS CLI found${NC}"

# Step 1: Create S3 Bucket
echo ""
echo -e "${YELLOW}Step 1: Creating S3 Bucket...${NC}"
if aws s3 ls "s3://${BUCKET_NAME}" 2>/dev/null; then
    echo -e "${YELLOW}Bucket ${BUCKET_NAME} already exists${NC}"
else
    if [ "$AWS_REGION" = "us-east-1" ]; then
        aws s3 mb "s3://${BUCKET_NAME}" --region "$AWS_REGION"
    else
        aws s3 mb "s3://${BUCKET_NAME}" --region "$AWS_REGION" --create-bucket-configuration LocationConstraint="$AWS_REGION"
    fi
    echo -e "${GREEN}✓ S3 bucket created: ${BUCKET_NAME}${NC}"
fi

# Step 2: Block Public Access (for security)
echo ""
echo -e "${YELLOW}Step 2: Configuring public access settings...${NC}"
aws s3api put-public-access-block \
  --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
echo -e "${GREEN}✓ Public access configured${NC}"

# Step 3: Enable Static Website Hosting
echo ""
echo -e "${YELLOW}Step 3: Enabling static website hosting...${NC}"
cat > /tmp/website.json << EOF
{
    "IndexDocument": {
        "Suffix": "index.html"
    },
    "ErrorDocument": {
        "Key": "index.html"
    }
}
EOF

aws s3api put-bucket-website \
  --bucket "$BUCKET_NAME" \
  --website-configuration file:///tmp/website.json
echo -e "${GREEN}✓ Static website hosting enabled${NC}"

# Step 4: Create Bucket Policy
echo ""
echo -e "${YELLOW}Step 4: Creating bucket policy for CloudFront...${NC}"
cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
  --bucket "$BUCKET_NAME" \
  --policy file:///tmp/bucket-policy.json
echo -e "${GREEN}✓ Bucket policy configured${NC}"

# Step 5: Enable Versioning
echo ""
echo -e "${YELLOW}Step 5: Enabling bucket versioning...${NC}"
aws s3api put-bucket-versioning \
  --bucket "$BUCKET_NAME" \
  --versioning-configuration Status=Enabled
echo -e "${GREEN}✓ Versioning enabled${NC}"

# Step 6: Create CloudFront Distribution
echo ""
echo -e "${YELLOW}Step 6: Creating CloudFront distribution...${NC}"

S3_ENDPOINT="${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com"

cat > /tmp/cloudfront-config.json << EOF
{
    "CallerReference": "$(date +%s)",
    "Enabled": true,
    "Comment": "CDN for Flyora Shop",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3Origin",
                "DomainName": "${S3_ENDPOINT}",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3Origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000
    },
    "CacheBehaviors": [
        {
            "PathPattern": "/*",
            "TargetOriginId": "S3Origin",
            "ViewerProtocolPolicy": "redirect-to-https",
            "TrustedSigners": {
                "Enabled": false,
                "Quantity": 0
            },
            "ForwardedValues": {
                "QueryString": false,
                "Cookies": {
                    "Forward": "none"
                }
            },
            "MinTTL": 0,
            "DefaultTTL": 3600,
            "MaxTTL": 86400
        }
    ],
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    }
}
EOF

DISTRIBUTION_ID=$(aws cloudfront create-distribution \
  --distribution-config file:///tmp/cloudfront-config.json \
  --query 'Distribution.Id' \
  --output text)

echo -e "${GREEN}✓ CloudFront distribution created${NC}"
echo -e "${YELLOW}Distribution ID: ${DISTRIBUTION_ID}${NC}"

# Step 7: Get CloudFront Domain
echo ""
echo -e "${YELLOW}Step 7: Retrieving CloudFront domain...${NC}"
CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
  --id "$DISTRIBUTION_ID" \
  --query 'Distribution.DomainName' \
  --output text)

echo -e "${GREEN}✓ CloudFront domain: ${CLOUDFRONT_DOMAIN}${NC}"

# Step 8: Summary and Next Steps
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Configuration Summary:${NC}"
echo "  S3 Bucket Name:            $BUCKET_NAME"
echo "  AWS Region:                $AWS_REGION"
echo "  CloudFront Distribution:   $DISTRIBUTION_ID"
echo "  CloudFront Domain:         $CLOUDFRONT_DOMAIN"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Add these CodeBuild environment variables:"
echo "   AWS_S3_BUCKET = $BUCKET_NAME"
echo "   AWS_CLOUDFRONT_DISTRIBUTION_ID = $DISTRIBUTION_ID"
echo "   AWS_REGION = $AWS_REGION"
echo ""
echo "2. Test deployment: Push code to trigger CodeBuild"
echo "3. Access your site at: https://${CLOUDFRONT_DOMAIN}"
echo ""
if [ ! -z "$DOMAIN_NAME" ]; then
    echo -e "${YELLOW}Custom Domain Setup:${NC}"
    echo "4. Create CNAME record in your DNS provider:"
    echo "   Name: your-domain"
    echo "   Value: ${CLOUDFRONT_DOMAIN}"
    echo "5. Create SSL certificate in ACM (AWS Certificate Manager)"
    echo "6. Update CloudFront distribution with custom domain"
    echo ""
fi
echo -e "${YELLOW}S3 Website URL (optional): http://${BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com${NC}"
echo ""

# Cleanup
rm -f /tmp/website.json /tmp/bucket-policy.json /tmp/cloudfront-config.json
