import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import type { NextAuthOptions} from 'next-auth'

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any) {
                return credentials;
            },
        }),
    ],
    secret: process.env.ENCRYPT_SECRET!,
    callbacks: {
        jwt: ({ token, user }: any) => {
            if (user) {
                token.phone = user.phone;
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (token) {
                session.user.phone = token.phone;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        newUser: "/",
        error: "/login",
    },
}

export default NextAuth(authOptions);
