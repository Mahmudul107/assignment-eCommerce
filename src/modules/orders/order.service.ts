import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createNewOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
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
