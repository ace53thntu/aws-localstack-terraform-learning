import App from '@/app';
import IndexRoute from './routes/index.route';
import SendRoute from './routes/send.route';

const app = new App([new IndexRoute(), new SendRoute()]);

app.listen();
