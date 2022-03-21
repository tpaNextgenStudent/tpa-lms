import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: 'cl10d065x0006als6rvfmnb1q' },
  });

  console.log(1, user);
  console.log('123', req.query.id[0]);

  res.status(200).send({ message: 'Success' });
  return;
}
