import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const middleware = async (req: NextApiRequest, ev: NextApiResponse) => {
  //Require session in all endpoints except login

  if (!req.url?.includes('api/auth')) {
    const session = await getSession({ req });
    console.log(session);
    // if (!session) {
    //   const obj = { message: 'unauthorized' };
    //   const blob = new Blob([JSON.stringify(obj, null, 2)], {
    //     type: 'application/json',
    //   });
    //   return new Response(blob, {
    //     status: 401,
    //   });
    // }
    return null;
  } else {
    return null;
  }
};
export default middleware;
