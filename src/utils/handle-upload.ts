import fs from 'fs';
import path from 'path';
import * as S3 from '@/utils/s3.util';

const filePath = path.resolve(`${process.cwd()}/upload/report.csv`);

/**
 * if we have multiple country folders,
 * then we should implement SNS as well to pub a topic
 * then a SQS for each country
 */
// const countries = [
//   'ghana',
//   'indonesia',
//   'india',
//   'kenya',
//   'philippines',
//   'thailand',
//   'tanzania',
//   'uganda',
//   'vietnam',
// ];

const handleUpload = async (reportId: string) => {
  const fileStream = fs.createReadStream(filePath);
  await S3.uploadFile(fileStream, `report_${reportId}.csv`, 'text/csv');
  // const country = countries[Math.floor(Math.random() * countries.length)];
  // await S3.uploadFile(
  //   fileStream,
  //   `${country}/report_${reportId}.csv`,
  //   'text/csv',
  // );
};

export { handleUpload };
