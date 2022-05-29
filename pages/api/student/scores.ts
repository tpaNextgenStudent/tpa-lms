import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import getUserSession from '../../../utils/getUserSession';
import getUserAssignment from '../../../utils/getUserAssignment';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const userAssigment = await getUserAssignment(
    session?.user?.accounts[0].providerAccountId
  );

  const curriculum = await prisma.curriculum.findUnique({
    where: { assignment_id: userAssigment?.id },
  });

  const moduleProgress = curriculum?.module_progress as Array<any>;
  const scores: Array<any> = [];
  moduleProgress.forEach(module => {
    module.tasks.forEach((task: any) => {
      if (task.status === 'approved' || !!task.score) {
        const { id, ...rest } = task;
        scores.push({
          ...rest,
          task_id: id,
          module_version_id: module.module_id,
          module_number: module.position,
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

      const task = module?.tasks.find(task => task.id === score.task_id);
      const attempt = await prisma.attempt.findUnique({
        where: {
          id: score.attempt_id,
        },
        select: {
          id: true,
          score: true,
          answer: true,
          comment: true,
          attempt_number: true,
          submission_date: true,
          evaluation_date: true,
          teacher: { select: { profile: true } },
        },
      });

      const teacherAccount = await prisma.account.findFirst({
        where: {
          providerAccountId: attempt?.teacher?.profile?.provider_account_id,
        },
        include: { user: true },
      });
      const singleAttempt = {
        ...attempt,
        teacher: {
          user: teacherAccount?.user,
          profile: attempt?.teacher?.profile,
        },
      };

      return {
        attempt: singleAttempt,
        task_name: task?.name,
        task_type: task?.type,
        module_name: module?.module.name,
        module_number: score.module_number,
      };
    })
  );
  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
