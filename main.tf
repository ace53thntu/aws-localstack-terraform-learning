provider "aws" {
  region                      = "ap-southeast-1"
  access_key                  = "test123"
  secret_key                  = "test123"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  s3_use_path_style           = true
  endpoints {
    sns = "http://localhost:4566"
    sqs = "http://localhost:4566"
    s3  = "http://localhost:4566"
  }
}

# Create SQS
resource "aws_sqs_queue" "local_queue" {
  name = "edm-local-SQS"
}

# Create SNS topic
resource "aws_sns_topic" "local_topic" {
  name = "edm-local-SNS-topic"
}

# Create SNS topic subscription
resource "aws_sns_topic_subscription" "local_subscription" {
  topic_arn = aws_sns_topic.local_topic.arn
  endpoint  = aws_sqs_queue.local_queue.arn
  protocol  = "sqs"
}

# Create S3 bucket
resource "aws_s3_bucket" "bucket" {
  bucket = "s3-local-bucket.edm.com"
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.bucket.id
  acl    = "public-read"
}

# Upload an object
resource "aws_s3_object" "object" {
  key    = "test.txt"
  bucket = aws_s3_bucket.bucket.id
  source = "./upload/test.txt"
}