import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createNewProductIntoDB = async (product: TProduct) =>{
    
       const result =  await ProductModel.create(product);
       return result
}

// Retrieve a List of All Products
const retrieveAllProductsFromDB = async () =>{
    const result = await ProductModel.find();
    return result;
}

export const ProductServices = {
    createNewProductIntoDB,
    retrieveAllProductsFromDB,
}