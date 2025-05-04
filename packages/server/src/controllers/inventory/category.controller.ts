import { Request, Response } from "express";
import { getErrorMessage } from "../../utils/error";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/inventory/category.service";
import { AuthRequest } from "../../utils/types";

export const createNewCategory = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const result = await addCategory({...req.body, seller: req.user});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllCategories = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const result = await getAllCategories(req.user as string);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const updateCategoryData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateCategory(req.params.categoryId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const removeCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await deleteCategory(req.params.categoryId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}