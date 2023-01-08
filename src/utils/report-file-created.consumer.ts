import { SQS_REPORT_FILE_CREATED_QUEUE_URL } from '@/config';
import { Consumer } from 'sqs-consumer';
import { sqsClient } from './sqs';

const reportFileCreatedSQSConsumer = Consumer.create({
  queueUrl: SQS_REPORT_FILE_CREATED_QUEUE_URL,
  sqs: sqsClient,
  // messageAttributeNames: ['reportType', 'from', 'to'],
  attributeNames: ['All'],
  batchSize: 10,
  // shouldDeleteMessages: false,
  handleMessage: async (message) => {
    // eslint-disable-next-line no-console
    console.log('HANDLING MESSAGE - reportFileCreatedSQSConsumer:');
    // eslint-disable-next-line no-console
    console.log(message);
    const { Body } = message;
    const s3Res = JSON.parse(Body);
    if (s3Res.Records) {
      const { s3 } = s3Res.Records[0];
      const { object } = s3;
      console.log('Report file: ', object.key);
    }
  },
});

// reportFileCreatedSQSConsumer.on('error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// reportFileCreatedSQSConsumer.on('processing_error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS PROCESSING ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// reportFileCreatedSQSConsumer.on('timeout_error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS TIMEOUT ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// reportFileCreatedSQSConsumer.on('timeout_error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS TIMEOUT ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// reportFileCreatedSQSConsumer.on('message_received', (message) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS MESSAGE:');
//   // eslint-disable-next-line no-console
//   console.error(message);
// });

// reportFileCreatedSQSConsumer.on('message_processed', (message) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS MESSAGE PROCESSED:');
//   // eslint-disable-next-line no-console
//   console.error(message);
// });

// reportFileCreatedSQSConsumer.on('response_processed', () => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS RESPONSE PROCESSED:');
// });

// reportFileCreatedSQSConsumer.on('stopped', () => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS STOPPED:');
// });

reportFileCreatedSQSConsumer.on('empty', () => {
  // eslint-disable-next-line no-console
  console.log('RECEIVED SQS EMPTY:');
});

export { reportFileCreatedSQSConsumer };
