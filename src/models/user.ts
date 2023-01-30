import client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number | string;
  username: string;
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
        'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *';
      const conn = await client.connect();

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds || '')
      );

      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error ${err}`);
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

  // authenticate a user
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=$1';
    const result = await conn.query(sql, [username]);

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
