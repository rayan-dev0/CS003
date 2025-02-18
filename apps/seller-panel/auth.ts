import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authOptions } from "./backend/utils/auth.options";

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
