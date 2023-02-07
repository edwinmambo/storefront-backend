import client from '../database';
import { Product } from '../types/index.type';

export default class ProductStore {
  // get all products
  getProducts = async (): Promise<Product[]> => {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error ${err}`);
    }
  };

  // get one product
  getProductById = async (id: number): Promise<Product> => {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  };

  // create a new product
  createProduct = async (p: Product): Promise<Product> => {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();
      const result = await conn.query(sql, [
        p.name,
        p.price,
        p.category || 'general',
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error ${err}`);
    }
  };

  // update an existing product
  updateProduct = async (p: Product) => {
    try {
      const sql =
        'UPDATE products SET name=($2), price=($3), category=($4) WHERE id=($1) RETURNING *';

      const conn = await client.connect();
      const result = await conn.query(sql, [p.id, p.name, p.price, p.category]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${p.name}. Error ${err}`);
    }
  };

  // delete a product
  deleteProduct = async (id: number): Promise<Product> => {
    try {
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  };
}
