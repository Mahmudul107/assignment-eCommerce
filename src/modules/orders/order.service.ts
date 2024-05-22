import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createNewOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

export const OrderServices = {
  createNewOrderIntoDB,
};
