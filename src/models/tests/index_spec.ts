import supertest from 'supertest';
import app from '../../server';

// test our endpoint
const request = supertest(app);

describe('Test Home Route', () => {
  // test whether the endpoint connects
  it('Get the home endpoint and test its response code', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

export default app;
