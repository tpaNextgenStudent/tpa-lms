import { Layout } from '../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../lib/utils/types';
import { TasksMenu } from '../../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../../components/tasks/tasksPage/tasksPage.module.scss';
import { TaskSection } from '../../../../components/tasks/TaskSection/TaskSection';
import { getUserTasksByModule } from '../../../../api/tasks';
import { getUserModules } from '../../../../api/modules';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';

export default function Tasks({
  user,
  module,
  modules,
  tasks,
  task,
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
        <TaskSection task={task} module={module} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const { module: moduleId, task: taskId } = params! as {
      module: string;
      task: string;
    };
    try {
      const modules = await getUserModules({
        cookie: req.headers.cookie as string,
      });
      const module = modules.find(m => m.id === moduleId)!;

      const tasks = await getUserTasksByModule(moduleId, {
        cookie: req.headers.cookie as string,
      });

      const task = tasks.find(t => t.id === taskId)!;

      const mockedUser = {
        id: 'userId',
        name: 'PatrykBuniX',
        firstname: 'Patryk',
        lastname: 'Górka',
        bio: 'Frontend developer in love with TypeScript and Next.js',
        email: 'patrykbunix@gmail.com',
        image: 'https://unsplash.it/100/100',
        cohortId: 'cohortId',
        role: 'student' as const,
      };

      return {
        props: {
          user: mockedUser,
          module,
          modules,
          tasks,
          task,
        },
      };
    } catch (e) {}

    return {
      notFound: true,
    };
  }
);
