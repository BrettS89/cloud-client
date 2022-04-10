import { Hook } from '@feathersjs/feathers';

const hook: Hook = async context => {
  const { app, result } = context;

  const createdEnvVar = await app
    .service('env-var')
    .create({
      appId: result._id,
      envVar: `PORT=${result.port}`,
    });

  result.envVars = [createdEnvVar];

  return context;
};

export default hook;
