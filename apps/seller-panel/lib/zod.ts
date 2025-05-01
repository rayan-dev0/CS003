import { z } from "zod";

export const loginFormValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password is required")
});

export const newProductFormValidation = z.object({
    name: z.string().min(3, "Product name is required"),
    description: z.string().optional(),
    price: z.string().min(1, "Price is required"),
    stock_quantity: z.number().min(1, "Stock quantity is required"),
    admin_category: z.string(),
    category: z.string().min(1, "Category is required"),
    images: z.array(z.string()).optional(),
    status: z.enum(["In Stock", "Out of Stock"])
});