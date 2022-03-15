import { Layout } from '../../../components/common/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../../lib/mocks/getFakeData';
import { InferPagePropsType } from '../../../lib/utils/types';
import faker from '@faker-js/faker';
import { Table } from '../../../components/common/Table/Table';
import { columns } from '../../../lib/tables/student/cohort-progress/cohort-progress';

export default function CohortProgress({
  user,
  progress,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Cohort Progress" user={user}>
      <Table data={progress} columns={columns} />
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await getFakeData();

  const user = data.user;

  const progress = [];

  for (let i = 0; i < 20; i++) {
    const taskName = faker.company.catchPhrase();

    const mn = faker.company.bsNoun();
    const moduleName = `${mn[0].toUpperCase()}${mn.slice(1)}`;

    const taskType = faker.random.arrayElement([
      'info',
      'image',
      'quiz',
      'code',
    ]);

    const student = faker.random.arrayElement([
      {
        name: 'Paulina Pogorzelska',
        img: 'https://unsplash.it/75/75/',
      },
      {
        name: 'Patryk Górka',
        img: 'https://unsplash.it/50/50/',
      },
      {
        name: 'Łukasz Matuszczak',
        img: 'https://unsplash.it/25/25',
      },
      {
        name: 'Mateusz Supel',
        img: 'https://unsplash.it/100/100',
      },
      {
        name: 'Magdalena Misiak',
        img: 'https://unsplash.it/150/150',
      },
    ]);

    progress.push({
      student,
      module: moduleName,
      task_name: taskName,
      task_type: taskType,
    });
  }

  return { props: { user, progress } };
}
