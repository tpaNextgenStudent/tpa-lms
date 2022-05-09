import {
  getCurrentTask,
  getUserTasksByModule,
} from '../../../../apiHelpers/tasks';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';

export default function Module() {
  return null;
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ req, params }) => {
    const moduleId = params!.module as string;
    const authCookie = req.headers.cookie as string;

    const [tasks, { task_id }] = await Promise.all([
      getUserTasksByModule(moduleId, {
        cookie: authCookie,
      }),
      getCurrentTask({ cookie: authCookie }),
    ]);

    const isTaskInModule = tasks.map(t => t.task_data.id).includes(task_id);

    const currentTaskId = isTaskInModule
      ? task_id
      : tasks.find(t => t.last_attempt?.status === 'in progress')?.task_data
          .id || tasks[0].task_data.id;

    return {
      redirect: {
        permanent: false,
        destination: `/student/tasks/${moduleId}/${currentTaskId}`,
      },
    };
  }
);
