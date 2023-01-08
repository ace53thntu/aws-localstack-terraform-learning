import { AWS_REGION, SQS_REPORT_FILE_CREATED_QUEUE_URL } from '@/config';
import { Producer } from 'sqs-producer';
import { sqsClient } from './sqs';

const reportFileCreatedSQSProducer = Producer.create({
  queueUrl: SQS_REPORT_FILE_CREATED_QUEUE_URL,
  region: AWS_REGION,
  sqs: sqsClient,
});

export { reportFileCreatedSQSProducer };
