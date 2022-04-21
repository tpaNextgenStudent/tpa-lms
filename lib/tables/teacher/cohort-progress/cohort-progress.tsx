import { Column } from 'react-table';
import styles from './cohort-progress.module.scss';
import Link from 'next/link';
import { UserNameCell } from '../../../../components/common/tables/UserNameCell/UserNameCell';
import { TaskStatus } from '../../../../api/tasks';
import {
  ITeacherProgressItem,
  ITeacherProgressTask,
} from '../../../../api/cohort';
import { GradeCell } from '../../../../components/common/tables/GradeCell/GradeCell';

type TaskScoreField = {
  score: number | null;
  status: TaskStatus;
  attempt_number: number;
};

export interface CohortProgressData {
  student: { name: string; img: string | null; login: string | null };
  [key: `task_${number}`]: TaskScoreField | null;
  profile: { link: string };
}

export function getTeacherCohortProgressColumns(
  numOfTasksInModule: number
): Column<CohortProgressData>[] {
  //prepare columns for all tasks
  const tasksColumns = [...Array(numOfTasksInModule)].map(
    (_, index) =>
      ({
        Header: () => (
          <span className={styles.taskCell}>{`Task ${index + 1}`}</span>
        ),
        accessor: `task_${index + 1}`,
        width: 41,

        Cell: ({
          cell: { value },
        }: {
          cell: { value: TaskScoreField | null };
        }) => (
          <span className={styles.taskCell}>
            <GradeCell grade={value} />
          </span>
        ),
      } as const)
  );

  return [
    {
      Header: 'Student name',
      accessor: 'student',
      width: 158,

      Cell: ({
        cell: { value },
      }: {
        cell: { value: CohortProgressData['student'] };
      }) => (
        <UserNameCell name={value.name} img={value.img} login={value.login} />
      ),
    },
    ...tasksColumns,
    {
      Header: '',
      accessor: 'profile',
      width: '1fr',

      Cell: ({ cell: { value } }: { cell: { value: { link: string } } }) => (
        <Link href={value.link}>
          <a className={styles.profileLink}>
            <span>Go to profile</span>
          </a>
        </Link>
      ),
    },
  ];
}

export const mapProgressToTableData = (
  rawProgress: ITeacherProgressItem[]
): CohortProgressData[] => {
  return rawProgress
    .sort(({ tasks: t1 }, { tasks: t2 }) => {
      return countApprovedTasks(t1) > countApprovedTasks(t2) ? -1 : 1;
    })
    .map(({ student, tasks }) => {
      const studentName = [student.user.name, student.user.surname]
        .filter(n => n)
        .join(' ');

      return Object.assign(
        {
          student: {
            name: studentName,
            login: student.profile.login,
            img: student.user.image,
          },
          profile: { link: '/profile/test' },
        },
        ...tasks.map(({ position, score, status, attempt_number }) => ({
          [`task_${position}`]: { score, status, attempt_number },
        }))
      );
    });
};

function countApprovedTasks(tasks: ITeacherProgressTask[]) {
  return tasks.reduce((acc, current) => {
    if (current.status === 'approved') {
      return acc + (current.score || 2);
    }
    return acc;
  }, 0);
}
