import client from '../database';

export type Order = {
  id?: number | string;
  product_id: number | string;
  quantity: number;
  user_id: number | string;
  status_of_order: boolean;
};

export class OrderStore {
  // get all orders
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders RETURNING *';

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error ${err}`);
    }
  }

  // get one order
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=$1 RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  // create a new order
  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (product_id, quantity, user_id, status_of_order) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        o.product_id,
        o.quantity,
        o.user_id,
        o.status_of_order,
      ]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error ${err}`);
    }
  }

  // delete a order
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
