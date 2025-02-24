import { Request, Response } from "express";
import { getErrorMessage } from "../../utils/error";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../services/inventory/product.service";

export const createNewProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await addProduct({...req.body, seller: req.seller});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllProducts(req.seller as string);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const updateProductData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateProduct(req.params.productId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await deleteProduct(req.params.productId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}