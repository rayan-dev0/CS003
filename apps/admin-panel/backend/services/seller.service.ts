import { z } from "zod";
import SellerModel from "../models/seller.model";

const sellerValidation = z.object({
    username: z.string().min(2, "Username must contain at least 2 letters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    businessName: z.string().min(5, "Business name must contain at least 5 letters"),
    businessType: z.enum(["Retail", "Wholesale", "Manufacturer", "Service", "Product", "Consultancy"]),
    businessAddress: z.string().min(5, "Address must contain at least 5 letters"),
    phoneNumber: z.string().length(10, "Phone number must contain 10 digits").optional(),
});

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
        const sellers = await SellerModel.find().select("-password");
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