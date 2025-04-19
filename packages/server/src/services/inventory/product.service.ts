import { z } from "zod";
import ProductModel from "../../schemas/inventory/product.schema";
import { productValidation } from "../../utils/zod";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from 'uuid';

export const addProduct = async (productData: z.infer<typeof productValidation>) => {
    try {
        const result = productValidation.safeParse(productData);
        if(!result.success) return { success: false, error: result.error.format() };

        const existingProduct = await ProductModel.findOne({ name: productData.name });
        if(existingProduct) return { success: false, message: "Product already exists" };

        await ProductModel.create(result.data);
        return { success: true, message: "Product created successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const getAllProducts = async (sellerId: string) => {
    try {
        const products = await ProductModel.find({ seller: sellerId });
        return { success: true, products };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

const updateProductValidation = productValidation.partial();

export const updateProduct = async (productId: string, productData: z.infer<typeof updateProductValidation>) => {
    try {
        const existingProduct = await ProductModel.findById(productId);
        if(!existingProduct) return { success: false, message: "Product does not exist" };

        const result = updateProductValidation.safeParse(productData);
        if(!result.success) return { success: false, error: result.error.format() };

        await ProductModel.findByIdAndUpdate(productId, { $set: productData }, { new: true });
        return { success: true, message: "Product updated successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        const existingProduct = await ProductModel.findById(productId);
        if(!existingProduct) return { success: false, message: "Product does not exist" };

        await ProductModel.findByIdAndDelete(productId);
        return { success: true, message: "Product deleted successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const uploadImgToAzure = async (fileBuffer: Buffer, originalName: string): Promise<string> => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING as string);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME as string);

    const blobName = `${uuidv4()}-${originalName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: { blobContentType: 'image/png' }, 
    });

    return blockBlobClient.url;
};