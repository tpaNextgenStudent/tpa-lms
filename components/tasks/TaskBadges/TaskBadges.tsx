import styles from './TaskBadges.module.scss';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskLockBadge } from '../TaskLockBadge/TaskLockBadge';
import { TaskDoneBadge } from '../TaskDoneBadge/TaskDoneBadge';
import { IAttempt, ITask } from '../../../api/tasks';

interface TaskBadgesProps {
  task: ITask;
}

export const TaskBadges = ({ task }: TaskBadgesProps) => {
  const isTaskLocked = task.status === 'upcoming';
  const isInfoType = task.type === 'info';

  return (
    <div className={styles.taskBadgesWrapper}>
      {isTaskLocked && <TaskLockBadge />}
      {isInfoType ? (
        <TaskDoneBadge />
      ) : (
        task.score && <TaskScoreBadge score={task.score} />
      )}
      <TaskStatusBadge status={task.status} />
      <TaskTypeBadge type={task.type} />
    </div>
  );
};
