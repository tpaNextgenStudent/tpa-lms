import clsx from 'clsx';
import styles from './TaskStatusBadge.module.scss';
import { TaskStatus } from '../../../lib/utils/types';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  return (
    <span
      className={clsx(
        styles.taskStatus,
        styles[`taskStatus${getColorByStatus(status)}`]
      )}
    >
      {status}
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
