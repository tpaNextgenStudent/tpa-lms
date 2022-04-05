import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { getUserModules } from '../../../api/modules';
import { getUserTasksByModule } from '../../../api/tasks';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getAttemptById } from '../../../api/attempts';

export default function ScoresIndex({
  user,
  module,
  task,
  attempt,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      title={task.name}
      user={user}
      headerPrevButton={{ pageName: 'My Scores', pageLink: '/student/scores' }}
    >
      <TaskSection
        task={task}
        attempts={[attempt]}
        attempt={attempt}
        module={module}
        isActionLocked
      />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const { attempt: attemptId } = params! as {
      attempt: string;
    };

    const authCookie = req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });

    const attempt = await getAttemptById(attemptId, { cookie: authCookie });

    return {
      props: {
        user,
        module: {
          module_version_id: attempt.task.module_version_id,
          name: 'Module Name',
        },
        task: {
          name: attempt.task.name,
          type: attempt.task.type,
          description: attempt.task.description,
        },
        attempt: {
          attempt_id: attempt.id,
          status: 'approved' as const,
          attempt_number: attempt.attempt_number,
          score: attempt.score,
          comment: attempt.comment,
          evaluation_date: attempt.evaluation_date,
          teacher: {
            user: { name: 'TName', surname: 'TSurname', image: null },
          },
        },
      },
    };
  }
);
