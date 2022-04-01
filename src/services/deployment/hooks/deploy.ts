import download from 'download-git-repo';
import { promisify } from 'util';
import { Hook } from '@feathersjs/feathers';
import { executeCommand } from '../../../utility';

const downloadAsync = promisify(download);

const hook: Hook = async context => {
  const { app, data, data: { app_id } } = context;

  const githubUser = app.get('githubUser');

  const targetApp = await app.service('app').get(app_id); 

  await executeCommand(`npx kill-port ${targetApp.port}`);

  try {
    await executeCommand(`sudo rm -R /home/pi/apps/${targetApp.name}`);
  } catch(e) {}

  try {
    await downloadAsync(`${githubUser}/${targetApp.repo}#${targetApp.branch}`, `home/pi/apps/${targetApp.name}`);
    data.error = 'it worked';
  } catch(e) {
    data.error = e.message;
  }

  // try {
  //   await executeCommand(`cd /home/pi/apps/${targetApp.name} && npm i`);
  // } catch(e) {
  //   data.error = e.message;
  // }

  return context;
};

export default hook;
