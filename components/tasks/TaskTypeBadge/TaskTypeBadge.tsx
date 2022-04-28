import styles from './TaskTypeBadge.module.scss';
import { TaskType } from '../../../lib/types';
import { TaskTypeIcon } from '../TaskTypeIcon/TaskTypeIcon';

interface TaskTypeBadgeProps {
  type: TaskType;
}

export const TaskTypeBadge = ({ type }: TaskTypeBadgeProps) => {
  return (
    <span data-cypress="TaskTypeBadge" className={styles.taskType}>
      <span className={styles.taskTypeIcon}>
        <TaskTypeIcon type={type} />
      </span>
      <span className={styles.taskTypeText}>{type}</span>
    </span>
  );
};
