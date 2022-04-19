import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import getUserSession from '../../../../utils/getUserSession';
import getUserAssignment from '../../../../utils/getUserAssignment';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const taskId = req.query.id[0];
  const userAssigment = await getUserAssignment(
    session?.user?.accounts[0].providerAccountId
  );

  const response = await prisma.attempt.findMany({
    where: {
      task_id: taskId,
      assignment_id: userAssigment?.id,
    },
    select: {
      id: true,
      score: true,
      answer: true,
      comment: true,
      attempt_number: true,
      submission_date: true,
      evaluation_date: true,
      teacher: { select: { profile: true } },
      task: true,
    },
    orderBy: {
      attempt_number: 'asc',
    },
  });

  const responseWithTeacherData = await Promise.all(
    response.map(async (attempt): Promise<any> => {
      const { ...user } = await prisma.account.findUnique({
        where: {
          providerAccountId: attempt.teacher.profile?.provider_account_id,
        },
        include: { user: true },
      });
      return { ...attempt, teacher: { user: user.user } };
    })
  );

  const mappedResponse = responseWithTeacherData.map(
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
