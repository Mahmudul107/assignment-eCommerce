import express, { Request, Response } from "express";
import { ProductController } from "./product.controller";
import { Product } from "./product.model";

const router = express.Router();

// Create a new product
router.post("/api/products", ProductController.createNewProduct);

// Retrieve a List of All Products
// router.get("/api/products", ProductController.getAllProducts);

router.get("/api/products", async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    if (searchTerm) {
      const regex = new RegExp(searchTerm as string, "i");
      const products = await Product.find({ name: regex });

      if (products.length === 0) {
        // If no products match the search term, return a message
        return res.status(404).json({
          success: false,
          message: `No products found matching '${searchTerm}'`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } else {
      const allProducts = await Product.find();

      return res.status(200).json({
        success: true,
        message: "All products fetched successfully!",
        data: allProducts,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      // error: error.message,
    });
  }
});

// Retrieve a single Product
router.get("/api/products/:productId", ProductController.getSingleProduct);

// Update Product Information
router.put("/api/products/:productId", ProductController.updateProduct);

// Delete a Product from DB
router.delete("/api/products/:productId", ProductController.deleteProduct);

export const ProductRoutes = router;
