import clsx from 'clsx';
import styles from './TaskScoreBadge.module.scss';
interface TaskScoreBadgeProps {
  score: number;
}

export const TaskScoreBadge = ({ score }: TaskScoreBadgeProps) => {
  return (
    <span
      className={clsx(
        styles.taskScore,
        styles[`taskScore${getColorByScore(score)}`]
      )}
    >
      {score}
    </span>
  );
};

const SCORE_COLOR_MODIFIER = {
  RED: 'Red',
  ORANGE: 'Orange',
  GREEN: 'Green',
};

function getColorByScore(score: number) {
  switch (score) {
    case 1:
      return SCORE_COLOR_MODIFIER.RED;
    case 2:
      return SCORE_COLOR_MODIFIER.ORANGE;
    case 3:
      return SCORE_COLOR_MODIFIER.GREEN;
    default:
      return SCORE_COLOR_MODIFIER.GREEN;
  }
}
