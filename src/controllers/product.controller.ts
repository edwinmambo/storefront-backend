import { Request, Response } from 'express';
import { ProductStore } from '../models/index.model';
import { Product } from '../types/index.type';

const store = new ProductStore();

export default class ProductController {
  getAllProducts = async (_req: Request, res: Response) => {
    try {
      const products: Product[] = await store.getProducts();
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  getProductById = async (req: Request, res: Response) => {
    try {
      const product: Product = await store.getProductById(+req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const newProduct: Product = req.body;
      const product: Product = await store.createProduct(newProduct);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  updateProduct = async (req: Request, res: Response) => {
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

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const deletedProduct: Product = await store.deleteProduct(+req.params.id);
      res.status(200).json(deletedProduct);
    } catch (err) {
      res.status(400).json(err);
      res.json(err);
    }
  };
}
