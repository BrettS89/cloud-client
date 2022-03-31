// Initializes the `deployment` service on path `/deployment`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Deployment } from './deployment.class';
import createModel from '../../models/deployment.model';
import hooks from './deployment.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'deployment': Deployment & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/deployment', new Deployment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('deployment');

  service.hooks(hooks);
}
