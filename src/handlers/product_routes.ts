import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const indexProducts = async (_req: Request, res: Response) => {
  const products: Product[] = await store.index();
  try {
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product: Product = await store.show(id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = req.body;
    const product: Product = await store.create(newProduct);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedProduct: Product = await store.delete(id);
    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', indexProducts);
  app.get('/products/:id', showProduct);
  app.post('/products', createProduct);
  app.delete('/products/:id', deleteProduct);
};

export default productRoutes;
