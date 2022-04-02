import { Hook } from '@feathersjs/feathers';

const hook: Hook = async context => {
  const { app, result } = context;

  await app
    .service('env-var')
    .create({
      appId: result._id,
      envVars: []
    });

  return context;
};

export default hook;
