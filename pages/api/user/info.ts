import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const userId = session.userId as any;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const response = {
      name: user?.legalName,
      surname: user?.surname,
      bio: user?.bio,
    };

    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
