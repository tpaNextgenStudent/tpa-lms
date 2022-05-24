import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import getUserSession from '../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const attempt_id = req.query.id[0];

  const attempt = await prisma.attempt.findUnique({
    where: { id: attempt_id },
    select: {
      id: true,
      task_id: true,
      score: true,
      answer: true,
      task: true,
      comment: true,
      attempt_number: true,
      submission_date: true,
      evaluation_date: true,
      status: true,
      student: { select: { profile: true } },
      teacher: { select: { profile: true } },
      module_number: true,
      task_number: true,
    },
  });

  if (!attempt) {
    return res.status(404).send({ message: 'Attempt not found' });
  }

  const { ...teacher } = await prisma.account.findUnique({
    where: {
      providerAccountId: attempt.teacher.profile?.provider_account_id,
    },
    include: { user: true },
  });
  const { ...student } = await prisma.account.findUnique({
    where: {
      providerAccountId: attempt.student.profile?.provider_account_id,
    },
    include: { user: true },
  });

  if (session.nextAuthSession) {
    res.status(200).send({
      ...attempt,
      teacher: { user: teacher.user, profile: attempt.teacher.profile },
      student: { user: student.user, profile: attempt.student.profile },
    });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
