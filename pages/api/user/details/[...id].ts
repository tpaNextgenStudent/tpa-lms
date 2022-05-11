import { getSession } from 'next-auth/react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { userDetailsSchema } from '../../../../schemas/userDetailsSchema';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

const postRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  const { name, surname, bio } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      surname,
      bio,
    },
  });

  res.status(200).send({
    name: updatedUser.name,
    surname: updatedUser.surname,
    bio: updatedUser.bio,
  });
};

const getRequest = async (res: NextApiResponse, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { accounts: true },
  });

  const profile = await prisma.profile.findFirst({
    where: { provider_account_id: user?.accounts[0].providerAccountId },
    select: {
      login: true,
      assignments: { select: { role: true, cohort: true } },
    },
  });

  const response = {
    role: profile?.assignments[0]?.role,
    name: user?.name,
    surname: user?.surname,
    bio: user?.bio,
    image: user?.image,
    email: user?.email,
    github_login: profile?.login,
    cohort_name: profile?.assignments[0]?.cohort?.name,
  };

  res.status(200).send(response);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const userId = req.query.id[0];
  const sessionUserId = session?.userId as string;

  if (req.method === 'POST') {
    if (userId !== sessionUserId) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    return postRequest(req, res, sessionUserId);
  }

  return getRequest(res, userId);
};

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      try {
        req.body = await schema.validate(req.body, { abortEarly: false });
      } catch (error: any) {
        return res.status(422).json(error?.errors);
      }
    }
    await handler(req, res);
  };
}

export default validate(userDetailsSchema, handler);
