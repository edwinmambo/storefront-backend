import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
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
      const result = await store.createProduct({
        name: 'Book',
        price: 20,
      });
      expect(result).toEqual({
        id: 1,
        name: 'Book',
        price: 20,
        category: 'general',
      });
    }, 5000);
  });

  it('index method should return a list of products', async () => {
    setTimeout(async () => {
      const result = await store.getProducts();
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
      const result = await store.getProductsById(1);
      expect(result).toEqual({
        id: 1,
        name: 'Book',
        price: 20,
        category: 'general',
      });
    }, 5000);
  });

  it('update method should modify the correct product', async () => {
    setTimeout(async () => {
      const result = await store.updateProduct({
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
    }, 5000);
  });

  it('delete method should remove the product', async () => {
    setTimeout(async () => {
      store.deleteProduct(1);
      const result = await store.getProducts();

      expect(result).toEqual([]);
    });
  }, 10000);
});
