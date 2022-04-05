import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import getUserSession from '../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const attempt_id = req.query.id[0];

  const response = await prisma.attempt.findUnique({
    where: { id: attempt_id },
    include: { task: true },
  });

  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
