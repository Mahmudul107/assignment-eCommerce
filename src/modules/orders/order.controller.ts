import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createNewOrder = async (req: Request, res: Response) => {
  const { order: orderData } = req.body;

  try {
    const result = await OrderServices.createNewOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// Retrieve a List of All Products
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.retrieveAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// Retrieve orders by user email
const getOrdersByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.query;
      const result = await OrderServices.retrieveOrdersByEmailFromDB(email as string);
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error fetching orders",
      });
    }
  };

export const OrderController = {
  createNewOrder,
  getAllOrders,
  getOrdersByEmail,
};
