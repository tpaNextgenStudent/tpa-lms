import { Layout } from '../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../lib/utils/types';
import { TasksMenu } from '../../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../../components/tasks/tasksPage/tasksPage.module.scss';
import { TaskSection } from '../../../../components/tasks/TaskSection/TaskSection';
import { getUserTasksByModule } from '../../../../api/tasks';
import { getUserModules } from '../../../../api/modules';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../../api/user';
import { getAttemptsByTask } from '../../../../api/attempts';

export default function Tasks({
  user,
  module,
  modules,
  tasks,
  task,
  attempts,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="My Tasks" user={user}>
      <div className={styles.tasksWrapper}>
        <TasksMenu
          modules={modules}
          module={module}
          tasks={tasks}
          task={task}
        />
        <TaskSection
          attempts={attempts}
          attempt={task.last_attempt}
          task={task.task_data}
          module={module}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const authCookie = req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });

    const { module: moduleId, task: taskId } = params! as {
      module: string;
      task: string;
    };
    try {
      const modules = await getUserModules({
        cookie: authCookie,
      });
      const module = modules.find(m => m.module_version_id === moduleId)!;

      const tasks = await getUserTasksByModule(moduleId, {
        cookie: authCookie,
      });

      const task = tasks.find(t => t.task_data.id === taskId)!;

      const attempts = await getAttemptsByTask(taskId, {
        cookie: authCookie,
      });

      return {
        props: {
          user,
          module,
          modules,
          tasks,
          task,
          attempts,
        },
      };
    } catch (e) {
      console.log(e);
    }

    return {
      notFound: true,
    };
  }
);
