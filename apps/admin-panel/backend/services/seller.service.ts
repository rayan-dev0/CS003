import { z } from "zod";
import SellerModel from "../models/seller.model";
import { sellerValidation } from "@/lib/zod";

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
        if (!(await SellerModel.findById(sellerId))) return { success: false, message: "Seller does not exist" };

        await SellerModel.findByIdAndDelete(sellerId);
        return { success: true, message: "Seller deleted successfully" };
    } catch {
        return { success: false, error: "Internal server error" };
    }
};