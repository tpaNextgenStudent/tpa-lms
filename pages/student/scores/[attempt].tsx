import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getAttemptById } from '../../../api/attempts';
import { attemptToComments } from '../../../lib/utils/attemptsToComments';

export default function ScoresIndex({
  user,
  module,
  task,
  attempt,
  comments,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title={task.name} user={user} withHeaderPrevButton>
      <TaskSection
        task={task}
        comments={comments}
        attempt={attempt}
        module={module}
        isPassAgainVisible
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

    const comments = attemptToComments(attempt);

    return {
      props: {
        user,
        module: {
          module_version_id: attempt.task.module_version_id,
          name: 'Module Name',
          module_number: attempt.module_number,
        },
        task: {
          id: attempt.task_id,
          name: attempt.task.name,
          type: attempt.task.type,
          description: attempt.task.description,
        },
        attempt: {
          status: 'approved' as const,
          attempt_number: attempt.attempt_number,
          score: attempt.score,
        },
        comments,
      },
    };
  }
);
