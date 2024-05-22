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

// Retrieve a specific Product
const retrieveSingleProductFromDB = async (id: string) =>{
    const result = await ProductModel.findOne({_id:id});
    return result;
}

export const ProductServices = {
    createNewProductIntoDB,
    retrieveAllProductsFromDB,
    retrieveSingleProductFromDB,
}