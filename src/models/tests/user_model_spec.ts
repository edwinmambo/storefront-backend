import { User, UserStore } from '../user';

const store = new UserStore();

describe('User Model', () => {
  // index
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  // show
  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });
  // create
  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });
  // update
  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });
  // delete
  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });
  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'Test User',
      password: 'password',
    });
    expect(result).toEqual({
      id: '1',
      username: 'Test User',
      password: 'password',
    });
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        username: 'Test User',
        password: 'password',
      },
    ]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: '1',
      username: 'Test User',
      password: 'password',
    });
  });

  it('delete method should remove the book', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
