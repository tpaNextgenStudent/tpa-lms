import { getSession } from 'next-auth/react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { userDetailsSchema } from '../../../schemas/userDetails';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

const postRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  const response = req.body;

  const updateUser = await prisma.user.update({
    where: { id: userId },
    data: {
      legalName: response.name,
      surname: response.surname,
      bio: response.bio,
    },
  });

  res.status(200).send({
    name: updateUser.legalName,
    surname: updateUser.surname,
    bio: updateUser.bio,
  });
};

const getRequest = async (res: NextApiResponse, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const response = {
    name: user?.legalName,
    surname: user?.surname,
    bio: user?.bio,
  };

  res.status(200).send(response);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const userId = session?.userId as any;

  if (session) {
    switch (req.method) {
      case 'POST':
        postRequest(req, res, userId);
      default:
        getRequest(res, userId);
    }
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if ('POST') {
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
