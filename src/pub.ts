import {
  SNSClient,
  PublishCommand,
  PublishCommandInput,
  PublishCommandOutput,
} from '@aws-sdk/client-sns';

const TOPIC_ARN = 'arn:aws:sns:ap-southeast-1:000000000000:edm-local-SNS-topic';

const snsClient = new SNSClient({
  region: 'ap-southeast-1',
  endpoint: 'http://localhost:4566',
});

async function publish(msg: PublishCommandInput['Message']) {
  const publishParams: PublishCommandInput = {
    TopicArn: TOPIC_ARN,
    Message: msg,
  };

  try {
    await snsClient.send(new PublishCommand(publishParams));
  } catch (error) {
    console.log('🚀 ~ file: pub.ts:27 ~ publish ~ error', error);
  }
}

(async () => {
  publish('Hello first message');
})();
