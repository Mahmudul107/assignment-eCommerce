import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createNewOrderIntoDB = async (order: TOrder) => {
   // Check if the ordered quantity is available in inventory
   const product = await OrderModel.findById(order.productId);
   if (!product || product.quantity < order.quantity) {
     throw new Error("Insufficient quantity available in inventory");
   }
 
   // Reduce inventory quantity
   product.quantity -= order.quantity;
   // Update inStock status
   product.inStock = product.quantity > 0;
   // Save the updated product
   await product.save();

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
