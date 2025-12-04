// AWS Configuration for the frontend application
const awsConfig = {
  region: process.env.REACT_APP_AWS_REGION || 'ap-southeast-1',
  s3Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
  
  // CloudFront distribution (optional)
  cloudFrontDomain: process.env.REACT_APP_CLOUDFRONT_DOMAIN,
  
  // API Gateway endpoint
  apiGatewayEndpoint: process.env.REACT_APP_API_BASE_URL,
};

export default awsConfig;
