// cl185m87c0019ngs6p05qi4h9
//cl185mme90042ngs6v36ji2hi
import getUserSession from '../../../../utils/getUserSession';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const tasksInModuleSchema = {
  id: true,
  position: true,
  name: true,
  description: true,
  link: true,
  type: true,
};

interface taskProps {
  link: string;
  id: string;
  position: number;
  name: string;
  description: string;
  type: string;
  status?: string;
}

interface attemptProps {
  attempt_number: number;
  answer: string;
  comment: string;
  score: number;
  assessment_date: Date | null;
  status?: string;
  teacher: {
    legalName: string | null;
    surname: string | null;
    image: string | null;
  };
}
interface taskWithAttemptsProps extends taskProps {
  attempts: Array<attemptProps>;
}

const attemptSchema = {
  answer: true,
  attempt_number: true,
  comment: true,
  score: true,
  assessment_date: true,
  status: true,
  teacher: {
    select: {
      legalName: true,
      surname: true,
      image: true,
    },
  },
};

const findAttempts = async (tasksInModule: taskProps) => {
  return await prisma.attempt.findMany({
    where: { taskId: tasksInModule.id },
    orderBy: { attempt_number: 'asc' },
    select: attemptSchema,
  });
};

const setTaskStatus = ({
  attempts,
  task,
  moduleId,
  cohortId,
}: {
  attempts: Array<attemptProps>;
  task: taskProps;
  moduleId: string;
  cohortId?: string;
}) => {
  //handle sytuation if there is no previous task only prvious module

  // if (task.position === 0) {
  //   const module = await prisma.curriculumModule.findMany({
  //     where: { cohortId: cohortId, id: moduleId },
  //   });
  //   if (module[0].position != 0) {
  //     const prevModule = await prisma.curriculumModule.findMany({
  //       where: { cohortId: cohortId, position: module[0].position - 1 },
  //     });
  //     const prevModuleTasks = await prisma.curriculumTask.findMany({
  //       orderBy: { position: 'asc' },
  //       where: { cohortId: cohortId, moduleId: prevModule[0].id },
  //       select: tasksInModuleSchema,
  //     });

  //     prevModuleTasks.forEach(task => {
  //       const attempts = findAttempts(task);
  //     });

  //     console.log(2, prevModule);
  //   }
  // }

  let status;

  const previousTaskDone = true;
  if (attempts.length === 0 && previousTaskDone) {
    status = 'in progress';
  } else if (attempts.length === 0) {
    status = 'upcoming';
  } else {
    status = attempts[attempts.length - 1]?.status;
  }

  return status;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });
  const moduleId = req.query.id[0];

  const tasksInModule = await prisma.curriculumTask.findMany({
    orderBy: { position: 'asc' },
    where: { cohortId: session.user?.cohort?.id, moduleId: moduleId },
    select: tasksInModuleSchema,
  });

  const response = await Promise.all(
    tasksInModule.map(async (task): Promise<taskWithAttemptsProps> => {
      const attempts = await findAttempts(task);
      const status = setTaskStatus({
        attempts,
        task,
        moduleId,
        cohortId: session.user?.cohort?.id,
      });
      attempts.forEach((attempt: attemptProps) => delete attempt.status);

      return { ...task, status, attempts };
    })
  );

  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
