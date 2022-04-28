import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.assignment.findMany({
    where: { role: 'student' },
  });

  users.forEach(async (user: any) => {
    const curriculum = await prisma.attempt.create({
      data: {
        assignment_id: user.id,
        task_id: 'cl2i9cl460265dss602m9fio4',
        score: 3,
        answer: 'https://github.com/tpa-nextgen/TEMP_CHECK',
        comment: 'Great job!',
        attempt_number: 1,
        teacher_assigment_id: 'cl2idovve0492o0s6xca7z2vs',
        status: 'approved',
        module_number: 1,
        task_number: 1,
      },
    });

    console.log({ user, curriculum });
  });

  res.status(200).send('');
};
