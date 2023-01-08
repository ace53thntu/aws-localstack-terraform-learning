import SendController from '@/controllers/send.controller';
import { IRoutes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class SendRoute implements IRoutes {
  public path = '/send';
  public router = Router();
  public sendController = new SendController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.sendController.index);
  }
}

export default SendRoute;
