import { z } from "zod";

export const loginFormValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password is required")
});