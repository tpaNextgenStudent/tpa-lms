import type { NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async (
  { query: { id } }: { query: { id: number } },
  res: NextApiResponse
) => {
  const userCohort = await db.cohort.findFirst();

  const cohortModules = await db.module.findMany({
    where: {
      id: {
        in: ['3', '1'],
      },
    },
  });

  console.log(cohortModules);

  const mo = await db.module.findMany({ include: { tasks: true } });

  res.status(200).json({ name: id });
};
