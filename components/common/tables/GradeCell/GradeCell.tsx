import styles from './GradeCell.module.scss';
import { getColorByScore } from '../../../../lib/utils/getColorByScore';
import clsx from 'clsx';
import { TaskStatus } from '../../../../lib/utils/types';
import ClockIcon from '../../../../public/svg/clock-icon.svg';
import TickIcon from '../../../../public/svg/tick-icon.svg';

interface GradeCellProps {
  grade: {
    score: number | null;
    status: TaskStatus;
    attempt_number: number;
  } | null;
}

export const GradeCell = ({ grade }: GradeCellProps) => {
  if (grade) {
    if (grade.status === 'in review') {
      return (
        <span className={clsx(styles.wrapper, styles.wrapperBlue)}>
          <span className={styles.value} aria-label="Waiting for assessment">
            <ClockIcon />
          </span>
        </span>
      );
    }
    if (grade.score) {
      return (
        <span
          className={clsx(
            styles.wrapper,
            styles[`wrapper${getColorByScore(grade.score)}`]
          )}
        >
          <span className={styles.value}>{grade.attempt_number}</span>
        </span>
      );
    }
    if (grade.status === 'approved') {
      return (
        <span className={clsx(styles.wrapper, styles.wrapperGreen)}>
          <span className={styles.value} aria-label="Approved">
            <TickIcon />
          </span>
        </span>
      );
    }
  }

  return (
    <span className={clsx(styles.wrapper, styles.wrapperEmpty)}>
      <span className={styles.value} aria-label="Waiting for assessment">
        -
      </span>
    </span>
  );
};
