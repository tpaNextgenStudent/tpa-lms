import { Column } from 'react-table';
import styles from './cohort-progress.module.scss';
import Image from 'next/image';

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

    Cell: ({
      cell: { value },
    }: {
      cell: { value: { name: string; img: string } };
    }) => (
      <div className={styles.studentCellWrapper}>
        <Image
          width={32}
          height={32}
          layout="fixed"
          objectFit="cover"
          className={styles.studentImg}
          src={value.img}
          alt={value.name}
        />
        <span className={styles.studentName}>{value.name}</span>
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
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.taskTypeWrapper}>{value}</span>
    ),
  },
];
