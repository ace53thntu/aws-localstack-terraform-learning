import {
  AWS_ACCESS_KEY_ID,
  AWS_ENDPOINT,
  AWS_REGION,
  AWS_SECRET_KEY,
} from '@/config';
import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';

const sqsConfig: SQSClientConfig = {
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
};

const sqsClient = new SQSClient(sqsConfig);

export { sqsClient };
