import styles from './TaskLockBadge.module.scss';
import clsx from 'clsx';
import LockIcon from '../../../public/lock-icon.svg';

interface TaskLockBadgeProps {}

export const TaskLockBadge = ({}: TaskLockBadgeProps) => {
  return (
    <span className={clsx(styles.taskLockWrapper)} aria-label="Task locked">
      <LockIcon />
    </span>
  );
};
