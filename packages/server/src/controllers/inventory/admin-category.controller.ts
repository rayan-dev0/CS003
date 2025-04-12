import { Request, Response } from "express";
import { getErrorMessage } from "../../utils/error";
import { addAdminCategory, getAllAdminCategories, updateAdminCategory, deleteAdminCategory } from "../../services/inventory/admin-category.service";

export const createNewAdminCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await addAdminCategory(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllAdminCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllAdminCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const updateAdminCategoryData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateAdminCategory(req.params.adminCategoryId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const removeAdminCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await deleteAdminCategory(req.params.adminCategoryId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}