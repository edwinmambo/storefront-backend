import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';

const store = new UserStore();

const indexUsers = async (_req: Request, res: Response) => {
  const users: User[] = await store.index();
  try {
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user: User = await store.show(id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser: User = await store.create(user);
    let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET || '');
    // res.json(token);
  } catch (err: any) {
    res.status(400);
    res.json(err + user);
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    const decoded: any = jwt.verify(
      token || '',
      process.env.TOKEN_SECRET || ''
    );
    if (decoded.id !== user.id) {
      throw new Error('User id does not match!');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
  try {
    const updated = await store.create(user);
    res.json(updated);
  } catch (err: any) {
    res.status(400);
    res.json(err + user);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedUser: User = await store.delete(id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', indexUsers);
  app.get('/users/:id', showUser);
  app.post('/users', createUser);
  app.delete('/users/:id', deleteUser);
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.username, user.password);
    let token = jwt.sign({ user: u }, process.env.TOKEN_SECRET || '');
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json({ err });
  }
};

export default userRoutes;
