import { Column } from 'react-table';
import styles from './my-scores.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { TaskType } from '../../../utils/types';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { TaskAttemptBadge } from '../../../../components/tasks/TaskAttemptBadge/TaskAttemptBadge';
import { TaskScoreBadge } from '../../../../components/tasks/TaskScoreBadge/TaskScoreBadge';

interface ScoresData {
  submission_date: string;
  review_date: string;
  module: string;
  task: string;
  task_type: string;
  attempt: number;
  score: number;
  reviewed_by: { name: string; img: string | null };
  view: { link: string };
}

export const columns: Column<ScoresData>[] = [
  {
    Header: 'Date of submission',
    accessor: 'submission_date',
    width: '5fr',
  },
  {
    Header: 'Date of review',
    accessor: 'review_date',
    width: '5fr',
  },
  {
    Header: 'Module',
    accessor: 'module',
    width: '3fr',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.moduleName}>{value}</span>
    ),
  },
  {
    Header: 'Task',
    accessor: 'task',
    width: 205,

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <strong data-cypress="MyScoresTableTaskCell">{value}</strong>
    ),
  },
  {
    Header: 'Task type',
    accessor: 'task_type',
    width: '3fr',

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <TaskTypeCell type={value} />
    ),
  },
  {
    Header: 'Attempt',
    accessor: 'attempt',
    width: '3fr',

    Cell: ({ cell: { value } }: { cell: { value: number } }) => (
      <TaskAttemptBadge attempt={value} styleType="circle" />
    ),
  },
  {
    Header: 'Score',
    accessor: 'score',
    width: '3fr',

    Cell: ({ cell: { value } }: { cell: { value: number } }) => (
      <TaskScoreBadge score={value} withBorder />
    ),
  },
  {
    Header: 'Reviewed by',
    accessor: 'reviewed_by',
    width: '4fr',

    Cell: ({
      cell: { value },
    }: {
      cell: { value: ScoresData['reviewed_by'] };
    }) => (
      <div className={styles.teacherCellWrapper}>
        <span className={styles.teacherImgWrapper}>
          {value.img && (
            <Image
              className={styles.teacherImg}
              width={32}
              height={32}
              objectFit="cover"
              layout="fixed"
              src={value.img}
              alt={value.name}
            />
          )}
        </span>
        <span className={styles.teacherName}>{value.name}</span>
      </div>
    ),
  },
  {
    Header: '',
    accessor: 'view',
    width: '4fr',

    Cell: ({
      cell: {
        value: { link },
      },
    }: {
      cell: { value: ScoresData['view'] };
    }) => (
      <Link
        href={`${link}?prevPage=${encodeURIComponent('My Scores')}`}
        as={link}
      >
        <a className={styles.viewLink}>View task</a>
      </Link>
    ),
  },
];
