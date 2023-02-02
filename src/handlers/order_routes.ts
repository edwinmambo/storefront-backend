import { Application, Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const getAllOrders = async (_req: Request, res: Response) => {
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
    const order: Order = await store.getOrderById(+req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createOrder = async (req: Request, res: Response) => {
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
