import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createNewOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

// Retrieve a List of All Orders
const retrieveAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// Retrieve orders by user email
const retrieveOrdersByEmailFromDB = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

export const OrderServices = {
  createNewOrderIntoDB,
  retrieveAllOrdersFromDB,
  retrieveOrdersByEmailFromDB,
};
