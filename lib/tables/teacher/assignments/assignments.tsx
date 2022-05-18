import { Column } from 'react-table';
import styles from './assignments.module.scss';
import Link from 'next/link';
import { UserNameCell } from '../../../../components/common/tables/UserNameCell/UserNameCell';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { TaskType } from '../../../types';
import { TaskAttemptBadge } from '../../../../components/tasks/TaskAttemptBadge/TaskAttemptBadge';
import dayjs from 'dayjs';
import { IAssignment } from '../../../../apiHelpers/assignments';
import { TextCell } from '../../../../components/common/tables/TextCell/TextCell';

export interface AssignmentsData {
  submission_date: string;
  student: {
    name: string;
    login: string | null;
    img: string | null;
    id: string;
  };
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
  },
  {
    Header: 'Student name',
    accessor: 'student',

    Cell: ({
      cell: {
        value: { name, img, login, id },
      },
    }: {
      cell: { value: AssignmentsData['student'] };
    }) => <UserNameCell id={id} name={name} img={img} login={login} />,
  },
  {
    Header: 'Module',
    accessor: 'module',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span data-cypress="AssignmentsTableModuleCell">{value}</span>
    ),
  },
  {
    Header: 'Task name',
    accessor: 'task',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <TextCell id="AssignmentsTableTaskCell" value={value} />
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
    Header: '',
    accessor: 'check',

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
        id: a.student.user.id,
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
