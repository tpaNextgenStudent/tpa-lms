import clsx from 'clsx';
import styles from './TaskStatusBadge.module.scss';
import { TaskStatus } from '../../../lib/types';
import LockIcon from '../../../public/svg/lock-icon.svg';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  return (
    <span
      className={clsx(
        styles.taskStatus,
        status === 'upcoming' && styles.taskStatusUpcoming,
        styles[`taskStatus${getColorByStatus(status)}`]
      )}
    >
      {status === 'upcoming' && (
        <span className={styles.lockWrapper}>
          <LockIcon />
        </span>
      )}
      <span>{status}</span>
    </span>
  );
};

const STATUS_COLOR_MODIFIER = {
  BLUE: 'Blue',
  GREEN: 'Green',
  ORANGE: 'Orange',
  GRAY: 'Gray',
};

function getColorByStatus(status: TaskStatus) {
  switch (status) {
    case 'upcoming':
      return STATUS_COLOR_MODIFIER.GRAY;
    case 'in review':
      return STATUS_COLOR_MODIFIER.ORANGE;
    case 'approved':
      return STATUS_COLOR_MODIFIER.GREEN;
    case 'in progress':
      return STATUS_COLOR_MODIFIER.BLUE;
    default:
      return STATUS_COLOR_MODIFIER.BLUE;
  }
}
