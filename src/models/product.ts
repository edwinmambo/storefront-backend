import client from '../database';

export type Product = {
  id?: string | number;
  name: string;
  price: number;
  category?: string | null;
};

export class ProductStore {
  // get all products
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error ${err}`);
    }
  }

  // get one product
  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=$1';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  // create a new product
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        p.name,
        p.price,
        p.category || null,
      ]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error ${err}`);
    }
  }

  // delete a product
  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=$1 RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
