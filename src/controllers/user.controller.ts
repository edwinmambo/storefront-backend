import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user.model';
import { User } from '../types/index.type';

const store = new UserStore();

export default class UserController {
  getAllUsers = async (_req: Request, res: Response) => {
    const users: User[] = await store.getAllUsers();
    try {
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const user: User = await store.getUserById(+req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  createUser = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      first_name: req.body?.first_name,
      last_name: req.body?.last_name,
      password_digest: req.body.password_digest,
    };

    try {
      const newUser: User = await store.createUser(user);
      const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);
      res.status(201).json(token);
    } catch (err: any) {
      res.status(400).json(err + user);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const user: User = {
      id: +req.params.id,
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password_digest: req.body.password_digest,
    };

    try {
      const updated: User = await store.updateUser(user);
      res.status(201).json(updated);
    } catch (err: any) {
      res.status(400).json(err + user);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const deletedUser: User = await store.deleteUser(+req.params.id);
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  };
}
