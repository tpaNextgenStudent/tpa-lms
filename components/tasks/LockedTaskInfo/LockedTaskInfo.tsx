import styles from './LockedTaskInfo.module.scss';
import { TaskLockBadge } from '../TaskLockBadge/TaskLockBadge';

interface LockedTaskInfoProps {
  content: string;
}

export const LockedTaskInfo = ({ content }: LockedTaskInfoProps) => {
  return (
    <p className={styles.wrapper}>
      <TaskLockBadge />
      <span className={styles.content}>{content}</span>
    </p>
  );
};
