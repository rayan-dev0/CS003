import { z } from "zod";
import SellerModel from "../schemas/seller.schema";
import { sellerValidation } from "../utils/zod";

export const addNewSeller = async (sellerData: z.infer<typeof sellerValidation>) => {
    try {
        const result = sellerValidation.safeParse(sellerData);
        if (!result.success) return { success: false, error: result.error.format() };

        if (await SellerModel.exists({ email: result.data.email })) {
            return { success: false, message: "Seller already exists" };
        }

        await SellerModel.create(result.data);
        return { success: true, message: "Seller added successfully" };
    } catch {
        return { success: false, error: "Internal server error" };
    }
};

export const getAllSellers = async () => {
    try {
        const sellers = await SellerModel.find();
        return { success: true, sellers };
    } catch {
        return { success: false, error: "Internal server error" };
    }
};

export const getOneSeller = async (email: string) => {
    try {
        const seller = await SellerModel.findOne({ email });
        return { success: true, seller };
    } catch (error) {
        return { success: false, error: "Internal server error" };
    }
}

const updateSellerValidation = sellerValidation.partial(); 

export const updateSellerData = async (sellerId: string, sellerData: z.infer<typeof updateSellerValidation>) => {
    try {
        const existingSeller = await SellerModel.findById(sellerId);
        if (!existingSeller) return { success: false, message: "Seller does not exist" };

        const result = updateSellerValidation.safeParse(sellerData);
        if (!result.success) return { success: false, error: result.error.format() };

        await SellerModel.findByIdAndUpdate(sellerId, { $set: result.data }, { new: true });
        return { success: true, message: "Seller updated successfully" };
    } catch {
        return { success: false, error: "Internal server error" };
    }
};

export const removeSeller = async (sellerId: string) => {
    try {
        const existingSeller = await SellerModel.findById(sellerId);
        if (!existingSeller) return { success: false, message: "Seller does not exist" };

        await SellerModel.findByIdAndDelete(sellerId);
        return { success: true, message: "Seller deleted successfully" };
    } catch {
        return { success: false, error: "Internal server error" };
    }
};