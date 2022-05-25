import { NextApiRequest, NextApiResponse } from 'next';
import { now } from 'next-auth/client/_utils';
import prisma from '../../../../lib/prisma';
import getUserSession from '../../../../utils/getUserSession';

const createAttempt = (
  modulePosition: any,
  taskPosition: any,
  taskId: string,
  assignmentId: any
) => {
  return prisma.attempt.create({
    data: {
      assignment_id: assignmentId,
      task_id: taskId,
      answer: '',
      attempt_number: 1,
      teacher_assigment_id: 'cl2idovve0492o0s6xca7z2vs',
      submission_date: new Date(),
      evaluation_date: new Date(),
      status: 'approved',
      module_number: modulePosition,
      task_number: taskPosition,
    },
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const taskId = req.query.id[0];

  if (!session.nextAuthSession) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const userProfile = await prisma.profile.findFirst({
    where: { provider_account_id: session.user?.accounts[0].providerAccountId },
    select: { assignments: { select: { id: true, curriculum: true } } },
  });

  const moduleProgress = userProfile?.assignments[0].curriculum
    ?.module_progress as Array<any>;

  let attemptCreated = false;
  let alreadyMarked = false;
  let incorrectStatus = false;

  const newModuleProgress = await Promise.all(
    moduleProgress.map(async (module: any) => {
      const tasks = await Promise.all(
        module.tasks.map(async (task: any) => {
          if (task.id === taskId) {
            if (task.status === 'approved') {
              alreadyMarked = true;
            }
            if (task.status != 'in progress') {
              incorrectStatus = true;
            }
            attemptCreated = true;
            const createdAttemptData = await createAttempt(
              module.position,
              task.position,
              taskId,
              userProfile?.assignments[0].id
            );

            task.status = createdAttemptData.status;
            task.attempt_id = createdAttemptData.id;
            const nextTask = module.tasks.find(
              (el: any) => el.position === task.position + 1
            );
            nextTask.status = 'in progress';
            return task;
          } else {
            return task;
          }
        })
      );
      return { ...module, tasks };
    })
  );

  if (alreadyMarked) {
    return res.status(404).send({
      message: 'Task has been already marked as read',
    });
  }

  if (incorrectStatus) {
    return res.status(404).send({
      message: 'Task have to has in progress status to mark it as read',
    });
  }

  const updatedCurriculum = await prisma.curriculum.update({
    where: { id: userProfile?.assignments[0]?.curriculum?.id },
    data: {
      module_progress: newModuleProgress,
    },
  });

  if (!attemptCreated) {
    return res.status(404).send({
      message: "User doesn't have task with this id in their curriculum",
    });
  }

  res.status(200).send({ updatedCurriculum });
};
