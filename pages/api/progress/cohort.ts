import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import getUserSession from '../../../utils/getUserSession';
import getUserAssignment from '../../../utils/getUserAssignment';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const userAssigment = await getUserAssignment(
    session?.user?.accounts[0].providerAccountId
  );

  const cohortStudents = await prisma.assignment.findMany({
    where: {
      cohort_id: userAssigment?.cohort_id,
      role: 'student',
    },
    include: { profile: true },
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
    cohortStudents.map(async (student): Promise<any> => {
      const curriculum = await prisma.curriculum.findUnique({
        where: {
          assignment_id: student.id,
        },
      });
      if (curriculum) {
        const { ...user } = await prisma.account.findUnique({
          where: {
            providerAccountId: student.profile?.provider_account_id,
          },
          include: { user: true },
        });
        const moduleProgress = curriculum?.module_progress || {};
        const lastModulePosition = (curriculum?.last_module_position || 1) - 1;
        const lastTaskPosition = (curriculum?.last_task_position || 1) - 1;

        const lastModule = moduleProgress[
          lastModulePosition as keyof typeof moduleProgress
        ] || { tasks: [], module_id: '' };

        const lastTask = lastModule['tasks'][
          lastTaskPosition as keyof typeof lastModule['tasks']
        ] || { id: '' };

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
      }
    })
  );

  //TO DO SORT
  if (session.nextAuthSession) {
    res.status(200).send(response.filter(n => n));
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
