import { exec } from 'child_process';
import { Application } from '@feathersjs/feathers';

export const executeCommand = (command: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};

export const setAppStatus = async (app: Application, appId: string, status: string): Promise<void> => {
  await app
    .service('app')
    .patch(appId, {
      status,
    });
};
