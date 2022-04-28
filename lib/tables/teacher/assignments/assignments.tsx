import { Column } from 'react-table';
import styles from './assignments.module.scss';
import Link from 'next/link';
import { UserNameCell } from '../../../../components/common/tables/UserNameCell/UserNameCell';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { TaskType } from '../../../utils/types';
import { TaskAttemptBadge } from '../../../../components/tasks/TaskAttemptBadge/TaskAttemptBadge';
import dayjs from 'dayjs';
import { IAssignment } from '../../../../api/assignments';

export interface AssignmentsData {
  submission_date: string;
  student: { name: string; login: string | null; img: string | null };
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
    Header: 'Student name',
    accessor: 'student',
    width: 160,

    Cell: ({
      cell: {
        value: { name, img, login },
      },
    }: {
      cell: { value: AssignmentsData['student'] };
    }) => <UserNameCell name={name} img={img} login={login} />,
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

export const mapAssignmentsToTableData = (
  rawAssignments: IAssignment[]
): AssignmentsData[] => {
  return rawAssignments.map(a => {
    return {
      submission_date: dayjs(a.submission_date).format('DD MMM YYYY'),
      student: {
        name: a.student.user.name,
        login: a.student.profile.login,
        img: a.student.user.image,
      },
      module: `Module ${a.module_number}`,
      task: a.task.name,
      task_type: a.task.type,
      attempt: a.attempt_number,
      check: { id: a.id },
    };
  });
};
