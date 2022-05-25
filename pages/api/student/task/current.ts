import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import getUserSession from '../../../../utils/getUserSession';
import getUserAssignment from '../../../../utils/getUserAssignment';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const userAssigment = await getUserAssignment(
    session?.user?.accounts[0].providerAccountId
  );
  const curriculum = await prisma.curriculum.findUnique({
    where: { assignment_id: userAssigment?.id },
  });

  const module_progress = curriculum?.module_progress as Array<any>;

  let lastInProgressTaskModuleId = '';
  let lastInProgressTaskTaskId = '';

  module_progress.map((module: any) =>
    module.tasks.map((task: any) => {
      if (task.status === 'in progress') {
        lastInProgressTaskModuleId = module.module_id;
        lastInProgressTaskTaskId = task.id;
      }
    })
  );

  if (session.nextAuthSession) {
    res.status(200).send({
      module_id: lastInProgressTaskModuleId,
      task_id: lastInProgressTaskTaskId,
    });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
