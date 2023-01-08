import { SQS_CREATE_REPORT_QUEUE_URL } from '@/config';
import { Consumer } from 'sqs-consumer';
import { handleUpload } from './handle-upload';
import { sqsClient } from './sqs';

const createReportSQSConsumer = Consumer.create({
  queueUrl: SQS_CREATE_REPORT_QUEUE_URL,
  sqs: sqsClient,
  messageAttributeNames: ['reportType', 'from', 'to'],
  attributeNames: ['All'],
  batchSize: 10,
  // shouldDeleteMessages: false,
  handleMessage: async (message) => {
    // eslint-disable-next-line no-console
    console.log('HANDLING MESSAGE - createReportSQSConsumer:');
    // eslint-disable-next-line no-console
    console.log(message);

    // throw an error then the consumer will not automate delete message
    // throw new Error('Failed ne');

    const { Attributes, MessageId, MessageAttributes } = message;
    const { MessageGroupId } = Attributes;
    if (MessageGroupId === 'CREATE_REPORT') {
      // const { reportType, from, to } = MessageAttributes;
      console.log(
        '🚀 ~ file: create-report.consumer.ts:23 ~ handleMessage: ~ MessageAttributes',
        MessageAttributes,
      );
      try {
        await handleUpload(MessageId);
      } catch (error) {
        //
      }
    }
  },
});

// createReportSQSConsumer.on('error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// createReportSQSConsumer.on('processing_error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS PROCESSING ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// createReportSQSConsumer.on('timeout_error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS TIMEOUT ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// createReportSQSConsumer.on('timeout_error', (err) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS TIMEOUT ERROR:');
//   // eslint-disable-next-line no-console
//   console.error(err.message);
// });

// createReportSQSConsumer.on('message_received', (message) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS MESSAGE:');
//   // eslint-disable-next-line no-console
//   console.error(message);
// });

// createReportSQSConsumer.on('message_processed', (message) => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS MESSAGE PROCESSED:');
//   // eslint-disable-next-line no-console
//   console.error(message);
// });

// createReportSQSConsumer.on('response_processed', () => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS RESPONSE PROCESSED:');
// });

// createReportSQSConsumer.on('stopped', () => {
//   // eslint-disable-next-line no-console
//   console.log('RECEIVED SQS STOPPED:');
// });

createReportSQSConsumer.on('empty', () => {
  // eslint-disable-next-line no-console
  console.log('RECEIVED SQS EMPTY:');
});

export { createReportSQSConsumer };
