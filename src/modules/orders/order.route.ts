import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// Create a new order
router.post("/api/orders", OrderController.createNewOrder);

// Retrieve a List of All orders
router.get("/api/orders", OrderController.getAllOrders);

// Retrieve orders by user email
router.get("/api/orders/email", OrderController.getOrdersByEmail);


export const OrderRoutes = router;
