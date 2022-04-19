import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import getUserSession from '../../../../../utils/getUserSession';
import { Attempt } from '@prisma/client';
import getUserAssignment from '../../../../../utils/getUserAssignment';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
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
      teacher_assigment_id: assignment.id,
      task: { type: 'code', summative: true },
    },
    orderBy: {
      submission_date: 'asc',
    },
  });

  const mappedResponse = response.map((attempt: Attempt) => {
    if (!attempt.score && !attempt.comment) {
      return attempt;
    }
  });

  const attempt_id = req.query.id[0];

  const currentAttemptIndex = mappedResponse.findIndex(
    (attempt: any) => attempt.id == attempt_id
  );

  if (currentAttemptIndex === -1) {
    return res.status(404).send({
      message:
        'Attempt is not avaiable in list of attempts to assess for this teacher',
    });
  }

  const nextAttempt = mappedResponse[currentAttemptIndex + 1];

  res.status(200).send({
    next_attempt_id: nextAttempt ? nextAttempt?.id : null,
    assessments_number: mappedResponse.length,
  });
};
