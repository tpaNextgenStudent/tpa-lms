import { getUserTasksByModule } from '../../../../api/tasks';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';

export default function Module() {
  return null;
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const moduleId = params!.module as string;
    try {
      const tasks = await getUserTasksByModule(moduleId, {
        cookie: req.headers.cookie as string,
      });

      const currentTask = tasks[0];

      return {
        redirect: {
          permanent: false,
          destination: `/student/tasks/${moduleId}/${currentTask.task_data.id}`,
        },
      };
    } catch (e) {}

    return {
      notFound: true,
    };
  }
);
