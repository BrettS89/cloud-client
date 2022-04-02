import configureNginx from './hooks/configure-nginx';
import createEnvVars from './hooks/create-env-vars';

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
    all: [],
    find: [],
    get: [],
    create: [],
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
