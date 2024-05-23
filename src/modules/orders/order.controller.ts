import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // if required data exists
    if (!orderData || !orderData.productId || !orderData.quantity) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    // if the ordered quantity is a positive integer
    const quantity = parseInt(orderData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // Create the new order
    const result = await OrderServices.createNewOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    let statusCode = 500;
    let message = "Internal Server Error";

    // Type assertion to specify the type of error
    const err = error as Error;

    if (err.message === "Insufficient quantity available in inventory") {
      statusCode = 400;
      message = err.message;
    }

    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // build query object
    const query = email ? { email: email as string } : {};

    // Retrieve orders based on the query object
    const result = await OrderServices.retrieveOrdersFromDB(query);

    // Set the success message based on email
    const message = email
      ? `Orders fetched successfully for user ${email} `
      : "Orders fetched successfully!";

    res.status(200).json({
      success: true,
      message: message,
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
  getOrders,
};
