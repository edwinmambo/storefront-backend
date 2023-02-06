import { Order, OrderStore } from '../order';
import supertest from 'supertest';
import app from './index_spec';

const endpoint = supertest(app);
const store = new OrderStore();

describe('Order Model', () => {
  it('Test /orders endpoint and its response code', async () => {
    const orderRequest = endpoint.get('/orders');
    expect((await orderRequest).status).toBe(401);
  });

  // index
  it('should have an index method', () => {
    expect(store.getAllOrders).toBeDefined();
  });
  // show
  it('should have a show method', () => {
    expect(store.getOrderById).toBeDefined();
  });
  // create
  it('should have a create method', () => {
    expect(store.createOrder).toBeDefined();
  });
  // update
  it('should have an update method', () => {
    expect(store.updateOrder).toBeDefined();
  });
  // delete
  it('should have a delete method', () => {
    expect(store.deleteOrder).toBeDefined();
  });
  it('create method should add an order', async () => {
    setTimeout(async () => {
      const result: Order = await store.createOrder({
        user_id: 1,
        status_of_order: 'active',
      });
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status_of_order: 'active',
      });
    }, 10000);
  });

  it('index method should return a list of orders', async () => {
    setTimeout(async () => {
      const result: Order[] = await store.getAllOrders();
      expect(result).toEqual([
        {
          id: 1,
          user_id: 1,
          status_of_order: 'active',
        },
      ]);
    }, 10000);
  });

  it('show method should return the correct order', async () => {
    setTimeout(async () => {
      const result: Order = await store.getOrderById(1);
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status_of_order: 'active',
      });
    }, 10000);
  });

  it('update method should update the correct order', async () => {
    setTimeout(async () => {
      const result: Order = await store.updateOrder({
        user_id: 1,
        status_of_order: 'complete',
      });
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status_of_order: 'complete',
      });
    }, 10000);
  });

  it('delete method should remove the order', async () => {
    setTimeout(async () => {
      const _: Order = await store.deleteOrder(1);
      const result = await store.getAllOrders();

      expect(result).toEqual([]);
    });
  }, 10000);
});
