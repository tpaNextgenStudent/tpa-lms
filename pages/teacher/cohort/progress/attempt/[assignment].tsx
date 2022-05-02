import { Layout } from '../../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../../lib/types';
import { withServerSideAuth } from '../../../../../lib/auth/withServerSideAuth';
import { getAttemptById } from '../../../../../api/attempts';
import { TaskSection } from '../../../../../components/tasks/TaskSection/TaskSection';
import { attemptToComments } from '../../../../../utils/attemptsToComments';
import { getNextTeacherAssessmentTask } from '../../../../../api/assess';

export default function ScoresIndex({
  user,
  attempt,
  task,
  comments,
  module,
  student,
  nextAttempt,
}: InferPagePropsType<typeof getServerSideProps>) {
  const studentFullName = [student.name, student.surname]
    .filter(n => !!n)
    .join(' ');
  return (
    <Layout
      parentPage={{
        title: 'Cohort Progress',
        link: '/teacher/cohort/progress',
      }}
      headerTitle={studentFullName}
      title="Cohort Progress"
      user={user}
      withHeaderPrevButton
    >
      <TaskSection
        task={task}
        comments={comments}
        attempt={attempt}
        module={module}
        isTeacherAssessPanelVisible
        nextAttempt={nextAttempt}
      />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ req, params, user }) => {
    const { assignment: assignmentId } = params! as {
      assignment: string;
    };
    const authCookie = req.headers.cookie as string;

    const attempt = await getAttemptById(assignmentId, {
      cookie: authCookie,
    });

    const comments = attemptToComments(attempt);

    const nextAttempt = await getNextTeacherAssessmentTask(assignmentId, {
      cookie: authCookie,
    });

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
          status: attempt.status,
          attempt_number: attempt.attempt_number,
          score: attempt.score,
          answer: attempt.answer,
        },
        comments,
        student: attempt.student.user,
        nextAttempt,
      },
    };
  }
);
