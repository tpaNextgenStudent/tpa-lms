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
import { attemptsToComments } from '../../../../lib/utils/attemptsToComments';

export default function Tasks({
  user,
  module,
  modules,
  tasks,
  task,
  comments,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      title="My Tasks"
      user={user}
      description="Find all of yours tasks divided into modules."
    >
      <div className={styles.tasksWrapper}>
        <TasksMenu
          modules={modules}
          module={module}
          tasks={tasks}
          task={task}
        />
        <TaskSection
          comments={comments}
          attempt={task.last_attempt}
          task={task.task_data}
          module={module}
          isTaskActionVisible
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

      const task = tasks.find(t => t.task_data.id === taskId);

      if (!task) {
        return {
          notFound: true,
        };
      }

      const attempts = await getAttemptsByTask(taskId, {
        cookie: authCookie,
      });

      const comments = attemptsToComments(attempts);

      return {
        props: {
          user,
          module,
          modules,
          tasks,
          task,
          comments,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  }
);
