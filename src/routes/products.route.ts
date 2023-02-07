import express from 'express';
import authoriseToken from '../auth/authorisation.auth';
import { productController } from '../controllers/index.controller';

const productsRouter = express.Router();
const controller = new productController();

productsRouter.get('/', controller.getAllProducts);
productsRouter.get('/:id', controller.getProductById);
productsRouter.post('/', authoriseToken, controller.createProduct);
productsRouter.patch('/:id', authoriseToken, controller.updateProduct);
productsRouter.delete('/:id', authoriseToken, controller.deleteProduct);

export default productsRouter;
