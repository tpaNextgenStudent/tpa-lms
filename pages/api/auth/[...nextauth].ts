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
        console.log(23, props.user.id);
        const userExsist = await prisma.profile.findUnique({
          where: { login: props.profile.login },
        });

        if (userExsist && userExsist.userId) {
          return true;
        } else if (userExsist) {
          await prisma.profile.update({
            where: {
              login: props.profile.login,
            },
            data: {
              userId: '23',
            },
          });
          return true;
        } else {
          return false;
        }
      },
    },
  });
};
