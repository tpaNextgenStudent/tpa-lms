import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import getUserSession from '../../../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const assignmentId = req.query.assignment_id[0];

  const cohortStudent = await prisma.assignment.findUnique({
    where: {
      id: assignmentId,
    },
    include: { profile: true, curriculum: true },
  });

  const moduleProgress =
    (cohortStudent?.curriculum?.module_progress as Array<any>) || [];

  const { ...user } = await prisma.account.findUnique({
    where: {
      providerAccountId: cohortStudent?.profile?.provider_account_id,
    },
    include: { user: true },
  });

  if (session.nextAuthSession) {
    res.status(200).send({
      student: {
        user: user?.user,
        profile: cohortStudent?.profile,
        tasks_in_modules: moduleProgress,
      },
    });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
