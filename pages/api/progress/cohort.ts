import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getUserSession } from '../../../lib/auth/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const cohortUsers = await prisma.assignment.findMany({
    where: {
      cohort_id: session?.user?.assignments[0].cohort_id,
      role: 'student',
    },
    include: { user: true, curriculum: true },
    orderBy: [
      {
        curriculum: {
          last_module_position: 'desc',
        },
      },
      {
        curriculum: {
          last_task_position: 'desc',
        },
      },
    ],
  });

  const response = await Promise.all(
    cohortUsers.map(async (user): Promise<any> => {
      console.log(999, user);
      const moduleProgress = user?.curriculum?.module_progress || {};
      const lastModulePosition =
        (user?.curriculum?.last_module_position || 1) - 1;
      const lastTaskPosition = (user?.curriculum?.last_task_position || 1) - 1;

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
        user: user.user,
        module_name: module?.module.name,
        module_position: lastModule['position'],
        task_name: task?.name,
        task_position: lastTask['position'],
        task_type: task?.type,
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
