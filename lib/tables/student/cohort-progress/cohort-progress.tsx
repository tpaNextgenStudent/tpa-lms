import { Column } from 'react-table';
import styles from './cohort-progress.module.scss';
import { TaskType } from '../../../utils/types';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { UserNameCell } from '../../../../components/common/tables/UserNameCell/UserNameCell';

interface ProgressData {
  student: { name: string; img: string | null; login: string | null };
  module: string;
  task_name: string;
  task_type: string;
}

export const columns: Column<ProgressData>[] = [
  {
    Header: 'Student name',
    accessor: 'student',
    width: 200,

    Cell: ({
      cell: {
        value: { name, img, login },
      },
    }: {
      cell: { value: ProgressData['student'] };
    }) => <UserNameCell name={name} img={img} login={login} />,
  },
  {
    Header: 'Module',
    accessor: 'module',
    width: 100,

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.moduleName}>{value}</span>
    ),
  },
  {
    Header: 'Task name',
    accessor: 'task_name',
    width: 205,
  },
  {
    Header: 'Task type',
    accessor: 'task_type',
    width: 100,

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <TaskTypeCell type={value} />
    ),
  },
];
