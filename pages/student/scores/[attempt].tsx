import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { getUserModules } from '../../../api/modules';
import { getUserTasksByModule } from '../../../api/tasks';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';

export default function ScoresIndex({
  user,
  module,
  task,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      title={task.name}
      user={user}
      headerPrevButton={{ pageName: 'My Scores', pageLink: '/student/scores' }}
    >
      <TaskSection task={task} module={module} isActionLocked />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const { attempt: attemptId } = params! as {
      attempt: string;
    };
    try {
      const modules = await getUserModules({
        cookie: req.headers.cookie as string,
      });

      const module = modules[0];

      const tasks = await getUserTasksByModule(module.id, {
        cookie: req.headers.cookie as string,
      });

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
          task: tasks[0],
        },
      };
    } catch (e) {}

    return {
      notFound: true,
    };
  }
);
