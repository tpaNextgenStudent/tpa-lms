import { Layout } from '../../../components/common/Layout/Layout';
import { getFakeData } from '../../../lib/mocks/getFakeData';
import { InferPagePropsType } from '../../../lib/utils/types';
import { Table } from '../../../components/common/tables/Table/Table';
import { columns } from '../../../lib/tables/student/my-scores/my-scores';
import { getUserModules } from '../../../api/modules';
import { getUserTasksByModule } from '../../../api/tasks';
import dayjs from 'dayjs';
import { withServerSideAuth } from '../../../lib/auth/withServerSideAuth';

export default function ScoresIndex({
  user,
  attempts,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="My Scores" user={user}>
      <Table columns={columns} data={attempts} isFullWidth />
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const data = await getFakeData();

  const modules = await getUserModules({
    cookie: req.headers.cookie as string,
  });
  const module = modules[0];

  const tasks = await getUserTasksByModule(module.id, {
    cookie: req.headers.cookie as string,
  });

  const attempts = tasks
    .map(({ attempts }) => attempts)
    .flat()
    .map(a => {
      return {
        submission_date: dayjs(a.attempt_date).format('DD MMMM'),
        review_date: dayjs(a.assessment_date).format('DD MMMM'),
        module: module.name,
        task: 'Translate to a box diagram',
        task_type: 'code',
        attempt: a.attempt_number,
        score: a.score,
        reviewed_by: {
          name: `${a.teacher.legalName} ${a.teacher.surname}`,
          img: a.teacher.image,
        },
        view: { link: `/student/scores/attemptId` },
      };
    });

  const mockedUser = {
    id: 'userId',
    name: 'PatrykBuniX',
    firstname: 'Patryk',
    lastname: 'Górka',
    bio: 'Frontend developer in love with TypeScript and Next.js',
    email: 'patrykbunix@gmail.com',
    image: 'https://unsplash.it/100/100',
    cohortId: 'cohortId',
    role: 'student' as const,
  };

  return { props: { user: mockedUser, attempts } };
});
