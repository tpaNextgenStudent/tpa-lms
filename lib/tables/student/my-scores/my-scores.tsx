import { Column } from 'react-table';
import styles from './my-scores.module.scss';
import Link from 'next/link';
import { TaskType } from '../../../utils/types';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { TaskAttemptBadge } from '../../../../components/tasks/TaskAttemptBadge/TaskAttemptBadge';
import { TaskScoreBadge } from '../../../../components/tasks/TaskScoreBadge/TaskScoreBadge';
import { UserNameCell } from '../../../../components/common/tables/UserNameCell/UserNameCell';
import { TaskDoneBadge } from '../../../../components/tasks/TaskDoneBadge/TaskDoneBadge';

interface ScoresData {
  submission_date: string;
  review_date: string;
  module: string;
  task: string;
  task_type: string;
  attempt: number;
  score: number | null;
  reviewed_by: { name: string; img: string | null; login: string | null };
  view: { link: string };
}

export const columns: Column<ScoresData>[] = [
  {
    Header: 'Date of submission',
    accessor: 'submission_date',
    width: 110,
  },
  {
    Header: 'Date of review',
    accessor: 'review_date',
    width: 85,
  },
  {
    Header: 'Module',
    accessor: 'module',
    width: 60,

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
    width: 70,

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <TaskTypeCell type={value} />
    ),
  },
  {
    Header: 'Attempt',
    accessor: 'attempt',
    width: 48,

    Cell: ({ cell: { value } }: { cell: { value: number } }) => (
      <TaskAttemptBadge attempt={value} styleType="circle" />
    ),
  },
  {
    Header: 'Score',
    accessor: 'score',
    width: 35,

    Cell: ({ cell: { value } }: { cell: { value: number | null } }) =>
      value ? (
        <TaskScoreBadge score={value} withBorder />
      ) : (
        <TaskDoneBadge withBorder />
      ),
  },
  {
    Header: 'Reviewed by',
    accessor: 'reviewed_by',
    width: 160,

    Cell: ({
      cell: {
        value: { name, img, login },
      },
    }: {
      cell: { value: ScoresData['reviewed_by'] };
    }) => <UserNameCell name={name} img={img} login={login} />,
  },
  {
    Header: '',
    accessor: 'view',
    width: '1fr',

    Cell: ({
      cell: {
        value: { link },
      },
    }: {
      cell: { value: ScoresData['view'] };
    }) => (
      <Link href={link}>
        <a className={styles.viewLink}>View task</a>
      </Link>
    ),
  },
];
