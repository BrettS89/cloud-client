import { HookContext } from '@feathersjs/feathers';

const resolvers = {
  joins: {
    envVars: (...args: any) => async (resource: Record<string, any>, { app }: HookContext) => {
      resource.envVars = (
        await app
          .service('env-var')
          .find({
            query: {
              appId: resource._id,
            },
          })
      ).data
    },
  }
};

export default resolvers;
