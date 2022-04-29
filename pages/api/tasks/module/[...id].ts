import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import getUserSession from '../../../../utils/getUserSession';
import getUserAssigments from '../../../../utils/getUserAssignment';

const getUserResults = async (moduleId: string, session: any) => {
  const userAssigment = await getUserAssigments(
    session.user.accounts[0].providerAccountId
  );

  const curriculum = await prisma.curriculum.findUnique({
    where: { assignment_id: userAssigment?.id },
  });

  const modules = curriculum?.module_progress as Array<any>;

  module = modules.find(module => module.module_id === moduleId) || {};

  return module['tasks' as keyof typeof module];
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const moduleId = req.query.id[0];

  const userResults = await getUserResults(moduleId, session);

  const moduleTasks = await prisma.moduleVersion.findUnique({
    where: { id: moduleId },
    select: {
      tasks: {
        select: {
          id: true,
          type: true,
          position: true,
          name: true,
          description: true,
          link: true,
        },
        orderBy: { position: 'asc' },
      },
    },
  });

  const moduleTasksWithProgress = moduleTasks?.tasks.map(task => {
    const result = userResults.find((taskResult: any) => {
      return taskResult.id === task.id;
    });

    delete result['id'];

    return {
      task_data: task,
      last_attempt: Object.keys(result).length === 0 ? null : result,
    };
  });

  if (session.nextAuthSession) {
    res.status(200).send(moduleTasksWithProgress);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
