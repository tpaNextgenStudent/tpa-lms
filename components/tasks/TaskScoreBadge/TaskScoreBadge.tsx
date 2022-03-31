import clsx from 'clsx';
import styles from './TaskScoreBadge.module.scss';
import { getColorByScore } from '../../../lib/getColorByScore';

interface TaskScoreBadgeProps {
  score: number;
  text?: string;
  isCircle?: boolean;
}

export const TaskScoreBadge = ({
  score,
  text,
  isCircle,
}: TaskScoreBadgeProps) => {
  return (
    <span className={styles.wrapper}>
      {text && <span className={styles.scoreText}>{text}</span>}
      <span
        className={clsx(
          styles.taskScore,
          isCircle && styles.taskScoreCircle,
          styles[`taskScore${getColorByScore(score)}`]
        )}
      >
        {score}
      </span>
    </span>
  );
};
