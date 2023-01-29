import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const indexOrders = async (_req: Request, res: Response) => {
  const orders: Order[] = await store.index();
  try {
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order: Order = await store.show(id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = req.body;
    const order: Order = await store.create(newOrder);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedOrder: Order = await store.delete(id);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', indexOrders);
  app.get('/orders/:id', showOrder);
  app.post('/orders', createOrder);
  app.delete('/orders/:id', deleteOrder);
};

export default orderRoutes;
