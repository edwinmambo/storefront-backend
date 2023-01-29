import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

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
  try {
    const newUser: User = req.body;
    const user: User = await store.create(newUser);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
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

export default userRoutes;
