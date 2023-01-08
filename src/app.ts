import express from 'express';
import { ORIGIN } from './config';
import { PORT } from './config';
import { NODE_ENV } from './config';
import { IRoutes } from './interfaces/routes.interface';
import cors from 'cors';
import { reportFileCreatedSQSConsumer } from './utils/report-file-created.consumer';
import { createReportSQSConsumer } from './utils/create-report.consumer';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
      createReportSQSConsumer.start();
      reportFileCreatedSQSConsumer.start();
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true, limit: '50000mb' }));
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
