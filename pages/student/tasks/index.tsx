import { getUserModules } from '../../../api/modules';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getCurrentTask } from '../../../api/tasks';

export default function TasksIndex() {
  return null;
}

export const getServerSideProps = withServerSideAuth(async ({ req }) => {
  try {
    const authCookie = req.headers.cookie as string;

    const currentTask = await getCurrentTask({ cookie: authCookie });

    return {
      redirect: {
        permanent: false,
        destination: `/student/tasks/${currentTask.module_id}/${currentTask.task_id}`,
      },
    };
  } catch (e) {
    console.log(e);
  }

  return {
    notFound: true,
  };
});
