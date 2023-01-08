import { createReportSQSProducer } from '@/utils/create-report.producer';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

class SendController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const { reportType, from, to } = req.body;

    try {
      const messages = await createReportSQSProducer.send({
        id: uuid(),
        body: 'Create report with attributes',
        groupId: 'CREATE_REPORT',
        deduplicationId: 'CREATE_REPORT',
        messageAttributes: {
          reportType: {
            DataType: 'String',
            StringValue: reportType,
          },
          from: {
            DataType: 'String',
            StringValue: from,
          },
          to: {
            DataType: 'String',
            StringValue: to,
          },
        },
      });

      res.send({
        message: 'Create report messages sent successfully!',
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SendController;
