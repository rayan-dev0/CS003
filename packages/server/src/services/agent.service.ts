import { z } from "zod";
import AgentModel from "../schemas/agent.schema";
import { agentValidation } from "../utils/zod";

export const addNewDeliveryAgent = async (agentData: z.infer<typeof agentValidation>) => {
    try {
        const { email } = agentData;
        const existingAgent = await AgentModel.findOne({ email });
        if(existingAgent) return { success: false, message: "Delivery agent already exists" };

        await AgentModel.create(agentData);
        return {
            success: true,
            message: "Added delivery agent successfully"
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const getAllDeliveryAgents = async () => {
    try {
        const agents = await AgentModel.find();
        return {
            success: true,
            agents
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const getOneDeliveryAgent = async (agentId: string) => {
    try {
        const agent = await AgentModel.findById(agentId);
        return {
            success: true,
            agent
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

const updateAgentValidation =agentValidation.partial();

export const updateAgentData = async (agentId: string, agentData: z.infer<typeof updateAgentValidation>) => {
    try {
        const existingAgent = await AgentModel.findById(agentId);
        if(!existingAgent) return { success: false, message: "Delivery agent does not exist" };

        const result = updateAgentValidation.safeParse(agentData);
        if(!result.success) return { success: false, error: "Internal server error" }
        
        await AgentModel.findByIdAndUpdate(agentId, { $set: agentData }, { new: true });
        return {
            success: true,
            message: "Delivery agent updated successfully"
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const removeDeliveryAgent = async (agentId: string) => {
    try {
        const existingAgent = await AgentModel.findById(agentId);
        if(!existingAgent) return { success: false, message: "Delivery agent does not exists" };

        await AgentModel.findByIdAndDelete(agentId);
        return {
            success: true,
            message: "Delivery agent deleted successfully"
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}