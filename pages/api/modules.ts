import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import getUserSession from '../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const userAssigment = await prisma.assignment.findFirst({
    where: { userId: session.user?.id },
  });

  const curriculum = await prisma.curriculum.findUnique({
    where: { assignmentId: userAssigment?.id },
  });

  const modules = curriculum?.moduleProgress as Array<any>;

  const response = await Promise.all(
    modules.map(async (module: any): Promise<any> => {
      const moduleDetails = await prisma.moduleVersion.findUnique({
        where: { id: module.moduleId },
        include: { module: true },
      });

      return {
        name: moduleDetails?.module.name,
        module_version_id: moduleDetails?.id,
      };
    })
  );

  if (session.nextAuthSession) {
    res.status(200).send(response);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
