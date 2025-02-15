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
                username: { label: "Username", type: "text" }, 
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) return null;

                const ADMIN_USER = process.env.ADMIN_USER;
                const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

                if (credentials.username === ADMIN_USER && credentials.password === ADMIN_PASSWORD) {
                    return { id: process.env.AUTH_SECRET as string, name: ADMIN_USER, role: "Admin" };
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
                session.user = token.user as { id: string; name: string, role?: string };
            }
            return session;
        }
    },
    pages: {
        signIn: "/",
    }
};
