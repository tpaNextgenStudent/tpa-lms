import { Layout } from '../../components/common/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../lib/mocks/getFakeData';
import { InferPagePropsType } from '../../lib/utils/types';
import faker from '@faker-js/faker';
import { Column } from 'react-table';
import styles from '../../components/progress/progress-page/progressPage.module.scss';
import { Table } from '../../components/common/Table/Table';

interface ProgressData {
  student: { name: string; img: string };
  module: string;
  task_name: string;
  task_type: string;
}

const columns: Column<ProgressData>[] = [
  {
    Header: 'Student name',
    accessor: 'student',

    Cell: ({
      cell: { value },
    }: {
      cell: { value: { name: string; img: string } };
    }) => (
      <div className={styles.studentCellWrapper}>
        <img className={styles.studentImg} src={value.img} alt={value.name} />
        <span className={styles.studentName}>{value.name}</span>
      </div>
    ),
  },
  {
    Header: 'Module',
    accessor: 'module',
  },
  {
    Header: 'Task name',
    accessor: 'task_name',
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.taskTypeWrapper}>{value}</span>
    ),
  },
];

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
