import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createNewProduct = async (req: Request, res: Response) => {
  const { product: productData } = req.body;

  try {
    const result = await ProductServices.createNewProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


// Retrieve a List of All Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.retrieveAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Movies fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createNewProduct,
  getAllProducts
};
