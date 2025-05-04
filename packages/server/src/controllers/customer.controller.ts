import { Request, Response } from "express";
import { addNewCustomer, getAllCustomers, getOneCustomer, removeCustomer, updateCustomerData } from "../services/customer.service";
import { getErrorMessage } from "../utils/error";

export const createCustomerAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await addNewCustomer(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllCustomerAccounts= async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllCustomers();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchCustomerAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getOneCustomer(req.params.phoneNumber);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const updateCustomerAccountData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateCustomerData(req.params.customerId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const deleteCustomerAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await removeCustomer(req.params.customerId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}