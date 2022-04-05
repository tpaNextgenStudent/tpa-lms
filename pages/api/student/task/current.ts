import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import getUserSession from '../../../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const userAssigment = await prisma.assignment.findFirst({
    where: { user_id: session.user?.id },
  });

  const curriculum = await prisma.curriculum.findUnique({
    where: { assignment_id: userAssigment?.id },
  });

  const module_progress = curriculum?.module_progress || [];

  const lastModulePositionIndex = (curriculum?.last_module_position || 1) - 1;

  const lastTaskPositionIndex = (curriculum?.last_task_position || 1) - 1;

  const lastDoneTaskModule =
    module_progress[lastModulePositionIndex as keyof typeof module_progress];

  let response = {};
  if (lastDoneTaskModule['tasks'][lastTaskPositionIndex + 1]) {
    response = {
      module_id:
        module_progress[
          lastModulePositionIndex as keyof typeof module_progress
        ]['module_id'],
      task_id:
        module_progress[
          lastModulePositionIndex as keyof typeof module_progress
        ]['tasks'][lastTaskPositionIndex + 1]['id'],
    };
  } else {
    response = {
      module_id:
        module_progress[
          (lastModulePositionIndex + 1) as keyof typeof module_progress
        ]['module_id'],
      task_id:
        module_progress[
          (lastModulePositionIndex + 1) as keyof typeof module_progress
        ]['tasks'][0]['id'],
    };
  }

  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
