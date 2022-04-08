import { Column } from 'react-table';
import styles from './cohort-progress.module.scss';
import Image from 'next/image';
import { TaskType } from '../../../utils/types';
import { TaskTypeCell } from '../../../../components/common/tables/TaskTypeCell/TaskTypeCell';

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
      cell: { value },
    }: {
      cell: { value: ProgressData['student'] };
    }) => (
      <div className={styles.studentCellWrapper}>
        <div className={styles.studentImgWrapper}>
          {value.img && (
            <Image
              width={32}
              height={32}
              layout="fixed"
              objectFit="cover"
              className={styles.studentImg}
              src={value.img}
              alt={value.name}
            />
          )}
        </div>
        <div className={styles.studentNameWrapper}>
          <p className={styles.studentName}>{value.name}</p>
          {value.login && <p className={styles.studentLogin}>#{value.login}</p>}
        </div>
      </div>
    ),
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
