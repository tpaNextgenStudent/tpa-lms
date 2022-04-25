import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import getUserSession from '../../../../../utils/getUserSession';
import { Attempt } from '@prisma/client';
import getUserAssignment from '../../../../../utils/getUserAssignment';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const assignmentId = req.query.assignment_id[0];

  const assignment = await getUserAssignment(
    session?.user?.accounts[0].providerAccountId
  );
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
      assignment_id: assignmentId,
      teacher_assigment_id: assignment.id,
      task: { type: 'code', summative: true },
    },
    include: { task: true, student: { include: { profile: true } } },
    orderBy: {
      submission_date: 'asc',
    },
  });

  const responseWithUserData = await Promise.all(
    response.map(async (attempt): Promise<any> => {
      const { ...user } = await prisma.account.findUnique({
        where: {
          providerAccountId: attempt.student.profile?.provider_account_id,
        },
        include: { user: true },
      });
      return { ...attempt, student: { user: user.user } };
    })
  );

  const mappedResponse = responseWithUserData.filter((attempt: Attempt) => {
    return !attempt.score && !attempt.comment;
  });

  res.status(200).send(mappedResponse);
};
