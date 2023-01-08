import { config } from 'dotenv';

config({ path: `.env` });

export const {
  NODE_ENV,
  PORT,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME,
  ORIGIN,
  AWS_ENDPOINT,
  SQS_CREATE_REPORT_QUEUE_URL,
  SQS_REPORT_FILE_CREATED_QUEUE_URL,
} = process.env;
