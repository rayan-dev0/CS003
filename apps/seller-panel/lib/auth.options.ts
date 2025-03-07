import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7, 
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email ID", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
            
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/seller/get-seller/${credentials.email}`, {
                        headers: {
                            adminKey: `Bearer-${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`,
                        },
                    });
            
                    const sellerData = response.data.seller; 

                    if (!sellerData || !sellerData._id || !sellerData.password) {
                        console.error("Invalid response format:", sellerData);
                        return null;
                    }
            
                    if (credentials.password !== sellerData.password) {
                        console.error("Invalid password");
                        return null;
                    }
            
                    return {
                        id: sellerData._id.toString(),
                        email: sellerData.email,
                        name: sellerData.username, 
                    };
                } catch (error) {
                    console.error("Error fetching user:", error);
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
                session.user = token.user;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
};