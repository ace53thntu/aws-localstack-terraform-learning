provider "aws" {
  profile                     = "localstack"
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

resource "random_string" "random" {
  length  = 6
  special = false
  upper   = false
}

# Create S3 bucket
resource "aws_s3_bucket" "report_bucket" {
  bucket = "s3-report-bucket"
}

resource "aws_s3_bucket_acl" "report_bucket_acl" {
  bucket = aws_s3_bucket.report_bucket.id
  acl    = "public-read"
}

# Create SQS
resource "aws_sqs_queue" "create_report_queue" {
  name                        = "create-report-queue.fifo"
  fifo_queue                  = true
  content_based_deduplication = true
}

resource "aws_sqs_queue" "report_file_created_queue" {
  name                        = "s3-report-file-created-queue"
  policy                      = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "arn:aws:sqs:*:*:s3-report-file-created-queue",
      "Condition": {
        "ArnEquals": { "aws:SourceArn": "${aws_s3_bucket.report_bucket.arn}" }
      }
    }
  ]
}
POLICY
}

resource "aws_s3_bucket_notification" "report_bucket_notification" {
  bucket = aws_s3_bucket.report_bucket.id
  queue {
    queue_arn = aws_sqs_queue.report_file_created_queue.arn
    events    = ["s3:ObjectCreated:*"]
  }
}