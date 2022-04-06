
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';
// import getUserSession from '../../../utils/getUserSession';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getUserSession({ req });
//   const attempt_id = req.query.id[0];

//   const userAssigment = await prisma.assignment.findFirst({
//     where: { user_id: session.user?.id },
//   });

//   const curriculum = await prisma.curriculum.findUnique({
//     where: { assignment_id: userAssigment?.id },
//   });

//   const attempt = await prisma.attempt.findUnique({
//     where: { id: attempt_id },
//     select: {
//       id: true,
//       task_id: true,
//       score: true,
//       answer: true,
//       task: true,
//       comment: true,
//       attempt_number: true,
//       submission_date: true,
//       evaluation_date: true,
//       status: true,
//       teacher: { select: { user: true } },
//     },
//   });

//   const moduleId = attempt?.task.module_version_id;
//   const curriculumProgress = (curriculum?.module_progress as Array<any>) || [];

//   const moduleNumber = curriculumProgress.find(
//     module => module.module_id === moduleId
//   ).position;

//   const response = { ...attempt, module_numer: moduleNumber };

//   if (session.nextAuthSession) {
//     res.status(200).send(response);
//   } else {
//     res.status(401).send({ message: 'Unauthorized' });
//   }
// };
