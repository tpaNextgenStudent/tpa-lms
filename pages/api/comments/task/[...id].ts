import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import getUserSession from '../../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const taskId = req.query.id[0];

  const response = await prisma.attempt.findMany({
    where: {
      taskId: taskId,
      assignmentId: session.user?.assignments[0].id,
    },
    orderBy: {
      attemptNumber: 'asc',
    },
    include: {
      teacher: true,
      student: true,
    },
  });

  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
