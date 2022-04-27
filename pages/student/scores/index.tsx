import { Layout } from '../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../lib/utils/types';
import { Table } from '../../../components/common/tables/Table/Table';
import { columns } from '../../../lib/tables/student/my-scores/my-scores';
import dayjs from 'dayjs';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';
import { getUserDetails } from '../../../api/user';
import { getUserScores } from '../../../api/scores';

export default function ScoresIndex({
  user,
  scores,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      headerTitle="My Scores"
      title="My Scores"
      description="Track your scores. You can get 1 - don't give up, try again! 2 and 3 - well done, you are ready to go with the next task!"
      user={user}
    >
      <Table columns={columns} data={scores} isFullWidth />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ req, res }) => {
    const authCookie = req.headers.cookie as string;
    const user = await getUserDetails({ cookie: authCookie });

    const rawSores = await getUserScores({ cookie: authCookie });

    const scores = rawSores.map(
      ({ attempt, task_type, task_name, module_number }) => {
        const teacherName = [
          attempt.teacher.user.name,
          attempt.teacher.user.surname,
        ]
          .filter(n => n)
          .join(' ');
        return {
          submission_date: dayjs(attempt.submission_date).format('DD MMM YYYY'),
          review_date: dayjs(attempt.evaluation_date).format('DD MMM YYYY'),
          module: `Module ${module_number}`,
          task: task_name,
          task_type: task_type,
          attempt: attempt.attempt_number,
          score: attempt.score,
          reviewed_by: {
            name: teacherName,
            img: attempt.teacher.user.image,
            login: attempt.teacher.user.email,
          },
          view: { link: `/student/scores/${attempt.id}` },
        };
      }
    );

    return { props: { user, scores } };
  }
);
