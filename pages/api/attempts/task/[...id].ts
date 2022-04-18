import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getUserSession } from '../../../../lib/auth/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const taskId = req.query.id[0];

  const response = await prisma.attempt.findMany({
    where: {
      task_id: taskId,
      assignment_id: session.user?.assignments[0].id,
    },
    select: {
      id: true,
      score: true,
      answer: true,
      comment: true,
      attempt_number: true,
      submission_date: true,
      evaluation_date: true,
      teacher: { select: { user: true } },
      task: true,
    },
    orderBy: {
      attempt_number: 'asc',
    },
  });

  const mappedResponse = response.map(
    ({ id: attempt_id, task: task_data, ...rest }) => ({
      attempt_id,
      task_data,
      ...rest,
    })
  );

  if (session.nextAuthSession) {
    res.status(200).send({ attempts: mappedResponse });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
