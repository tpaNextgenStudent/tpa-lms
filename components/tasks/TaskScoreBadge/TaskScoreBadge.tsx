import clsx from 'clsx';
import styles from './TaskScoreBadge.module.scss';
import { getColorByScore } from '../../../lib/getColorByScore';

interface TaskScoreBadgeProps {
  score: number;
  withText?: boolean;
  withBorder?: boolean;
}

export const TaskScoreBadge = ({
  score,
  withText,
  withBorder,
}: TaskScoreBadgeProps) => {
  return (
    <span data-cypress="TaskScoreBadge" className={styles.wrapper}>
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
