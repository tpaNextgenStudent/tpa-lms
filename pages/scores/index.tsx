import { Layout } from '../../components/common/Layout/Layout';
import { GetServerSidePropsContext } from 'next';
import { getFakeData } from '../../lib/mocks/getFakeData';
import { InferPagePropsType } from '../../lib/utils/types';
import faker from '@faker-js/faker';
import { Column } from 'react-table';
import styles from '../../components/scores/scores-page/scoresPage.module.scss';
import Link from 'next/link';
import ArrowRightIcon from '../../public/arrow-right.svg';
import { Table } from '../../components/common/Table/Table';
import Image from 'next/image';

interface ScoresData {
  submission_date: string;
  review_date: string;
  module: string;
  task: string;
  task_type: string;
  attempts: number;
  score: number;
  reviewed_by: { name: string; img: string };
  view: { link: string };
}

const columns: Column<ScoresData>[] = [
  {
    Header: 'Date of submission',
    accessor: 'submission_date',
  },
  {
    Header: 'Date of review',
    accessor: 'review_date',
  },
  {
    Header: 'Module',
    accessor: 'module',
  },
  {
    Header: 'Task',
    accessor: 'task',
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.taskTypeWrapper}>{value}</span>
    ),
  },
  {
    Header: 'Attempts',
    accessor: 'attempts',
  },
  {
    Header: 'Score',
    accessor: 'score',
  },
  {
    Header: 'Reviewed by',
    accessor: 'reviewed_by',

    Cell: ({
      cell: { value },
    }: {
      cell: { value: { name: string; img: string } };
    }) => (
      <div className={styles.teacherCellWrapper}>
        <Image
          className={styles.teacherImg}
          width={32}
          height={32}
          objectFit="cover"
          layout="fixed"
          src={value.img}
          alt={value.name}
        />
        <span className={styles.teacherName}>{value.name}</span>
      </div>
    ),
  },
  {
    Header: '',
    accessor: 'view',

    Cell: ({ cell: { value } }: { cell: { value: { link: string } } }) => (
      <Link href={value.link}>
        <a className={styles.viewLink}>
          <span>View</span>
          <span className={styles.viewLinkArrow}>
            <ArrowRightIcon />
          </span>
        </a>
      </Link>
    ),
  },
];

export default function ScoresIndex({
  user,
  scores,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="My Scores" user={user}>
      <Table columns={columns} data={scores} />
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await getFakeData();

  const user = data.user;

  const scores = [];

  for (let i = 0; i < 20; i++) {
    const sd = `${faker.datatype.number({
      min: 1,
      max: 28,
    })} ${faker.date.month()}`;
    const rd = `${faker.datatype.number({
      min: 1,
      max: 28,
    })} ${faker.date.month()}`;

    const taskName = faker.company.catchPhrase();

    const mn = faker.company.bsNoun();
    const moduleName = `${mn[0].toUpperCase()}${mn.slice(1)}`;

    const taskType = faker.random.arrayElement([
      'info',
      'image',
      'quiz',
      'code',
    ]);

    const attempts = faker.random.arrayElement([1, 2, 3]);
    const score = faker.random.arrayElement([1, 2, 3]);

    const reviewedBy = faker.random.arrayElement([
      {
        name: 'Go Kubo',
        img: 'https://unsplash.it/75/75/',
      },
      {
        name: 'Łukasz Matuszczak',
        img: 'https://unsplash.it/100/100/',
      },
    ]);

    scores.push({
      submission_date: sd,
      review_date: rd,
      module: moduleName,
      task: taskName,
      task_type: taskType,
      attempts: attempts,
      score: score,
      reviewed_by: reviewedBy,
      view: { link: '/scores' },
    });
  }

  return { props: { user, scores } };
}
