import { ProductModel } from "../products/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// Create a new order in the database
// const createNewOrderIntoDB = async (order: TOrder) => {
//   const result = await OrderModel.create(order);
//   return result
// };

const createNewOrderIntoDB = async (order: TOrder) => {
  try {
    // Find the product to check inventory
    const product = await ProductModel.findById(order.productId);

    if (!product) {
      console.error(`Product not found: ${order.productId}`);
      throw new Error("Product not found");
    }

    // Check if the ordered quantity exceeds available inventory
    if (order.quantity > product.inventory.quantity) {
      throw new Error("Insufficient stock");
    }

    // Update inventory
    product.inventory.quantity -= order.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the updated product
    await product.save();

    // Create the order
    const result = await OrderModel.create(order);
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
// Retrieve orders based on a query
const retrieveOrdersFromDB = async (query: object) => {
  const result = await OrderModel.find(query);
  return result;
};


export const OrderServices = {
  createNewOrderIntoDB,
  retrieveOrdersFromDB
};
