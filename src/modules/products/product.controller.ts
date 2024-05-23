import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createNewProduct = async (req: Request, res: Response) => {
  const { product: productData } = req.body;

  // Validate product data
  const { error } = productValidationSchema.safeParse(productData);

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
    const result = await ProductServices.createNewProductIntoDB(productData);

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
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    console.log(updateData, "updated product data -controller");
    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      updateData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete Product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
