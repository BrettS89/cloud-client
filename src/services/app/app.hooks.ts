import configureNginx from './hooks/configure-nginx';

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
