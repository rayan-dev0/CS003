import { Request, Response } from "express";
import { getErrorMessage } from "../utils/error";
import { AuthRequest } from "../utils/types";
import { allOrdersForCustomer, allOrdersForSeller, newOrder, removeOrder, updateOrderData } from "../services/order.service";

export const createNewOrder = async (req: AuthRequest, res: Response) => {
    try {
        const result = await newOrder({ ...req.body, customerId: req.user });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const getOrdersForSeller = async (req: AuthRequest, res: Response) => {
    try {
        const result = await allOrdersForSeller(req.user as string);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const getOrdersForCustomer = async (req: AuthRequest, res: Response) => {
    try {
        const result = await allOrdersForCustomer(req.user as string);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const modifyOrder = async (req: Request, res: Response) => {
    try {
        const result = await updateOrderData(req.params.orderId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const result = await removeOrder(req.params.orderId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}