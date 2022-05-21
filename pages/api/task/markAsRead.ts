// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';
// import { Attempt } from '@prisma/client';
// import getUserSession from '../../../utils/getUserSession';
// import getUserAssignment from '../../../utils/getUserAssignment';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getUserSession({ req });
//   const taskId = req.query.id[0];

//   const userAssigment = await getUserAssignment(
//     session?.user?.accounts[0].providerAccountId
//   );

//   if (!session.nextAuthSession) {
//     return res.status(401).send({ message: 'Unauthorized' });
//   }
//   if (req.method != 'POST') {
//     return res.status(405).send({ message: 'Only POST request allowed' });
//   }

//   //Change in curriculum module_progress

//   //TO DO - change to robot not harcoded teacher id
//   //Register attempt
//   const response = await prisma.attempt.create({
//     data: {
//       assignment_id: userAssigment?.id,
//       task_id: taskId,
//       score: null,
//       answer: '',
//       comment: null,
//       attempt_number: 1,
//       teacher_assigment_id: 'cl2idovve0492o0s6xca7z2vs',
//       submission_date: new Date(),
//       evaluation_date: new Date(),
//       status: 'approved',
//       module_number: 1,
//       task_number: 1,
//     },
//   });

//   res.status(200).send({});
// };
