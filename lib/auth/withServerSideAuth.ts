import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';
import { getUserDetails, UserRole } from '../../apii/user';

export const withServerSideAuth =
  (role?: UserRole) =>
  <P>(
    handler: (
      ctx: GetServerSidePropsContext
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (role) {
      const authCookie = ctx.req.headers.cookie as string;
      const user = await getUserDetails({ cookie: authCookie });

      if (role !== user.role) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }

    return handler(ctx);
  };
