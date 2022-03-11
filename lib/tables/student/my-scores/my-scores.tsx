import { Column } from 'react-table';
import styles from './my-scores.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRightIcon from '../../../../public/arrow-right.svg';

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

export const columns: Column<ScoresData>[] = [
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
