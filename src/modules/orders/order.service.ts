import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// Create a new order in the database
// const createNewOrderIntoDB = async (order: TOrder) => {
//   const result = await OrderModel.create(order);
//   return result
// };

const createNewOrderIntoDB = async (order: TOrder) => {
  const product = await Product.findById(order.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (order.quantity > product.inventory.quantity) {
    throw new Error("Insufficient stock");
  }

  const result = await OrderModel.create(order);

  // Update inventory
  product.inventory.quantity -= order.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return result;
};

// Retrieve orders based on a query
const retrieveOrdersFromDB = async (query: object) => {
  const result = await OrderModel.find(query);
  return result;
};

export const OrderServices = {
  createNewOrderIntoDB,
  retrieveOrdersFromDB,
};
