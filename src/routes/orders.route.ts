import express from 'express';
import authoriseToken from '../auth/authorisation.auth';
import OrderController from '../controllers/order.controller';

const ordersRouter = express.Router();
const controller = new OrderController();

ordersRouter.get('/', authoriseToken, controller.getAllOrders);
ordersRouter.get('/:id', authoriseToken, controller.getOrderById);
ordersRouter.post('/', authoriseToken, controller.createOrder);
ordersRouter.put('/:id', authoriseToken, controller.updateOrder);
ordersRouter.delete('/:id', authoriseToken, controller.deleteOrder);

export default ordersRouter;
