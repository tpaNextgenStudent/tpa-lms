import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
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
        const userExsist = await prisma.profile.findUnique({
          where: { login: props.profile.login },
        });

        if (userExsist && userExsist.providerAccountId) {
          return true;
        } else if (userExsist) {
          await prisma.profile.update({
            where: {
              login: props.profile.login,
            },
            data: {
              providerAccountId: props.account.providerAccountId,
            },
          });
          return true;
        } else {
          return false;
        }
      },
    },
    pages: {
      signIn: '/login',
      error: '/auth/error',
    },
  });
};
