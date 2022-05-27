import clsx from 'clsx';
import styles from './TaskScoreBadge.module.scss';
import { getColorByScore } from '../../../utils/getColorByScore';

interface TaskScoreBadgeProps {
  score: number;
  withText?: boolean;
  withBorder?: boolean;
  className?: string;
}

export const TaskScoreBadge = ({
  score,
  withText,
  withBorder,
  className,
}: TaskScoreBadgeProps) => {
  return (
    <span
      data-cypress="TaskScoreBadge"
      className={clsx(styles.wrapper, className)}
    >
      {withText && <span className={styles.scoreText}>Score</span>}
      <span
        className={clsx(
          styles.taskScore,
          withBorder && styles.taskScoreBorder,
          styles[`taskScore${getColorByScore(score)}`]
        )}
      >
        {score}
      </span>
    </span>
  );
};
