import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utils/error";

export const authenticateAdminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const headerKey = req.header('adminKey');
        const adminKey = `Bearer-${process.env.ADMIN_SECRET_KEY}`;

        if(!headerKey || headerKey !== adminKey) {
            res.status(401).json({ error: "Unauthorized admin" });
            return;
        } else {
            next();
        }
    } catch (error) {
        res.status(401).send(getErrorMessage(error));
    }
}