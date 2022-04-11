import { Column } from 'react-table';
import styles from './cohort-progress.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRightIcon from '../../../../public/svg/arrow-right.svg';
import { Task } from '../../../utils/types';

export interface CohortProgressData {
  student: { name: string; username: string; img: string };
  profile: { link: string };
  [key: `task_${number}`]: number;
}

export function getCohortProgressColumns(
  tasks: Task[]
): Column<CohortProgressData>[] {
  const tasksColumns = tasks.map(
    (task, index) =>
      ({
        Header: `Task ${index + 1}`,
        accessor: `task_${index + 1}`,
        Cell: ({ cell: { value } }: { cell: { value: number } }) => (
          <span className={styles.scoreWrapper}>{value}</span>
        ),
      } as const)
  );
  return [
    {
      Header: 'Student name',
      accessor: 'student',

      Cell: ({
        cell: { value },
      }: {
        cell: { value: { name: string; username: string; img: string } };
      }) => (
        <div className={styles.studentCellWrapper}>
          <div className={styles.studentImgWrapper}>
            <Image
              className={styles.studentImg}
              width={32}
              height={32}
              objectFit="cover"
              layout="fixed"
              src={value.img}
              alt={value.name}
            />
          </div>
          <div className={styles.studentNameWrapper}>
            <span className={styles.studentName}>{value.name}</span>
            <span className={styles.studentName}>#{value.username}</span>
          </div>
        </div>
      ),
    },
    ...tasksColumns,
    {
      Header: '',
      accessor: 'profile',

      Cell: ({ cell: { value } }: { cell: { value: { link: string } } }) => (
        <Link href={value.link}>
          <a className={styles.profileLink}>
            <span>Profile</span>
            <span className={styles.profileLinkArrow}>
              <ArrowRightIcon />
            </span>
          </a>
        </Link>
      ),
    },
  ];
}
