import { AWS_REGION, SQS_CREATE_REPORT_QUEUE_URL } from '@/config';
import { Producer } from 'sqs-producer';
import { sqsClient } from './sqs';

const createReportSQSProducer = Producer.create({
  queueUrl: SQS_CREATE_REPORT_QUEUE_URL,
  region: AWS_REGION,
  sqs: sqsClient,
});

export { createReportSQSProducer };
