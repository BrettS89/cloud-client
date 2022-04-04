// Initializes the `app` service on path `/app`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { App as AppClass } from './app.class';
import createModel from '../../models/app.model';
import hooks from './app.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'app': AppClass & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/app', new AppClass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('app');

  service.hooks(hooks);
}
