import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getUserDetails, IUserDetails, UserRole } from '../../api/user';
import axios from 'axios';

type AuthContextExtend = { user: IUserDetails };

export const withServerSideAuth =
  (role?: UserRole) =>
  <DefaultContext extends GetServerSidePropsContext, Props>(
    handler: (
      ctx: DefaultContext & AuthContextExtend
    ) =>
      | GetServerSidePropsResult<Props>
      | Promise<GetServerSidePropsResult<Props>>
  ) =>
  async (ctx: DefaultContext) => {
    const authCookie = ctx.req.headers.cookie as string;

    try {
      const user = await getUserDetails({ cookie: authCookie });
      if (role && role !== user.role) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      (ctx as DefaultContext & AuthContextExtend).user = user;
      return await handler(ctx as DefaultContext & AuthContextExtend);
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
