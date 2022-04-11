import { Column } from 'react-table';
import styles from './assignments.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRightIcon from '../../../../public/svg/arrow-right.svg';

interface AssignmentsData {
  submission_date: string;
  student: { name: string; img: string };
  module: string;
  task: string;
  task_type: string;
  attempt: number;
  check: { link: string };
}

export const columns: Column<AssignmentsData>[] = [
  {
    Header: 'Date of submission',
    accessor: 'submission_date',
  },
  {
    Header: 'Student name',
    accessor: 'student',

    Cell: ({
      cell: { value },
    }: {
      cell: { value: { name: string; img: string } };
    }) => (
      <div className={styles.studentCellWrapper}>
        <Image
          className={styles.studentImg}
          width={32}
          height={32}
          objectFit="cover"
          layout="fixed"
          src={value.img}
          alt={value.name}
        />
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
