import { Request, Response } from "express";
import { getErrorMessage } from "../../utils/error";
import { addSubCategory, deleteSubCategory, getAllSubCategories, updateSubCategory } from "../../services/inventory/sub-category.service";

export const createNewSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await addSubCategory({...req.body, seller: req.seller});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllSubCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllSubCategories(req.seller as string);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const updateSubCategoryData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateSubCategory(req.params.subCategoryId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const removeSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await deleteSubCategory(req.params.subCategoryId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}