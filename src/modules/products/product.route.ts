import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// Create a new product
router.post('/api/products', ProductController.createNewProduct);

// Retrieve a List of All Products
router.get('/api/products', ProductController.getAllProducts);

// Retrieve a List of All Products
router.get('/api/products/:productId', ProductController.getSingleProduct);





export const ProductRoutes = router;