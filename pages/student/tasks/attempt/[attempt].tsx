import { Layout } from '../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../lib/types';
import { TaskSection } from '../../../../components/tasks/TaskSection/TaskSection';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../../api/user';
import { getAttemptById } from '../../../../api/attempts';
import { attemptToComments } from '../../../../utils/attemptsToComments';

export default function ScoresIndex({
  user,
  module,
  task,
  attempt,
  comments,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      parentPage={{ title: 'My Tasks', link: '/student/tasks' }}
      headerTitle={task.name}
      title={'My Tasks'}
      user={user}
      withHeaderPrevButton
    >
      <TaskSection
        task={task}
        comments={comments}
        attempt={attempt}
        module={module}
        isPassAgainVisible={
          typeof attempt.score === 'number' && attempt.score < 3
        }
      />
    </Layout>
  );
}
export const getServerSideProps = withServerSideAuth('student')(
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
          link: attempt.task.link,
        },
        attempt: {
          status: 'approved' as const,
          attempt_number: attempt.attempt_number,
          score: attempt.score,
          answer: attempt.answer,
        },
        comments,
      },
    };
  }
);
