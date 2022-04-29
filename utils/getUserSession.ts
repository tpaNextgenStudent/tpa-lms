import prisma from '../lib/prisma';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

const getUserSession = async ({ req }: { req: NextApiRequest }) => {
  const nextAuthSession = await getSession({ req });
  const userId = nextAuthSession?.userId as string;

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { accounts: true },
  });

  return { nextAuthSession, user };
};

export default getUserSession;
