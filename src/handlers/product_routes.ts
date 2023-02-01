import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';

const store = new ProductStore();

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await store.getProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product: Product = await store.getProductsById(
      parseInt(req.params.id)
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = req.body;
    const product: Product = await store.createProduct(newProduct);
    res.status(201).json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      id: +req.params.id,
      name: req.body?.name,
      price: +req.body?.price,
      category: req.body?.category,
    };

    const updatedProduct: Product = await store.updateProduct(newProduct);
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct: Product = await store.deleteProduct(+req.params.id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', getAllProducts);
  app.get('/products/:id', getProductById);
  app.post('/products', createProduct);
  app.patch('/products/:id', updateProduct);
  app.delete('/products/:id', deleteProduct);
};

export default productRoutes;
