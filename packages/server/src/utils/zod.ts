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

export const categoryValidation = z.object({
    name: z.string(),
    seller: z.string(),
    sub_categories: z.array(z.string())
});

export const subCategoryValidation = z.object({
    name: z.string(),
    seller: z.string(),
    category: z.string()
});

export const productValidation = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    seller: z.string(),
    stock_quantity: z.number().default(0),
    sku: z.string(), 
    barcode: z.string(), 
    category: z.string(),
    sub_category: z.string(),
    purchase_cost: z.number(),
    images: z.array(z.string()),
    status: z.enum(['Out of Stock', 'In Stock', 'Low Stock']).default('In Stock'),
})