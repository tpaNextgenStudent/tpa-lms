import clsx from 'clsx';
import styles from './TaskScoreBadge.module.scss';
import { getColorByScore } from '../../../lib/getColorByScore';

interface TaskScoreBadgeProps {
  score: number;
  text?: string;
}

export const TaskScoreBadge = ({ score, text }: TaskScoreBadgeProps) => {
  return (
    <span className={styles.wrapper}>
      {text && <span className={styles.scoreText}>{text}</span>}
      <span
        className={clsx(
          styles.taskScore,
          styles[`taskScore${getColorByScore(score)}`]
        )}
      >
        {score}
      </span>
    </span>
  );
};
