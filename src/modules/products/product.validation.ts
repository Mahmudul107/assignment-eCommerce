import { z } from "zod";

/// Zod schema for variant
const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string()
});

// Zod schema for inventory
const inventoryValidationSchema = z.object({
  quantity: z.number().nonnegative(),
  inStock: z.boolean(),
});

// Zod schema for product
const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
  isDeleted: z.boolean().default(false),
});

export default productValidationSchema;
