import { Product, ProductStore } from '../product';
import supertest from 'supertest';
import app from './index_spec';

const endpoint = supertest(app);
const store = new ProductStore();

describe('Product Model', () => {
  it('Test /product endpoint and its response code', async () => {
    const productRequest = endpoint.get('/products');
    expect((await productRequest).status).toBe(400);
  });

  // index
  it('should have an index method', () => {
    expect(store.getProducts).toBeDefined();
  });
  // show
  it('should have a show method', () => {
    expect(store.getProductsById).toBeDefined();
  });
  // create
  it('should have a create method', () => {
    expect(store.createProduct).toBeDefined();
  });
  // update
  it('should have a update method', () => {
    expect(store.updateProduct).toBeDefined();
  });
  // delete
  it('should have a delete method', () => {
    expect(store.deleteProduct).toBeDefined();
  });
  it('create method should add a product', async () => {
    setTimeout(async () => {
      const result: Product = await store.createProduct({
        name: 'Book',
        price: 20,
      });
      expect(result).toEqual({
        id: 1,
        name: 'Book',
        price: 20,
        category: 'general',
      });
    }, 10000);
  });

  it('index method should return a list of products', async () => {
    setTimeout(async () => {
      const result: Product[] = await store.getProducts();
      expect(result).toEqual([
        {
          id: 1,
          name: 'Book',
          price: 20,
          category: 'general',
        },
      ]);
    }, 10000);
  });

  it('show method should return the correct product', async () => {
    setTimeout(async () => {
      const result: Product = await store.getProductsById(1);
      expect(result).toEqual({
        id: 1,
        name: 'Book',
        price: 20,
        category: 'general',
      });
    }, 10000);
  });

  it('update method should modify the correct product', async () => {
    setTimeout(async () => {
      const result: Product = await store.updateProduct({
        name: 'Book',
        price: 25,
        category: 'books',
      });
      expect(result).toEqual({
        id: 1,
        name: 'Book',
        price: 25,
        category: 'books',
      });
    }, 10000);
  });

  it('delete method should remove the product', async () => {
    setTimeout(async () => {
      const _: Product = await store.deleteProduct(1);
      const result = await store.getProducts();

      expect(result).toEqual([]);
    });
  }, 10000);
});
