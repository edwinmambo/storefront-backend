import express from 'express';
import ordersRouter from './orders.route';
import productsRouter from './products.route';
import usersRouter from './users.route';

const apiRouter = express.Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/orders', ordersRouter);

export default apiRouter;
