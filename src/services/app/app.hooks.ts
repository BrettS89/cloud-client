import { fastJoin } from 'feathers-hooks-common';
import resolvers from './app.resolvers';
import configureNginx from './hooks/configure-nginx';
import addPortEnvVar from './hooks/add-port-env-var';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      configureNginx,
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin(resolvers, ctx => ctx.params.resolve || {})],
    find: [],
    get: [],
    create: [
      addPortEnvVar,
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
