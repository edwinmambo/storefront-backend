import supertest from 'supertest';
import app from '../..';
import { User } from '../../types/index.type';
import getUserToken from '../utils/user.test.util';

const request = supertest(app);
const api = '/api/users';
let token: string;

describe('User Controller', () => {
  beforeAll(() => {
    const testUser: User = {
      username: 'testUser',
      password_digest: 'testPassword',
    };
    token = getUserToken(testUser);
  });

  it('should return a new user after it is created', () => {
    const user: User = {
      username: 'testUser',
      first_name: 'test',
      last_name: 'user',
      password_digest: 'testPassword',
    };
    request
      .post(api)
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        id: 1,
        username: 'testuser',
        first_name: 'test',
        last_name: 'user',
        password_digest: 'password',
      });
  });

  it('should return a list of users', () => {
    request
      .get(api)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({});
  });

  it('should return a user given an id', () => {
    request
      .get(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        id: 1,
        username: 'testUser',
        first_name: 'test',
        last_name: 'user',
        password_digest: 'testPassword',
      });
  });

  it('should update a user given its id', () => {
    const user: User = {
      username: 'testUser1',
      first_name: 'test',
      last_name: 'user',
      password_digest: 'testPassword1',
    };
    request
      .patch(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        id: 1,
        username: 'testUser1',
        first_name: 'test',
        last_name: 'user',
        password_digest: 'testPassword1',
      });
  });

  it('should delete a user given its id', () => {
    request
      .delete(`${api}/1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(() => {
        request.get(api).expect({});
      });
  });
});
