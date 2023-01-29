import client from '../database';

export type User = {
  id?: number | string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  // get all users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users RETURNING *';

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error ${err}`);
    }
  }

  // get one user
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=$1 RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  // create a new user
  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (product_id, quantity, user_id, status) VALUES ($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.password,
      ]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.id}. Error ${err}`);
    }
  }

  // delete a user
  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=$1 RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
