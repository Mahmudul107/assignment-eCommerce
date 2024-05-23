import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { z } from "zod";
import orderValidationSchema from "./order.validation";

const createNewOrder = async (req: Request, res: Response) => {
  try {
    // Schema validation using Zod
    
    const { order: orderData } = req.body;
    
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createNewOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // Construct the query object
    const query = email ? { email: email as string } : {};

    // Retrieve orders based on the query object
    const result = await OrderServices.retrieveOrdersFromDB(query);

    // Set the success message based on the presence of the email
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
  getOrders
};
