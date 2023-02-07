import supertest from 'supertest';
import app from '../..';
import { Order, User } from '../../types/index.type';
import getUserToken from '../utils/user.test.util';

const request = supertest(app);
const api = '/api/orders';
let token: string;

describe('Order Controller', () => {
  beforeAll(() => {
    const testUser: User = {
      username: 'testUser',
      password_digest: 'testPassword',
    };
    token = getUserToken(testUser);
  });

  it('should return a new order after it is created', () => {
    const order: Order = {
      user_id: 1,
      status_of_order: 'active',
    };
    request
      .post(api)
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        id: 1,
        user_id: 1,
        status_of_order: 'active',
      });
  });

  it('should return a list of orders', () => {
    request
      .get(api)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('should return an order given an id', () => {
    request
      .get(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: 1,
        user_id: 1,
        status_of_order: 'active',
      });
  });

  it('should update an order given its id', () => {
    const order: Order = {
      id: 1,
      user_id: 1,
      status_of_order: 'complete',
    };
    request
      .patch(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        id: 1,
        user_id: 1,
        status_of_order: 'complete',
      });
  });

  it('should delete an order given its id', () => {
    request
      .delete(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(() => {
        request.get(api).expect({});
      });
  });
});
