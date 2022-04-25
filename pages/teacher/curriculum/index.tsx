import { getUserModules } from '../../../api/modules';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';

export default function TasksIndex() {
  return null;
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req }) => {
    try {
      const authCookie = req.headers.cookie as string;

      const modules = await getUserModules({ cookie: authCookie });
      const firstModule = modules[0];

      return {
        redirect: {
          permanent: false,
          destination: `/teacher/curriculum/${firstModule.module_version_id}`,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
);
