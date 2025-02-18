import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SellerModel } from "../models/seller.model";
import ConnectDB from "./db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        ConnectDB();
        if (!credentials?.username || !credentials.password) return null;
        const existingUser = await SellerModel.findOne({
          username: credentials.username,
        });
        
        if (!existingUser) {
          return {
            sucess: false,
            message: "User Does Not exist",
          };
        }
        if (
          credentials.username === existingUser.username &&
          credentials.password === existingUser.password
        ) {
          return existingUser;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as {
          id: string;
          name: string;
          role?: string;
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
