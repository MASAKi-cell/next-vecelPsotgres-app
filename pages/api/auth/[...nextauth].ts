import { NextApiHandler } from "next";
import NextAuth, { SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "lib/prisma";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

/**
 * Configure NextAuth
 */
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: "database" as SessionStrategy,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  pages: {
    signIn: "auth/login",
  },
};

export default authHandler;
