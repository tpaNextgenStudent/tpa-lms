import styles from './TaskLockBadge.module.scss';
import clsx from 'clsx';
import LockIcon from '../../../public/svg/lock-icon.svg';

interface TaskLockBadgeProps {}

export const TaskLockBadge = ({}: TaskLockBadgeProps) => {
  return (
    <span
      className={clsx(styles.taskLockWrapper)}
      role="img"
      aria-label="Task locked"
    >
      <LockIcon />
    </span>
  );
};
