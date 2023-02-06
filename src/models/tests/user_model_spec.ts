import { User, UserStore } from '../user';
import supertest from 'supertest';
import app from './index_spec';

const endpoint = supertest(app);
const store = new UserStore();

describe('User Model', () => {
  it('Test /users endpoint and its response code', async () => {
    const userRequest = endpoint.get('/users');
    expect((await userRequest).status).toBe(401);
  });

  // index
  it('should have an index method', () => {
    expect(store.getAllUsers).toBeDefined();
  });
  // show
  it('should have a show method', () => {
    expect(store.getUserById).toBeDefined();
  });
  // create
  it('should have a create method', () => {
    expect(store.createUser).toBeDefined();
  });
  // update
  it('should have a update method', () => {
    expect(store.updateUser).toBeDefined();
  });
  // delete
  it('should have a delete method', () => {
    expect(store.deleteUser).toBeDefined();
  });
  it('create method should add a user', async () => {
    setTimeout(async () => {
      const result: User = await store.createUser({
        username: 'testuser',
        first_name: 'test',
        last_name: 'user',
        password_digest: 'password',
      });
      expect(result.id).toEqual(1);
      expect(result.username).toEqual('testuser');
    }, 5000);
  });

  it('index method should return a list of users', async () => {
    setTimeout(async () => {
      const result: User[] = await store.getAllUsers();
      expect(result[0].id).toEqual(1);
      expect(result[0].username).toEqual('testuser');
    }, 5000);
  });

  it('show method should return the correct user', async () => {
    setTimeout(async () => {
      const result: User = await store.getUserById(1);
      expect(result.username).toEqual('testuser');
    }, 5000);
  });

  it('delete method should remove the user', async () => {
    setTimeout(async () => {
      const _: User = await store.deleteUser(1);
      const result = await store.getAllUsers();

      expect(result).toEqual([]);
    }, 10000);
  });
});
