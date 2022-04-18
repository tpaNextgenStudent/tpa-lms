import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { assessSchema } from '../../../../../schemas/assessSchema';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
import { getUserSession } from '../../../../../lib/auth/getUserSession';
import { Attempt } from '@prisma/client';

const updateCurriculum = async (updatedAttempt: Attempt) => {
  const curriculum = await prisma.curriculum.findUnique({
    where: { assignment_id: updatedAttempt.assignment_id },
  });

  const curriculumProgress = (curriculum?.module_progress as Array<any>) || [];

  const updatedCurriculumProgress = curriculumProgress.map((module, i) => {
    if (i + 1 === updatedAttempt.module_number) {
      const task = module.tasks.find(
        (task: any) => task.attempt_id === updatedAttempt.id
      );
      if (updatedAttempt?.score) {
        task.score = updatedAttempt?.score;
        task.status = updatedAttempt?.score > 1 ? 'approved' : 'in progress';
      }
    }
    return module;
  });

  const updatedCurriculum = await prisma.curriculum.update({
    where: { assignment_id: updatedAttempt.assignment_id },
    data: { module_progress: updatedCurriculumProgress },
  });

  return updatedCurriculum;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const attempt_id = req.query.id[0];
  const session = await getUserSession({ req });

  if (!session.nextAuthSession) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  if (req.method != 'POST') {
    return res.status(405).send({ message: 'Only POST request allowed' });
  }
  const attempt = await prisma.attempt.findUnique({
    where: { id: attempt_id },
  });
  if (attempt?.score) {
    return res.status(404).send({ message: 'Attempt was already assessed' });
  }

  const { score, comment } = req.body;
  const updatedAttempt = await prisma.attempt.update({
    where: { id: attempt_id },
    data: {
      score: parseInt(score),
      comment,
      evaluation_date: new Date(),
      status: score > 1 ? 'approved' : 'in progress',
    },
  });

  updateCurriculum(updatedAttempt);

  res.status(200).send(updatedAttempt);
};

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.body = await schema.validate(req.body, { abortEarly: false });
    } catch (error: any) {
      return res.status(422).json(error?.errors);
    }
    await handler(req, res);
  };
}

export default validate(assessSchema, handler);
