import styles from './TaskBadges.module.scss';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskDoneBadge } from '../TaskDoneBadge/TaskDoneBadge';
import { TaskStatus } from '../../../api/tasks';
import { TaskType } from '../../../lib/utils/types';

interface TaskBadgesProps {
  task: { name: string; type: TaskType; description: string };
  attempt: {
    status: TaskStatus;
    attempt_number: number | null;
    score: number | null;
  };
}

export const TaskBadges = ({ task, attempt }: TaskBadgesProps) => {
  const isInfoType = task.type === 'info';

  return (
    <div className={styles.taskBadgesWrapper}>
      <TaskTypeBadge type={task.type} />
      <TaskStatusBadge status={attempt.status} />
      {isInfoType ? (
        <TaskDoneBadge />
      ) : (
        attempt.score && <TaskScoreBadge isCircle score={attempt.score} />
      )}
    </div>
  );
};
