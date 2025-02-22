import { z } from "zod";

export const sellerValidation = z.object({
    username: z.string().min(2, "Username must contain at least 2 letters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    businessName: z.string().min(5, "Business name must contain at least 5 letters"),
    businessType: z.enum(["Retail", "Wholesale", "Manufacturer", "Service", "Product", "Consultancy"]),
    businessAddress: z.string().min(5, "Address must contain at least 5 letters"),
    phoneNumber: z.string().length(10, "Phone number must contain 10 digits").optional(),
});

export const agentValidation = z.object({
    username: z.string().min(2, "Username must contain minimum 2 letters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be 6 characters long"),
    phoneNumber: z.string().length(10, "Phone number contain 10 digits"),
    sellers: z.array(z.string())
});