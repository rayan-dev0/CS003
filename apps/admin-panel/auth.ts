import NextAuth from "next-auth";
import { authOptions } from "./backend/utils/auth.options";
 
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);