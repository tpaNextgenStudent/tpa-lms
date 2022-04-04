import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import getUserSession from '../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const cohortUsers = await prisma.assignment.findMany({
    where: {
      cohortId: session?.user?.assignments[0].cohortId,
      role: 'student',
    },
    include: { user: true, curriculum: true },
  });

  const response = await Promise.all(
    cohortUsers.map(async (user): Promise<any> => {
      const moduleProgress = user?.curriculum?.moduleProgress || {};
      const lastModulePosition =
        (user?.curriculum?.lastModulePosition || 1) - 1;
      const lastTaskPosition = (user?.curriculum?.lastTaskPosition || 1) - 1;

      const lastModule =
        moduleProgress[lastModulePosition as keyof typeof moduleProgress];
      const lastTask =
        lastModule['tasks'][
          lastTaskPosition as keyof typeof lastModule['tasks']
        ];

      const module = await prisma.moduleVersion.findUnique({
        where: { id: lastModule['module_id'] },
        select: { module: { select: { name: true } } },
      });

      const task = await prisma.task.findUnique({
        where: { id: lastTask['id'] },
      });

      return {
        user: session.user,
        module_name: module?.module.name,
        module_position: lastModule['position'],
        task_name: task?.name,
        task_position: lastTask['position'],
      };
    })
  );

  //TO DO SORT
  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
