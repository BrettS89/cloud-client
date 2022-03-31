import app from '../../src/app';

describe('\'deployment\' service', () => {
  it('registered the service', () => {
    const service = app.service('deployment');
    expect(service).toBeTruthy();
  });
});
