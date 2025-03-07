import { Request, Response } from "express";
import { addNewSeller, getAllSellers, getOneSeller, removeSeller, updateSellerData } from "../services/seller.service";
import { getErrorMessage } from "../utils/error";

export const createSellerAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const credentials = req.body;
        const result = await addNewSeller(credentials);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllSellerAccounts= async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllSellers();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchSellerAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getOneSeller(req.params.emailId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const updateSellerAccountData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateSellerData(req.params.sellerId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const deleteSellerAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await removeSeller(req.params.sellerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}