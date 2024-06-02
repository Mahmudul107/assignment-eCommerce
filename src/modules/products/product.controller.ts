import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createNewProduct = async (req: Request, res: Response) => {
  const product = req.body;

  // Validate product data
  const { error } = productValidationSchema.safeParse(product);

  try {
    if (error) {
      // If validation fails, return validation errors
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    // If validation passes, create the new product
    const result = await ProductServices.createNewProductIntoDB(product);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// Retrieve a List of All Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.retrieveAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// Retrieve a single Product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.retrieveSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// Update Product
// const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const updateData = req.body;
//     const result = await ProductServices.updateSingleProductFromDB(
//       productId,
//       updateData
//     );
//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully!",
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// Update Product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body as Partial<TProduct>;

    // Ensure updateData is not empty
    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    // Find the product by ID and update it
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const formattedResult: TProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      tags: product.tags,
      variants: product.variants,
      inventory: {
        quantity: product.inventory.quantity,
        inStock: product.inventory.quantity > 0,
      },
      isDeleted: product.isDeleted,
    };

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: formattedResult,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
      error: err instanceof Error ? { message: err.message } : err,
    });
  }
};

// Delete Product
// const deleteProduct = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const result = await ProductServices.deleteProductFromDB(productId);
//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully!",
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product",
      data: null,
      error: error instanceof Error ? { message: error.message } : error,
    });
  }
};

export const ProductController = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
