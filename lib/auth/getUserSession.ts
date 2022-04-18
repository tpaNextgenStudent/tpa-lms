import prisma from '../prisma';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

export const getUserSession = async ({ req }: { req: NextApiRequest }) => {
  const nextAuthSession = await getSession({ req });
  const userId = nextAuthSession?.userId as string;

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { assignments: true },
  });

  return { nextAuthSession, user };
};
