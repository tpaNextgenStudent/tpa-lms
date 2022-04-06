import styles from './TaskBadges.module.scss';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';
import { TaskScoreBadge } from '../TaskScoreBadge/TaskScoreBadge';
import { TaskLockBadge } from '../TaskLockBadge/TaskLockBadge';
import { TaskDoneBadge } from '../TaskDoneBadge/TaskDoneBadge';
import { ITask } from '../../../api/tasks';

interface TaskBadgesProps {
  task: ITask;
}

export const TaskBadges = ({ task }: TaskBadgesProps) => {
  const isTaskLocked = task.last_attempt.status === 'upcoming';
  const isInfoType = task.task_data.type === 'info';

  return (
    <div className={styles.taskBadgesWrapper}>
      {isTaskLocked && <TaskLockBadge />}
      {isInfoType ? (
        <TaskDoneBadge />
      ) : (
        task.last_attempt.score && (
          <TaskScoreBadge score={task.last_attempt.score} />
        )
      )}
      <TaskStatusBadge status={task.last_attempt.status} />
      <TaskTypeBadge type={task.task_data.type} />
    </div>
  );
};
