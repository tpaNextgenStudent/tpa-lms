import { Column } from 'react-table';
import styles from './my-scores.module.scss';
import Link from 'next/link';
import { TaskType } from '../../../types';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { TaskAttemptBadge } from '../../../../components/tasks/TaskAttemptBadge/TaskAttemptBadge';
import { TaskScoreBadge } from '../../../../components/tasks/TaskScoreBadge/TaskScoreBadge';
import { UserNameCell } from '../../../../components/common/tables/UserNameCell/UserNameCell';
import { TaskDoneBadge } from '../../../../components/tasks/TaskDoneBadge/TaskDoneBadge';
import dayjs from 'dayjs';
import { IScore } from '../../../../apiHelpers/scores';
import { TextCell } from '../../../../components/common/tables/TextCell/TextCell';

interface ScoresData {
  submission_date: string;
  review_date: string;
  module: string;
  task: string;
  task_type: string;
  attempt: number;
  score: number | null;
  reviewed_by: {
    id: string;
    name: string;
    img: string | null;
    login: string | null;
  };
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

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.moduleName}>{value}</span>
    ),
  },
  {
    Header: 'Task',
    accessor: 'task',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <TextCell id="MyScoresTableTaskCell" value={value} maxWidth={180} />
    ),
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <TaskTypeCell type={value} />
    ),
  },
  {
    Header: 'Attempt',
    accessor: 'attempt',

    Cell: ({ cell: { value } }: { cell: { value: number } }) => (
      <TaskAttemptBadge attempt={value} styleType="circle" />
    ),
  },
  {
    Header: 'Score',
    accessor: 'score',

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

    Cell: ({
      cell: {
        value: { name, img, login, id },
      },
    }: {
      cell: { value: ScoresData['reviewed_by'] };
    }) => <UserNameCell id={id} name={name} img={img} login={login} />,
  },
  {
    Header: '',
    accessor: 'view',

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

export function mapStudentScoresToTableData(rawScores: IScore[]): ScoresData[] {
  return rawScores.map(({ attempt, task_type, task_name, module_number }) => {
    const teacherName = [
      attempt.teacher.user.name,
      attempt.teacher.user.surname,
    ]
      .filter(n => n)
      .join(' ');
    return {
      submission_date: dayjs(attempt.submission_date).format('DD MMM YYYY'),
      review_date: dayjs(attempt.evaluation_date).format('DD MMM YYYY'),
      module: `Module ${module_number}`,
      task: task_name,
      task_type: task_type,
      attempt: attempt.attempt_number,
      score: attempt.score,
      reviewed_by: {
        id: attempt.teacher.user.id,
        name: teacherName,
        img: attempt.teacher.user.image,
        login: attempt.teacher.profile.login,
      },
      view: { link: `/student/scores/${attempt.id}` },
    };
  });
}
