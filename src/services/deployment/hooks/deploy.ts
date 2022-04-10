import { writeFileSync } from 'fs';
import download from 'download-git-repo';
import { promisify } from 'util';
import { Application, Hook } from '@feathersjs/feathers';
import { executeCommand, setAppStatus } from '../../../utility';

const downloadAsync = promisify(download);

const addEnvVars = async (app: Application, appToDeploy: Record<string, any>) => {
  const { name, _id } = appToDeploy;

  const { data } = await app
    .service('env-var')
    .find({
      appId: _id,
    });

  const envData = data.reduce((acc: string, curr: Record<string, any>) => {
    acc += `${curr.envVar}\n`;
    return acc;
  }, '');

  writeFileSync(`/home/pi/apps/${name}/.env`, envData);
};

const hook: Hook = async context => {
  const { app, data } = context;

  await setAppStatus(app, data.appId, 'Deploying...');

  const githubUser = app.get('githubUser');

  const appToDeploy = await app.service('app').get(data.appId); 

  if (appToDeploy.type === 'node') {
    await executeCommand(`npx kill-port ${appToDeploy.port}`);
  }

  try {
    await executeCommand(`sudo rm -R /home/pi/apps/${appToDeploy.name}`);
  } catch(e) {}

  try {
    await downloadAsync(`${githubUser}/${appToDeploy.repo}#${appToDeploy.branch}`, `/home/pi/apps/${appToDeploy.name}`);

    await addEnvVars(app, appToDeploy);
  
    await executeCommand(`cd /home/pi/apps/${appToDeploy.name} && npm i`);
  
    if (appToDeploy.type === 'node') {
      executeCommand(`sudo npm --prefix /home/pi/apps/${appToDeploy.name} run start`);
    } else {
      await executeCommand(`sudo npm --prefix /home/pi/apps/${appToDeploy.name} run build`);
    }
    
    await setAppStatus(app, data.appId, 'Deployed');
  } catch(e) {
    data.status = 'fail';
    await setAppStatus(app, data.appId, 'Error');
  }

  return context;
};

export default hook;
