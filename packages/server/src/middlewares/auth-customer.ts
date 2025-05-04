import { NextFunction, Response } from "express";
import { getErrorMessage } from "../utils/error";
import { AuthRequest } from "../utils/types";
import CustomerModel from "../schemas/customer.schema";

export const authenticateCustomerMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const header = req.header('customerId');
        const customer = await CustomerModel.findById(header);

        if(!header || header !== customer?.id) {
            res.status(401).json({ error: "Unauthorized customer" });
            return;
        } else {
            req.user = header;
            next();
        }
    } catch (error) {
        res.status(401).send(getErrorMessage(error));
    }
}