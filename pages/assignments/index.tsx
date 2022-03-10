import { getFakeData } from '../../lib/mocks/getFakeData';
import { GetServerSidePropsContext } from 'next';
import { InferPagePropsType } from '../../lib/utils/types';
import { Layout } from '../../components/common/Layout/Layout';
import { Column } from 'react-table';
import styles from '../../components/scores/scores-page/scoresPage.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRightIcon from '../../public/arrow-right.svg';
import faker from '@faker-js/faker';
import { Table } from '../../components/common/Table/Table';

interface AssignmentsData {
  submission_date: string;
  student: { name: string; img: string };
  module: string;
  task: string;
  task_type: string;
  attempt: number;
  check: { link: string };
}

const columns: Column<AssignmentsData>[] = [
  {
    Header: 'Date of submission',
    accessor: 'submission_date',
  },
  {
    Header: 'Reviewed by',
    accessor: 'student',

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
    Header: 'Attempt',
    accessor: 'attempt',
  },
  {
    Header: '',
    accessor: 'check',

    Cell: ({ cell: { value } }: { cell: { value: { link: string } } }) => (
      <Link href={value.link}>
        <a className={styles.viewLink}>
          <span>Check</span>
          <span className={styles.viewLinkArrow}>
            <ArrowRightIcon />
          </span>
        </a>
      </Link>
    ),
  },
];

export default function AssignmentsIndex({
  user,
  assignments,
}: InferPagePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      user={user}
      title={'Assignments'}
      description="Students' tasks to be reviewed by you."
    >
      <Table data={assignments} columns={columns} />
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await getFakeData();

  //get user id from next auth, and fetch all his data using prisma.user.findFirst
  const user = data.user;

  //todo: when user's role is not a teacher, redirect to home
  //todo: create middlewares checking if a given role has an access to requested page

  const assignments: AssignmentsData[] = [];

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

    const attempt = faker.random.arrayElement([1, 2, 3]);

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

    assignments.push({
      submission_date: sd,
      module: moduleName,
      task: taskName,
      task_type: taskType,
      attempt: attempt,
      student: student,
      check: { link: '/assignments' },
    });
  }

  return { props: { user, assignments } };
}
