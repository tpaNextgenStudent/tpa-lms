import type { NextFetchEvent, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const middleware = async (req: NextApiRequest, ev: NextApiResponse) => {
  //   const session = await getSession({ req });
  //   if (!session) {
  //     const myBlob = new Blob();

  //     return new Response(myBlob, {
  //       status: 401,
  //     });
  //     // return res.status(401).send({ message: 'Unauthorized' });
  //   }
  console.log(23);
  return null;
};
export default middleware;
