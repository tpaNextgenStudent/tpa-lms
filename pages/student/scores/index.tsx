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
    <Layout title="My Scores" user={user}>
      <Table columns={columns} data={scores} isFullWidth />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const authCookie = req.headers.cookie as string;
  const user = await getUserDetails({ cookie: authCookie });

  const rawSores = await getUserScores({ cookie: authCookie });

  const scores = rawSores.map(
    ({ attempt, task_type, task_name, module_name }) => {
      const teacherName = [
        attempt.teacher.user.name,
        attempt.teacher.user.surname,
      ]
        .filter(n => n)
        .join(' ');
      return {
        submission_date: dayjs(attempt.submission_date).format('DD MMMM'),
        review_date: dayjs(attempt.evaluation_date).format('DD MMMM'),
        module: module_name,
        task: task_name,
        task_type: task_type,
        attempt: attempt.attempt_number,
        score: attempt.score,
        reviewed_by: {
          name: teacherName,
          img: attempt.teacher.user.image,
        },
        view: { link: `/student/scores/${attempt.id}` },
      };
    }
  );

  return { props: { user, scores } };
});
