import { Request, Response } from "express";
import { getErrorMessage } from "../../utils/error";
import { addProduct, deleteProduct, getAllProducts, updateProduct, uploadImgToAzure } from "../../services/inventory/product.service";
import { AuthRequest } from "../../utils/types";

export const createNewProduct = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const result = await addProduct({...req.body, seller: req.seller});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllProducts = async (req: AuthRequest, res: Response): Promise<void> => {
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

export const uploadImgToBlobStorage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }

        const urls = await Promise.all(
            files.map(file => uploadImgToAzure(file.buffer, file.originalname))
        );

        res.status(200).json({ urls });
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}