import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // if(REF_LINK_MATCH_SOME_REF_LINK_FROM_DATABASE || ACCOUNT_FOUND_IN_DATABASE) {
      //     return true
      // } else {
      //    return false
      //    and redirect to erro page
      // }
      return true;
    },
  },
});
