import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/types';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { attemptToComments } from '../../../utils/attemptsToComments';
import { fetchAttemptById } from '../../../apiHelpers/attempts';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { fetchNextTeacherAssessmentTask } from '../../../apiHelpers/assess';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner/LoadingSpinner';

export default function ScoresIndex({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { assignment: assignmentId } = router.query as {
    assignment: string;
  };

  const {
    data: nextAttempt,
    isFetching: isNextAttemptFetching,
    refetch: refetchNextAttempt,
  } = useQuery(['nextAttempt', assignmentId], () =>
    fetchNextTeacherAssessmentTask(assignmentId)
  );

  const {
    data: attempt,
    isFetching: isAttemptFetching,
    refetch: refetchAttempt,
  } = useQuery(['attempt', assignmentId], () => fetchAttemptById(assignmentId));

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

  const refetchAll = async () => {
    await refetchAttempt();
    await refetchNextAttempt();
  };

  const comments = attempt && attemptToComments(attempt);
  const student = attempt?.student.user;
  const studentFullName =
    student && [student.name, student.surname].filter(n => !!n).join(' ');
  const isLoading = isAttemptFetching || isNextAttemptFetching;
  return (
    <Layout
      parentPage={{ title: 'Assignments', link: '/teacher/assignments' }}
      headerTitle={studentFullName || '...'}
      title="Assignments"
      user={user}
      withHeaderPrevButton
    >
      {task && comments && module ? (
        <TaskSection
          task={task}
          comments={comments}
          attempt={attempt}
          module={module}
          isTeacherAssessPanelVisible={task.type === 'code'}
          nextAttempt={nextAttempt}
        />
      ) : (
        <LoadingSpinner isLoading={isLoading} refetch={refetchAll} />
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
