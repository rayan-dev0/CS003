import { Request, Response } from "express";
import { addNewDeliveryAgent, getAllDeliveryAgents, getOneDeliveryAgent, removeDeliveryAgent, updateAgentData } from "../services/agent.service";
import { getErrorMessage } from "../utils/error";

export const createDeliveryAgentAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await addNewDeliveryAgent(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchAllDeliveryAgentAccounts= async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllDeliveryAgents();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const fetchDeliveryAgentAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getOneDeliveryAgent(req.params.agentId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const updateDeliveryAgentAccountData = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateAgentData(req.params.agentId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}

export const deleteDeliveryAgentAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await removeDeliveryAgent(req.params.agentId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    }
}