import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// Create a new product
router.post("/api/orders", OrderController.createNewOrder);

// // Retrieve a List of All Products
// router.get("/api/products", ProductController.getAllProducts);

// // Retrieve a single Product
// router.get("/api/products/:productId", ProductController.getSingleProduct);

// // Update Product Information
// router.put("/api/products/:productId", ProductController.updateProduct);

// // Delete a Product from DB
// router.delete("/api/products/:productId", ProductController.deleteProduct);


export const OrderRoutes = router;
