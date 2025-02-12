import { string, z } from "zod";
import DeliveryModel from "../models/delivery.model";

const deliveryValidation = z.object({
    username: z.string().min(2, "Username must contain minimum 2 letters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be 6 characters long"),
    phoneNumber: z.string().length(10, "Phone number contain 10 digits"),
    sellers: z.array(string())
});

const updateDeliveryValidation = deliveryValidation.partial();

export const addNewDeliveryBoy = async (deliveryData: z.infer<typeof deliveryValidation>) => {
    try {
        const { email } = deliveryData;
        const existingDelivery = await DeliveryModel.findOne({ email });
        if(existingDelivery) return { success: false, message: "Delivery boy already exists" };

        await DeliveryModel.create(deliveryData);
        return {
            success: true,
            message: "Added delivery boy successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const removeDeliveryBoy = async (deliveryId: string) => {
    try {
        const existingDelivery = await DeliveryModel.findOne({ _id: deliveryId });
        if(!existingDelivery) return { success: false, message: "Delivery boy does not exists" };

        await DeliveryModel.findByIdAndDelete(deliveryId);
        return {
            success: true,
            message: "Delivery boy deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const updateDeliveryBoyData = async (deliveryId: string, deliveryData: z.infer<typeof updateDeliveryValidation>) => {
    try {
        const existingDelivery = await DeliveryModel.findById(deliveryId);
        if(!existingDelivery) return { success: false, message: "Delivery bot does not exist" };

        const result = updateDeliveryValidation.safeParse(deliveryData);
        if(!result.success) return { success: false, error: "Internal server error" }
        
        await DeliveryModel.findByIdAndUpdate(deliveryId, { $set: deliveryData }, { new: true });
        return {
            success: true,
            message: "Delivery boy updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const getAllDeliveryBoys = async () => {
    try {
        const sellers = await DeliveryModel.find();
        return {
            success: true,
            sellers
        }
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}