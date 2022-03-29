import styles from './TaskAttemptBadge.module.scss';

interface TaskAttemptBadgeProps {
  attempt: number;
  text?: string;
}

export const TaskAttemptBadge = ({ attempt, text }: TaskAttemptBadgeProps) => {
  return (
    <span className={styles.wrapper}>
      {text && <span className={styles.text}>{text}</span>}
      <span className={styles.value}>{attempt}</span>
    </span>
  );
};
