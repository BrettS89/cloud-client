import app from '../../src/app';

describe('\'env-var\' service', () => {
  it('registered the service', () => {
    const service = app.service('env-var');
    expect(service).toBeTruthy();
  });
});
