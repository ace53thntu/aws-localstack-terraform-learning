import IndexController from '@/controllers/index.controller';
import { IRoutes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class IndexRoute implements IRoutes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}hello`, this.indexController.hello);
  }
}

export default IndexRoute;
