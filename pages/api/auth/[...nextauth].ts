import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const inviteUrlId = req.query.path;
  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    callbacks: {
      async signIn(props: any) {
        console.log(2, inviteUrlId);

        const cohort = await prisma.cohort.create({
          data: {
            name: "checkCohort",
          },
        });

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
};
