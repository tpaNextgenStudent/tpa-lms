import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import getUserSession from '../../utils/getUserSession';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession({ req });

  const userAssigment = await prisma.assignment.findFirst({
    where: { user_id: session.user?.id },
  });

  const curriculum = await prisma.curriculum.findUnique({
    where: { assignment_id: userAssigment?.id },
  });

  const modules = curriculum?.module_progress as Array<any>;

  const response = await Promise.all(
    modules.map(async (module: any, counter: number): Promise<any> => {
      const moduleDetails = await prisma.moduleVersion.findUnique({
        where: { id: module.module_id },
        include: { module: true },
      });

      return {
        module_number: counter + 1,
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
