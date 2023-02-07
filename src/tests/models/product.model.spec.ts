import ProductStore from '../../models/product.model';
import Product from '../../types/product.type';

const store = new ProductStore();

describe('Product Model', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  let originalTimeout: number;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  // index
  it('should have an index method', () => {
    expect(store.getProducts).toBeDefined();
  });
  // show
  it('should have a show method', () => {
    expect(store.getProductById).toBeDefined();
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
  it('should create a product', async () => {
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

  it('should return a list of products', async () => {
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

  it('should return the correct product', async () => {
    setTimeout(async () => {
      const result: Product = await store.getProductById(1);
      expect(result).toEqual({
        id: 1,
        name: 'Book',
        price: 20,
        category: 'general',
      });
    }, 10000);
  });

  it('should update the product', async () => {
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

  it('should delete the product', async () => {
    setTimeout(async () => {
      const _: Product = await store.deleteProduct(1);
      const result = await store.getProducts();

      expect(result).toEqual([]);
    });
  }, 10000);
});
