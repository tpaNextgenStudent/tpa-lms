import { Column } from 'react-table';
import styles from './cohort-student-progress.module.scss';
import { TaskStatus } from '../../../../api/tasks';
import { ITeacherSingleStudentScores } from '../../../../api/cohort';
import { GradeCell } from '../../../../components/common/tables/GradeCell/GradeCell';
import Link from 'next/link';

type TaskScoreField = {
  score: number | null;
  status: TaskStatus;
  attempt_number: number;
  attempt_id: string | null;
};

export interface CohortStudentProgressData {
  module: string;
  [key: `task_${number}`]: TaskScoreField | null;
  sa: TaskScoreField | null;
}

export function getTeacherStudentProgressColumns(
  numOfMaxTasksInModule: number
): Column<CohortStudentProgressData>[] {
  //prepare columns for all tasks
  const tasksColumns = [...Array(numOfMaxTasksInModule)].map(
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
        }) => {
          if (!value) {
            return null;
          }

          return value.attempt_id ? (
            <Link href={`/teacher/assignments/${value.attempt_id}`}>
              <a className={styles.taskCell}>
                <GradeCell grade={value} />
              </a>
            </Link>
          ) : (
            <span className={styles.taskCell}>
              <GradeCell grade={value} />
            </span>
          );
        },
      } as const)
  );

  return [
    {
      Header: 'Module',
      accessor: 'module',
      width: 70,
    },
    ...tasksColumns,
    {
      Header: () => <span className={styles.saCell}>SA</span>,
      accessor: 'sa',
      width: '1fr',

      Cell: ({
        cell: { value },
      }: {
        cell: { value: TaskScoreField | null };
      }) => (
        <span className={styles.saCell}>
          <GradeCell grade={value} />
        </span>
      ),
    },
  ];
}

export const mapStudentProgressToTableData = (
  rawStudentProgress: ITeacherSingleStudentScores['tasks_in_modules']
): CohortStudentProgressData[] => {
  return rawStudentProgress
    .sort(({ position: p1 }, { position: p2 }) => {
      return p1 > p2 ? 1 : -1;
    })
    .map(({ tasks, position }) => {
      return Object.assign(
        {
          module: `Module ${position}`,
          sa: {
            score: null,
            status: 'upcoming',
            attempt_number: null,
          },
        },
        ...tasks.map(
          ({ position, score, status, attempt_number, attempt_id }) => ({
            [`task_${position}`]: { score, status, attempt_number, attempt_id },
          })
        )
      );
    });
};
