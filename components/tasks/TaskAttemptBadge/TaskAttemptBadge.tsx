import styles from './TaskAttemptBadge.module.scss';
import clsx from 'clsx';

export type TaskAttemptBadgeStyleType = 'circle' | 'text-outside';

interface TaskAttemptBadgeProps {
  attempt: number;
  styleType?: TaskAttemptBadgeStyleType;
}

export const TaskAttemptBadge = ({
  attempt,
  styleType,
}: TaskAttemptBadgeProps) => {
  if (styleType === 'text-outside') {
    return (
      <span className={styles.wrapper}>
        <span className={styles.text}>Attempt </span>
        <span className={clsx(styles.value, styles.valueWithText)}>
          {attempt}
        </span>
      </span>
    );
  }

  const attemptText =
    styleType === 'circle' ? `A${attempt}` : `Attempt ${attempt}`;
  return (
    <span className={styles.wrapper}>
      <span
        className={clsx(
          styles.value,
          styleType === 'circle' && styles.valueCircle
        )}
      >
        {attemptText}
      </span>
    </span>
  );
};
