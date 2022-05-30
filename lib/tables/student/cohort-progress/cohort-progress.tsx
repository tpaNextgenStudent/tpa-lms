import { Column } from 'react-table';
import styles from './cohort-progress.module.scss';
import { TaskType } from '../../../types';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';
import { UserNameCell } from '../../../../components/common/tables/UserNameCell/UserNameCell';
import { IProgressItem } from '../../../../apiHelpers/cohort';
import { TextCell } from '../../../../components/common/tables/TextCell/TextCell';

interface ProgressData {
  student: {
    id: string | null;
    name: string;
    img: string | null;
    login: string | null;
  };
  module: string;
  task_name: string;
  task_type: string;
}

export const columns: Column<ProgressData>[] = [
  {
    Header: 'Student name',
    accessor: 'student',

    Cell: ({
      cell: {
        value: { name, img, login, id },
      },
    }: {
      cell: { value: ProgressData['student'] };
    }) => <UserNameCell id={id} name={name} img={img} login={login} />,
  },
  {
    Header: 'Module',
    accessor: 'module',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.moduleName}>{value}</span>
    ),
  },
  {
    Header: 'Task name',
    accessor: 'task_name',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => {
      return <TextCell value={value} />;
    },
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <TaskTypeCell type={value} />
    ),
  },
];

export function mapCohortProgressToTableData(
  rawProgress: IProgressItem[]
): ProgressData[] {
  return rawProgress.map(
    ({ student, task_name, task_type, module_position }) => {
      const studentName = [student.user?.name, student.user?.surname]
        .filter(n => n)
        .join(' ');
      return {
        student: {
          id: student.user?.id || null,
          name: studentName,
          login: student.profile.login,
          img: student.user?.image || null,
        },
        module: `Module ${module_position}`,
        task_name,
        task_type,
      };
    }
  );
}
