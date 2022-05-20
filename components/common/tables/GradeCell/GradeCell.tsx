import styles from './GradeCell.module.scss';
import { getColorByScore } from '../../../../utils/getColorByScore';
import clsx from 'clsx';
import { TaskStatus } from '../../../../lib/types';
import ClockIcon from '../../../../public/svg/clock-icon.svg';
import TickIcon from '../../../../public/svg/tick-icon.svg';
import { ReactNode } from 'react';

interface GradeCellProps {
  grade: {
    score: number | null;
    status: TaskStatus;
    attempt_number?: number;
  } | null;
}

interface AttemptWrapperProps {
  className?: string;
  children: ReactNode;
  attempt?: number;
}
const AttemptWrapper = ({
  className,
  children,
  attempt,
}: AttemptWrapperProps) => {
  return (
    <span className={clsx(styles.wrapper, className)}>
      {children}
      {attempt && <span className={styles.attempt}>A{attempt}</span>}
    </span>
  );
};

export const GradeCell = ({ grade }: GradeCellProps) => {
  if (grade) {
    if (grade.status === 'in review') {
      return (
        <AttemptWrapper
          attempt={grade.attempt_number}
          className={styles.wrapperBlue}
        >
          <span
            className={styles.value}
            role="img"
            aria-label="Waiting for assessment"
          >
            <ClockIcon />
          </span>
        </AttemptWrapper>
      );
    }
    if (grade.score) {
      return (
        <AttemptWrapper
          attempt={grade.attempt_number}
          className={styles[`wrapper${getColorByScore(grade.score)}`]}
        >
          <span
            className={clsx(
              styles.value,
              styles[`value${getColorByScore(grade.score)}`]
            )}
          >
            {grade.score}
          </span>
        </AttemptWrapper>
      );
    }
    if (grade.status === 'approved') {
      return (
        <AttemptWrapper
          attempt={grade.attempt_number}
          className={styles.wrapperGreen}
        >
          <span className={styles.value} role="img" aria-label="Approved">
            <TickIcon />
          </span>
        </AttemptWrapper>
      );
    }
  }

  return (
    <AttemptWrapper className={styles.wrapperEmpty}>
      <span className={styles.value} aria-label="Waiting for assessment">
        -
      </span>
    </AttemptWrapper>
  );
};
