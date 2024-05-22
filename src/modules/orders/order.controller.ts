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

export const OrderController = {
  createNewOrder,
};
