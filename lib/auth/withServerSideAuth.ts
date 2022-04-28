import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getUserDetails, UserRole } from '../../api/user';
import axios from 'axios';

export const withServerSideAuth =
  (role?: UserRole) =>
  <P>(
    handler: (
      ctx: GetServerSidePropsContext
    ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    try {
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

      return await handler(ctx);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          return {
            redirect: {
              permanent: false,
              destination: '/login',
            },
          };
        }
      }

      return {
        notFound: true as const,
      };
    }
  };
