import styles from './TaskTypeBadge.module.scss';
import { TaskType } from '../../../lib/utils/types';
import InfoTypeIcon from '../../../public/info-type-icon.svg';
import CodeTypeIcon from '../../../public/code-type-icon.svg';

interface TaskTypeBadgeProps {
  type: TaskType;
}

export const TaskTypeBadge = ({ type }: TaskTypeBadgeProps) => {
  return (
    <span className={styles.taskType}>
      <span className={styles.taskTypeIcon}>
        <TaskTypeIcon type={type} />
      </span>
      <span className={styles.taskTypeText}>{type}</span>
    </span>
  );
};

function TaskTypeIcon({ type }: { type: TaskType }) {
  switch (type) {
    case 'info':
      return <InfoTypeIcon />;
    case 'code':
      return <CodeTypeIcon />;
    default:
      return null;
  }
}
