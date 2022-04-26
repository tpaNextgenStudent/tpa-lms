import prisma from '../lib/prisma';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

interface UserSession {
  user?: User;
}

const getUserSession = async ({
  req,
}: {
  req: NextApiRequest;
}): Promise<UserSession | undefined> => {
  if (process.env.NODE_ENV === 'test') {
    const userId = req.headers['X-Test-Session-User-Id'];
    if (!userId) {
      return undefined;
    }

    return getUserSessionByUserId(userId);
  }

  const session = await getSession({ req });
  if (!session) {
    return undefined;
  }

  const userId = session?.userId as string | undefined;
  if (!userId) {
    return {};
  }

  return getUserSessionByUserId(userId);
};

export async function getUserSessionByUserId(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { accounts: true },
  });
  return {
    user,
  };
}

export default getUserSession;
