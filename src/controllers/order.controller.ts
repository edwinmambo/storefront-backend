import { Request, Response } from 'express';
import { OrderStore } from '../models/order.model';
import { Order } from '../types/index.type';

const store = new OrderStore();

export default class OrderController {
  getAllOrders = async (req: Request, res: Response) => {
    const orders: Order[] = await store.getAllOrders();
    try {
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  getOrderById = async (req: Request, res: Response) => {
    try {
      const order: Order = await store.getOrderById(+req.params.id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  createOrder = async (req: Request, res: Response) => {
    try {
      const newOrder: Order = {
        user_id: +req.body.user_id,
        status_of_order: req.body.status_of_order,
      };
      const order: Order = await store.createOrder(newOrder);
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  updateOrder = async (req: Request, res: Response) => {
    try {
      const order: Order = {
        id: +req.params.id,
        user_id: req.body.user_id,
        status_of_order: req.body.status_of_order,
      };

      const updatedOrder: Order = await store.updateOrder(order);
      res.status(201).json(updatedOrder);
    } catch (err: any) {
      res.status(400).json(err);
    }
  };

  deleteOrder = async (req: Request, res: Response) => {
    try {
      const deletedOrder: Order = await store.deleteOrder(+req.params.id);
      res.status(200).json(deletedOrder);
    } catch (err) {
      res.status(400).json(err);
    }
  };
}
