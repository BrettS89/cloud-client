import { exec } from 'child_process';

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
