import { Column } from 'react-table';
import styles from './student-assignments.module.scss';
import Link from 'next/link';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { TaskType } from '../../../utils/types';
import { TaskAttemptBadge } from '../../../../components/tasks/TaskAttemptBadge/TaskAttemptBadge';
import { IAssignment } from '../../../../api/assignments';
import dayjs from 'dayjs';

export interface AssignmentsData {
  submission_date: string;
  module: string;
  task: string;
  task_type: string;
  attempt: number;
  check: { id: string };
}

export const columns: Column<AssignmentsData>[] = [
  {
    Header: 'Date of submission',
    accessor: 'submission_date',
    width: 110,
  },
  {
    Header: 'Module',
    accessor: 'module',
    width: 90,

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span data-cypress="AssignmentsTableModuleCell">{value}</span>
    ),
  },
  {
    Header: 'Task name',
    accessor: 'task',
    width: 256,

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span data-cypress="AssignmentsTableTaskCell" className={styles.taskName}>
        {value}
      </span>
    ),
  },
  {
    Header: 'Task type',
    accessor: 'task_type',
    width: 100,

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <TaskTypeCell type={value} />
    ),
  },
  {
    Header: 'Attempt',
    accessor: 'attempt',
    width: 100,

    Cell: ({ cell: { value } }: { cell: { value: number } }) => (
      <TaskAttemptBadge attempt={value} styleType="circle" />
    ),
  },
  {
    Header: '',
    accessor: 'check',
    width: '1fr',

    Cell: ({
      cell: { value },
    }: {
      cell: { value: AssignmentsData['check'] };
    }) => (
      <Link href={`/teacher/assignments/${value.id}`}>
        <a className={styles.checkLink}>Check</a>
      </Link>
    ),
  },
];

export const mapStudentAssignmentsToTableData = (
  rawAssignments: IAssignment[]
): AssignmentsData[] => {
  return rawAssignments.map(a => {
    return {
      submission_date: dayjs(a.submission_date).format('DD MMM YYYY'),
      module: `Module ${a.module_number}`,
      task: a.task.name,
      task_type: a.task.type,
      attempt: a.attempt_number,
      check: { id: a.id },
    };
  });
};
