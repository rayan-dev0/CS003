import { connectDatabase } from './../../../../packages/server/src/db';
import { z } from "zod";
import SellerModel from "../schemas/seller.schema";

const sellerValidation = z.object({
    username: z.string().min(2, "Username must contain minimum 2 letters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be 6 characters long"),
    businessName: z.string().min(5, "Business name must contain minimum 5 letters"),
    businessType: z.enum(["Retail", "Wholesale", "Manufacturer", "Service", "Product", "Consultancy"]),
    businessAddress: z.string().min(5, "Address must contain minimum 5 letters"), 
    phoneNumber: z.string().length(10, "Phone number contain 10 digits").optional()
});

export const addNewSeller = async (sellerData: z.infer<typeof sellerValidation>) => {
    try {
        connectDatabase();
        const { email } = sellerData;
        const existingSeller = await SellerModel.findOne({ email });
        if(existingSeller) return { success: false, message: "Seller already exists" };

        await SellerModel.create(sellerData);
        return {
            success: true,
            message: "Added seller successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const removeSeller = async (sellerId: string | null) => {
    try {
        connectDatabase();
        const existingSeller = await SellerModel.findOne({ sellerId });
        if(!existingSeller) return { success: false, message: "Seller does not exists" };

        await SellerModel.findByIdAndDelete(sellerId);
        return {
            success: true,
            message: "Seller deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}