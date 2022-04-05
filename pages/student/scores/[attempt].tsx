import { Layout } from '../../../components/common/Layout/Layout';
import { Comment, InferPagePropsType } from '../../../lib/utils/types';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getAttemptById } from '../../../api/attempts';

export default function ScoresIndex({
  user,
  module,
  task,
  attempt,
  comments,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      title={task.name}
      user={user}
      headerPrevButton={{ pageName: 'My Scores', pageLink: '/student/scores' }}
    >
      <TaskSection
        task={task}
        comments={comments}
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

    const comments: Comment[] = attempt.comment
      ? [
          {
            author: {
              name: attempt.teacher.user.name,
              surname: attempt.teacher.user.surname,
              image: attempt.teacher.user.image,
            },
            attempt_score: attempt.score,
            content: attempt.comment,
            attempt_number: attempt.attempt_number,
            attempt_id: attempt.id,
            date: attempt.evaluation_date,
          },
        ]
      : [];

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
          status: 'approved' as const,
          attempt_number: attempt.attempt_number,
          score: attempt.score,
        },
        comments,
      },
    };
  }
);
