import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/types';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { attemptToComments } from '../../../utils/attemptsToComments';
import { fetchAttemptById } from '../../../apiHelpers/attempts';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner/LoadingSpinner';

export default function ScoresIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { attempt: attemptId } = router.query! as {
    attempt: string;
  };

  const {
    data: attempt,
    isLoading,
    refetch,
  } = useQuery(['attempt', attemptId], () => fetchAttemptById(attemptId));
  const comments = attempt && attemptToComments(attempt);

  const module = attempt && {
    module_version_id: attempt.task.module_version_id,
    name: 'Module Name',
    module_number: attempt.module_number,
  };

  const task = attempt && {
    id: attempt.task_id,
    name: attempt.task.name,
    type: attempt.task.type,
    description: attempt.task.description,
    link: attempt.task.link,
    position: attempt.task_number,
  };
  return (
    <Layout
      parentPage={{ title: 'My Scores', link: '/student/scores' }}
      headerTitle={task?.name || '...'}
      title={'My Scores'}
      user={user}
      withHeaderPrevButton
    >
      {task && module && attempt && comments ? (
        <TaskSection
          task={task}
          comments={comments}
          attempt={attempt}
          module={module}
          isPassAgainVisible={
            typeof attempt.score === 'number' && attempt.score < 3
          }
        />
      ) : (
        <LoadingSpinner isLoading={isLoading} refetch={refetch} />
      )}
    </Layout>
  );
}
export const getServerSideProps = withServerSideAuth('student')(
  async ({ user }) => {
    return {
      props: {
        user,
      },
    };
  }
);
