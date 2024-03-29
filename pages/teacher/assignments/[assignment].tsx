import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../apii/user';
import { getAttemptById } from '../../../apii/attempts';
import { TaskSection } from '../../../components/tasks/TaskSection/TaskSection';
import { attemptToComments } from '../../../lib/utils/attemptsToComments';
import { getNextTeacherAssessmentTask } from '../../../apii/assess';

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
      parentPage={{ title: 'Assignments', link: '/teacher/assignments' }}
      headerTitle={studentFullName}
      title="Assignments"
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
  async ({ req, params }) => {
    const { assignment: assignmentId } = params! as {
      assignment: string;
    };
    const authCookie = req.headers.cookie as string;

    try {
      const user = await getUserDetails({ cookie: authCookie });

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
            status: 'approved' as const,
            attempt_number: attempt.attempt_number,
            score: attempt.score,
            answer: attempt.answer,
          },
          comments,
          student: attempt.student.user,
          nextAttempt,
        },
      };
    } catch (e) {
      return { notFound: true };
    }
  }
);
