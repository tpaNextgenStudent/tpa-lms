import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import getUserSession from '../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const assignment = await prisma.assignment.findFirst({
    where: { user_id: session.user?.id },
  });

  if (!assignment) {
    return res
      .status(401)
      .send({ message: 'Teacher is not assigned to any cohort' });
  }

  if (!session.nextAuthSession || assignment.role != 'teacher') {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const response = await prisma.attempt.findMany({
    where: {
      teacher_assigment_id: assignment.id,
      task: { type: 'code', summative: true },
    },
    include: { task: true, student: { include: { user: true } } },
    orderBy: {
      submission_date: 'asc',
    },
  });

  res.status(200).send(response);
};
