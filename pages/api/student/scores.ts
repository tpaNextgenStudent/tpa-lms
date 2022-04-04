import { taskType } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import getUserSession from '../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const curriculum = await prisma.curriculum.findUnique({
    where: { assignmentId: session.user?.assignments[0].id },
  });

  const moduleProgress = curriculum?.moduleProgress as Array<any>;
  const scores: Array<any> = [];
  moduleProgress.forEach(module => {
    module.tasks.forEach((task: any) => {
      if (task.score != null) {
        const { id, ...rest } = task;
        scores.push({
          ...rest,
          task_id: id,
          module_version_id: module.moduleId,
        });
      }
    });
  });

  const response = await Promise.all(
    scores.map(async (score): Promise<any> => {
      const module = await prisma.moduleVersion.findUnique({
        where: { id: score.module_version_id },
        include: { module: true, tasks: true },
      });
      const task = module?.tasks.find(task => task.id === score.id);
      return {
        ...score,
        task_name: task?.name,
        task_type: task?.type,
        module_name: module?.module.name,
      };
    })
  );
  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
