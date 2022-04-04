// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';
// import getUserSession from '../../../../utils/getUserSession';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getUserSession({ req });
//   const userAssigment = await prisma.assignment.findFirst({
//     where: { user_id: session.user?.id },
//   });

//   const curriculum = await prisma.curriculum.findUnique({
//     where: { assignment_id: userAssigment?.id },
//   });

//   const module_progress = curriculum?.module_progress || [];
//   const last_module_position = curriculum?.last_module_position;
//   const last_task_position = curriculum?.last_task_position;

//   const module =
//     module_progress[last_module_position as keyof typeof module_progress];

//   if (session.nextAuthSession) {
//     res.status(200).send({});
//   } else {
//     res.status(401).send({ message: 'Unauthorized' });
//   }
// };
