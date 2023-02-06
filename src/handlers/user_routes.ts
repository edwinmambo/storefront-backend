import { Application, Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const indexUsers = async (_req: Request, res: Response) => {
  const users: User[] = await store.getAllUsers();
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const user: User = await store.getUserById(+req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    first_name: req.body?.first_name,
    last_name: req.body?.last_name,
    password_digest: req.body.password_digest,
  };

  try {
    const newUser: User = await store.createUser(user);
    let token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);
    console.log(token);
    res.status(201).json(token);
  } catch (err: any) {
    res.status(400);
    res.json(err + user);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const user: User = {
    id: +req.params.id,
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password_digest,
  };

  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    const decoded: any = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    );
    console.log(user.id, decoded.id);
    console.log(decoded);
    if (decoded.id !== user.id) {
      throw new Error('User id does not match!');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
  try {
    const updated: User = await store.updateUser(user);
    res.status(201).json(updated);
  } catch (err: any) {
    res.status(400);
    res.json(err + user);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser: User = await store.deleteUser(+req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password_digest: req.body.password_digest,
  };
  try {
    const u = await store.authenticate(user.username, user.password_digest);
    let token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.status(200).json(token);
  } catch (err) {
    res.status(401);
    res.json({ err });
  }
};

const userRoutes = (app: Application) => {
  app.get('/users', indexUsers);
  app.get('/users/:id', showUser);
  app.post('/users', createUser);
  app.patch('/users/:id', updateUser);
  app.delete('/users/:id', deleteUser);
};

export default userRoutes;
