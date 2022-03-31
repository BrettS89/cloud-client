import { Application } from '../declarations';
import app from './app/app.service';
import deployment from './deployment/deployment.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(app);
  app.configure(deployment);
}
