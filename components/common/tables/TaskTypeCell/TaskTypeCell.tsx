import { TaskType } from '../../../../lib/types';
import styles from './TaskTypeCell.module.scss';
import { TaskTypeIcon } from '../../../tasks/TaskTypeIcon/TaskTypeIcon';

interface TaskTypeCellProps {
  type: TaskType;
}

export const TaskTypeCell = ({ type }: TaskTypeCellProps) => (
  <span className={styles.taskTypeWrapper}>
    <span className={styles.taskTypeIconWrapper}>
      <TaskTypeIcon type={type} />
    </span>
    <span className={styles.taskTypeText}>{type}</span>
  </span>
);
