import { NextFunction, Response } from "express";
import { getErrorMessage } from "../utils/error";
import SellerModel from "../schemas/seller.schema";
import { AuthRequest } from "../utils/types";

export const authenticateSellerMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const header = req.header('sellerId');
        const seller = await SellerModel.findById(header);

        if(!header || header !== seller?.id) {
            res.status(401).json({ error: "Unauthorized seller" });
            return;
        } else {
            req.user = header;
            next();
        }
    } catch (error) {
        res.status(401).send(getErrorMessage(error));
    }
}