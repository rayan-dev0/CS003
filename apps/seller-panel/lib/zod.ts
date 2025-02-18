import { z } from "zod";

export const loginFormValidation = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(6, "Password is required"),
});
