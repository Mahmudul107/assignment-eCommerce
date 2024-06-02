import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

// Schema for TVariant
const variantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

// Schema for TInventory
const inventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false }
);

// Schema for TProduct
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Query middleware
productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

productSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

// Query middleware/hook for preventing to get deleted data: aggregate
productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Product = model<TProduct>("Product", productSchema);
