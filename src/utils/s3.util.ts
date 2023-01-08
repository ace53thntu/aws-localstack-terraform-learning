import { AWS_ENDPOINT, AWS_REGION, AWS_SECRET_KEY } from '@/config';
import { AWS_BUCKET_NAME } from '@/config';
import { AWS_ACCESS_KEY_ID } from '@/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const credentials = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
};

const bucketName = AWS_BUCKET_NAME;

const s3Client = new S3Client({
  credentials,
  endpoint: AWS_ENDPOINT,
  region: AWS_REGION,
  forcePathStyle: true,
});

const uploadFile = async (body, name: string, mimetype: string) => {
  try {
    const parrallelUploadS3 = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: `${name}`,
        Body: body,
        ContentType: mimetype,
      },
    });
    parrallelUploadS3.on('httpUploadProgress', (progress) => {
      console.log(
        '🚀 ~ file: s3.util.ts:31 ~ parrallelUploadS3.on ~ progress',
        progress,
      );
    });
    await parrallelUploadS3.done();
  } catch (error) {
    console.log('🚀 ~ file: s3.util.ts:24 ~ uploadFile ~ error', error);
  }
};

export { uploadFile };
