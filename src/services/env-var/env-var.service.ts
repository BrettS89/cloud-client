// Initializes the `env-var` service on path `/env-var`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { EnvVar } from './env-var.class';
import createModel from '../../models/env-var.model';
import hooks from './env-var.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'env-var': EnvVar & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/env-var', new EnvVar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('env-var');

  service.hooks(hooks);
}
