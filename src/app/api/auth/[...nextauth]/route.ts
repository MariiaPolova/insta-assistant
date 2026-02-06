import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthSession } from "../../../interfaces/common";
const SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ account, profile }) {
      try {
        console.log('Sign-in callback triggered for user:', profile);
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${account?.id_token}`,
        };
        const res = await fetch(`${SERVER_BASE_URL}/api/login`, {
          method: 'POST',
          headers,
        });

        return res.ok;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
       if (token.id_token) {
      (session as AuthSession).id_token = token.id_token as string;
    }
      return session;
    },
    async jwt({ token, account }) {
      if (account && account.id_token) {
      token.id_token = account.id_token;
    }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
