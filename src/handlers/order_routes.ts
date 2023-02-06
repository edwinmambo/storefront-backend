import { Application, Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import jwt from 'jsonwebtoken';

const store = new OrderStore();

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token. Error ${err}`);
    return;
  }
  const orders: Order[] = await store.getAllOrders();
  try {
    res.status(200).json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token. Error ${err}`);
    return;
  }
  try {
    const order: Order = await store.getOrderById(+req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token. Error ${err}`);
    return;
  }
  try {
    const newOrder: Order = {
      user_id: +req.body.user_id,
      status_of_order: req.body.status_of_order,
    };
    const order: Order = await store.createOrder(newOrder);
    res.status(201).json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token. Error ${err}`);
    return;
  }
  try {
    const order: Order = {
      id: +req.params.id,
      user_id: req.body.user_id,
      status_of_order: req.body.status_of_order,
    };

    const updatedOrder = await store.updateOrder(order);
    res.status(201).json();
  } catch (err: any) {
    res.status(400).json(err + updateOrder);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token. Error ${err}`);
    return;
  }
  try {
    const deletedOrder: Order = await store.deleteOrder(+req.params.id);
    res.status(200).json(deletedOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orderRoutes = (app: Application) => {
  app.get('/orders', getAllOrders);
  app.get('/orders/:id', getOrderById);
  app.post('/orders', createOrder);
  app.patch('/orders/:id', updateOrder);
  app.delete('/orders/:id', deleteOrder);
};

export default orderRoutes;
