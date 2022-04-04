import { Hook } from '@feathersjs/feathers';
import { NginxConfFile } from 'nginx-conf';
import { executeCommand } from '../../../utility';

const filename = '/etc/nginx/nginx.conf';

const getReactCommand = (name: string): string[] => {
  return ['alias', `/home/pi/apps/${name}/build/`];
};

const getNodeCommand = (port: number): string[] => {
  return ['proxy_pass', `http://127.0.0.1:${port}`];
};

const hook: Hook = context => {
  const { app, data: { name, type, port } } = context;

  const env = app.get('env');

  if (env === 'development') {
    return context;
  }

  NginxConfFile.create(filename, (err, conf) => {
    conf.on('flushed', () => {
      executeCommand('sudo systemctl restart nginx');
    });

    const locationIndex = conf.nginx.http?.[0].server?.[0].location.length;

    conf.nginx.http?.[0].server?.[0]._add('location', `/${name}`);

    if (type === 'react') {
      const command = getReactCommand(name);

      conf.nginx.http?.[0].server?.[0].location?.[locationIndex]._add(command[0], command[1]);
      conf.nginx.http?.[0].server?.[0].location?.[locationIndex]._add('index', 'index.html');
    } else {
      const command = getNodeCommand(port);

      conf.nginx.http?.[0].server?.[0].location?.[locationIndex]._add('rewrite', `/${name}` + '/(.*) /$1 break');
      conf.nginx.http?.[0].server?.[0].location?.[locationIndex]._add(command[0], command[1]);
    }

    conf.flush();
  });

  return context;
};

export default hook;
