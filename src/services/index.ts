import { Application } from '../declarations';
import appService from './app/app.service';
import deployment from './deployment/deployment.service';
import envVar from './env-var/env-var.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(appService);
  app.configure(deployment);
  app.configure(envVar);
}
