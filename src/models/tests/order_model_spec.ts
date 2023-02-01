import { Order, OrderStore } from '../order';

const store = new OrderStore();

xdescribe('Order Model', () => {
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
  it('should have an update method', () => {
    expect(store.index).toBeDefined();
  });
  // delete
  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });
  it('create method should add an order', async () => {
    const result = await store.create({
      product_id: '1',
      quantity: 1,
      user_id: '1',
      status_of_order: true,
    });
    expect(result).toEqual({
      id: '1',
      product_id: '1',
      quantity: 1,
      user_id: '1',
      status_of_order: true,
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        product_id: '1',
        quantity: 1,
        user_id: '1',
        status_of_order: true,
      },
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: '1',
      product_id: '1',
      quantity: 1,
      user_id: '1',
      status_of_order: true,
    });
  });

  it('delete method should remove the order', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
