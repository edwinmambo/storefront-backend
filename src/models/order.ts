import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status_of_order: string;
};

export class OrderStore {
  // get all orders
  getAllOrders = async (): Promise<Order[]> => {
    try {
      const sql = 'SELECT * FROM orders';
      const conn = await client.connect();

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error ${err}`);
    }
  };

  // get one order
  getOrderById = async (id: number): Promise<Order> => {
    try {
      const sql = 'SELECT * FROM orders WHERE id=$1';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  };

  // create a new order
  createOrder = async (o: Order): Promise<Order> => {
    try {
      const sql =
        'INSERT INTO orders (user_id, status_of_order) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [
        o.user_id,
        o.status_of_order || 'active',
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error ${err}`);
    }
  };

  // update an order
  updateOrder = async (o: Order): Promise<Order> => {
    try {
      const sql =
        'UPDATE orders SET user_id=$2, status_of_order=$3 WHERE id=$1 RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [
        o.id,
        o.user_id,
        o.status_of_order,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  };

  // delete a order
  deleteOrder = async (id: number): Promise<Order> => {
    try {
      const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  };
}
