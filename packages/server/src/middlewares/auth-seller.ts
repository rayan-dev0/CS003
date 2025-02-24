import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utils/error";
import SellerModel from "../schemas/seller.schema";

export const authenticateSellerMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const header = req.header('sellerId');
        const seller = await SellerModel.findById(header);

        if(!header || header !== seller?.id) {
            res.status(401).json({ error: "Unauthorized seller" });
            return;
        } else {
            req.seller = header;
            next();
        }
    } catch (error) {
        res.status(401).send(getErrorMessage(error));
    }
}