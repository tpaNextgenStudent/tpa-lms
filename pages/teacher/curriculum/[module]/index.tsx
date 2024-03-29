import { getCurrentTask, getUserTasksByModule } from '../../../../apii/tasks';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';

export default function Module() {
  return null;
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, params }) => {
    const moduleId = params!.module as string;
    const authCookie = req.headers.cookie as string;

    try {
      const tasks = await getUserTasksByModule(moduleId, {
        cookie: authCookie,
      });

      const firstTask = tasks[0];

      return {
        redirect: {
          permanent: false,
          destination: `/teacher/curriculum/${moduleId}/${firstTask.task_data.id}`,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
);
