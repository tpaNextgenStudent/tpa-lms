import styles from './TaskAttemptBadge.module.scss';
import clsx from 'clsx';

interface TaskAttemptBadgeProps {
  attempt: number;
  text?: string;
  isCircle?: boolean;
}

export const TaskAttemptBadge = ({
  attempt,
  text,
  isCircle,
}: TaskAttemptBadgeProps) => {
  return (
    <span className={styles.wrapper}>
      {text && <span className={styles.text}>{text}</span>}
      <span className={clsx(styles.value, isCircle && styles.valueCircle)}>
        {attempt}
      </span>
    </span>
  );
};
