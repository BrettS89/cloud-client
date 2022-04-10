import { Hook, HookContext } from '@feathersjs/feathers'

export const hook: Hook = (context) => {
  if (context.params?.query?.$resolve) {
    context.params.resolve = context.params.query.$resolve
    delete context.params.query.$resolve
  }

  return context
};

export default hook;
