import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { TOrder } from "./order.interface";
import orderValidationSchema from "./order.validation";

const createNewOrder = async (req: Request, res: Response) => {
  const { order: orderData } = req.body;

  // Validate order data
  const validationResult = orderValidationSchema.safeParse(orderData);

  try {
    if (validationResult.success) {
      // If validation succeeds, create the new order
      const result = await OrderServices.createNewOrderIntoDB(orderData);

      // Send success response
      res.status(201).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    } else {
      // If validation fails, return validation errors
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.errors,
      });
    }
  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// const createNewOrder = async (req: Request, res: Response) => {
//   const orderData: TOrder = req.body;

//   try {
//     const result = await OrderServices.createNewOrderIntoDB(orderData);

//     res.status(200).json({
//       success: true,
//       message: "Order created successfully!",
//       data: result,
//     });
//   } catch (err:any) {
//     console.error("Error in createNewOrder:", err); // Log the error
//     res.status(500).json({
//       success: false,
//       message: err.message || "Error creating order",
//     });
//   }
// };

// get orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // build query object
    const query = email ? { email: email as string } : {};

    // Retrieve orders based on the query object
    const result = await OrderServices.retrieveOrdersFromDB(query);

    // Set the success message based on email
    const message = email
      ? `Orders fetched successfully for user email: ${email} `
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
