import { Layout } from '../../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../../lib/types';
import { withServerSideAuth } from '../../../../../lib/auth/withServerSideAuth';
import { fetchAttemptById } from '../../../../../apiHelpers/attempts';
import { TaskSection } from '../../../../../components/tasks/TaskSection/TaskSection';
import { attemptToComments } from '../../../../../utils/attemptsToComments';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../../../../components/common/LoadingSpinner/LoadingSpinner';

export default function ScoresIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { assignment: assignmenttId } = router.query as {
    assignment: string;
  };
  const {
    data: attempt,
    isFetching,
    refetch,
  } = useQuery(['attempt', assignmenttId], () =>
    fetchAttemptById(assignmenttId)
  );
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

  const student = attempt?.student.user;
  const studentFullName =
    student && [student.name, student.surname].filter(n => !!n).join(' ');
  return (
    <Layout
      parentPage={{
        title: 'Cohort Progress',
        link: '/teacher/cohort/progress',
      }}
      headerTitle={studentFullName || '...'}
      title="Cohort Progress"
      user={user}
      withHeaderPrevButton
    >
      {attempt && comments && task && module ? (
        <TaskSection
          task={task}
          comments={comments}
          attempt={attempt}
          module={module}
          isTeacherAssessPanelVisible={task.type === 'code'}
        />
      ) : (
        <LoadingSpinner isLoading={isFetching} refetch={refetch} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ user }) => {
    return {
      props: {
        user,
      },
    };
  }
);
