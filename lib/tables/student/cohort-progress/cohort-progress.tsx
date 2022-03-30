import { Column } from 'react-table';
import styles from './cohort-progress.module.scss';
import Image from 'next/image';
import { TaskType } from '../../../utils/types';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';

interface ProgressData {
  student: { name: string; img: string };
  module: string;
  task_name: string;
  task_type: string;
}

export const columns: Column<ProgressData>[] = [
  {
    Header: 'Student name',
    accessor: 'student',
    minWidth: 250,

    Cell: ({
      cell: { value },
    }: {
      cell: { value: { name: string; img: string; login: string } };
    }) => (
      <div className={styles.studentCellWrapper}>
        <div className={styles.studentImgWrapper}>
          <Image
            width={32}
            height={32}
            layout="fixed"
            objectFit="cover"
            className={styles.studentImg}
            src={value.img}
            alt={value.name}
          />
        </div>
        <div className={styles.studentNameWrapper}>
          <p className={styles.studentName}>{value.name}</p>
          <p className={styles.studentLogin}>#{value.login}</p>
        </div>
      </div>
    ),
  },
  {
    Header: 'Module',
    accessor: 'module',
  },
  {
    Header: 'Task name',
    accessor: 'task_name',
    minWidth: 250,
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: TaskType } }) => (
      <TaskTypeCell type={value} />
    ),
  },
];
