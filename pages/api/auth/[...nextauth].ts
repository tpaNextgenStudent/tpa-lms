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
    secret: '8e0e274d740b555a5753d4709235a010',
    pages: {
      signIn: '/login',
      error: '/auth/error',
    },
    callbacks: {
      async signIn(props: any) {
        const userExsist = await prisma.profile.findUnique({
          where: { login: props.profile.login },
        });

        if (userExsist && userExsist.provider_account_id) {
          return true;
        } else if (userExsist) {
          await prisma.profile.update({
            where: {
              login: props.profile.login,
            },
            data: {
              provider_account_id: props.account.providerAccountId,
            },
          });
          return true;
        } else {
          return false;
        }
      },
      async session({ session, user }) {
        session.userId = user.id;
        return session;
      },
    },
  });
};
