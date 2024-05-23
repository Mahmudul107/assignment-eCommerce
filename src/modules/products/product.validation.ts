import Joi from "joi";


// Joi schema for variant
const variantValidationSchema = Joi.object({
  type: Joi.string().required().messages({
    'any.required': 'Variant type is required.',
    'string.empty': 'Variant type cannot be empty.',
  }),
  value: Joi.string().required().messages({
    'any.required': 'Variant value is required.',
    'string.empty': 'Variant value cannot be empty.',
  }),
});

// Joi schema for inventory
const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required().messages({
    'any.required': 'Inventory quantity is required.',
    'number.base': 'Inventory quantity must be a number.',
  }),
  inStock: Joi.boolean().required().messages({
    'any.required': 'Inventory status is required.',
    'boolean.base': 'Inventory status must be true or false.',
  }),
});

// Joi schema for product
const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Product name is required.',
    'string.empty': 'Product name cannot be empty.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Product description is required.',
    'string.empty': 'Product description cannot be empty.',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Product price is required.',
    'number.base': 'Product price must be a number.',
  }),
  category: Joi.string().required().messages({
    'any.required': 'Product category is required.',
    'string.empty': 'Product category cannot be empty.',
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Product tags are required.',
    'array.base': 'Product tags must be an array.',
    'array.empty': 'Product tags cannot be empty.',
  }),
  variants: Joi.array().items(variantValidationSchema).required().messages({
    'any.required': 'Product variants are required.',
    'array.base': 'Product variants must be an array.',
    'array.empty': 'Product variants cannot be empty.',
  }),
  inventory: inventoryValidationSchema.required().messages({
    'any.required': 'Product inventory is required.',
    'object.base': 'Product inventory must be an object.',
  }),
  isDeleted: Joi.boolean().default(false),
});


export default productValidationSchema;
