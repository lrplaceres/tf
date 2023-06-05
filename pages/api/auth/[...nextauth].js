import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcryptjs";

export const authOptions = {
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.uid = user.uid;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.role = token.role;
      session.username = token.username;
      session.uid = token.uid;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    async encode() {},
    async decode() {},
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        credentials.password = bcrypt.hashSync(
          credentials.password,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        );
        const { data: user } = await axios.post(
          "http://localhost:3000/api/users/login",
          credentials
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
