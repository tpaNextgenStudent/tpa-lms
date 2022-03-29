import { Column } from 'react-table';
import styles from './my-scores.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { TaskTypeIcon } from '../../../../components/tasks/TaskTypeIcon/TaskTypeIcon';
import { TaskType } from '../../../utils/types';
import clsx from 'clsx';
import { getColorByScore } from '../../../getColorByScore';

interface ScoresData {
  submission_date: string;
  review_date: string;
  module: string;
  task: string;
  task_type: string;
  attempt: number;
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
    minWidth: 250,
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <span className={styles.taskTypeWrapper}>
        <span className={styles.taskTypeIconWrapper}>
          <TaskTypeIcon type={value} />
        </span>
        <span className={styles.taskTypeText}>{value}</span>
      </span>
    ),
  },
  {
    Header: 'Attempt',
    accessor: 'attempt',
  },
  {
    Header: 'Score',
    accessor: 'score',

    Cell: ({ cell: { value } }: { cell: { value: number } }) => (
      <span className={styles.scoreWrapper}>
        <span
          className={clsx(
            styles.score,
            styles[`score${getColorByScore(value)}`]
          )}
        >
          {value}
        </span>
      </span>
    ),
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
        <span className={styles.teacherImgWrapper}>
          <Image
            className={styles.teacherImg}
            width={32}
            height={32}
            objectFit="cover"
            layout="fixed"
            src={value.img}
            alt={value.name}
          />
        </span>
        <span className={styles.teacherName}>{value.name}</span>
      </div>
    ),
  },
  {
    Header: '',
    accessor: 'view',
    minWidth: 150,

    Cell: ({ cell: { value } }: { cell: { value: { link: string } } }) => (
      <Link href={value.link}>
        <a className={styles.viewLink}>View task</a>
      </Link>
    ),
  },
];
