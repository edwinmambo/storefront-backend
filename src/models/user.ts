import client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  username: string;
  first_name?: string;
  last_name?: string;
  password_digest: string;
};

export class UserStore {
  // get all users
  async getAllUsers(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users';
      const conn = await client.connect();

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error ${err}`);
    }
  }

  // get one user
  async getUserById(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=$1';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  // create a new user
  async createUser(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (username, first_name, last_name, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const conn = await client.connect();

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        u.username,
        u.first_name || '',
        u.last_name || '',
        hash,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error ${err}`);
    }
  }

  // update a user
  async updateUser(u: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET username=$2, first_name=$3, last_name=$4, password_digest=$5 WHERE id=$1 RETURNING *';
      const conn = await client.connect();

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        u.id,
        u.username,
        u.first_name,
        u.last_name,
        hash,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error ${err}`);
    }
  }

  // delete a user
  async deleteUser(id: number): Promise<User> {
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
    const sql = 'SELECT password_digest FROM users WHERE username=$1';

    const conn = await client.connect();
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
