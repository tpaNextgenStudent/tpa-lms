import { Layout } from '../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../lib/types';
import { TasksMenu } from '../../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../../components/tasks/tasksPage/tasksPage.module.scss';
import { TaskSection } from '../../../../components/tasks/TaskSection/TaskSection';
import { getUserTasksByModule } from '../../../../apiHelpers/tasks';
import { getUserModules } from '../../../../apiHelpers/modules';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { getAttemptsByTask } from '../../../../apiHelpers/attempts';
import { attemptsToComments } from '../../../../utils/attemptsToComments';

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
      headerTitle="My Tasks"
      title="My Tasks"
      user={user}
      description="Find all of yours tasks divided into modules."
    >
      <div className={styles.tasksWrapper}>
        <TasksMenu
          tasksPathPrefix={'/student/tasks'}
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

export const getServerSideProps = withServerSideAuth('student')(
  async ({ req, params, user }) => {
    const { module: moduleId, task: taskId } = params! as {
      module: string;
      task: string;
    };
    const authCookie = req.headers.cookie as string;

    const [modules, tasks, attempts] = await Promise.all([
      getUserModules({
        cookie: authCookie,
      }),
      getUserTasksByModule(moduleId, {
        cookie: authCookie,
      }),
      getAttemptsByTask(taskId, {
        cookie: authCookie,
      }),
    ]);

    const module = modules.find(m => m.module_version_id === moduleId)!;
    const task = tasks.find(t => t.task_data.id === taskId);

    if (!task) {
      return {
        notFound: true,
      };
    }

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
  }
);
