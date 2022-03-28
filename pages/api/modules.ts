import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import getUserSession from '../../utils/getUserSession';

const responseSchema = {
  id: true,
  name: true,
  position: true,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const response = await prisma.curriculumModule.findMany({
    orderBy: { position: 'asc' },
    where: { cohortId: session.user?.cohort?.id },
    select: responseSchema,
  });

  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
