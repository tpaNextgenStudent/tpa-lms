import styles from './TaskBadges.module.scss';
import { Task, UserTask } from '../../../lib/utils/types';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskLockBadge } from '../TaskLockBadge/TaskLockBadge';

interface TaskBadgesProps {
  task: UserTask & { task: Task };
}

export const TaskBadges = ({ task }: TaskBadgesProps) => {
  return (
    <div className={styles.taskBadgesWrapper}>
      {task.status === 'upcoming' && <TaskLockBadge />}
      {task.score && <TaskScoreBadge score={task.score} />}
      <TaskStatusBadge status={task.status} />
      <TaskTypeBadge type={task.task.type} />
    </div>
  );
};
