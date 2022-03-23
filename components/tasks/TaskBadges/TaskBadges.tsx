import styles from './TaskBadges.module.scss';
import clsx from 'clsx';
import { Task, TaskStatus, TaskType, UserTask } from '../../../lib/utils/types';
import LockIcon from '../../../public/lock-icon.svg';
import { TaskTypeBadge } from '../TaskTypeBadge/TaskTypeBadge';
import { TaskStatusBadge } from '../TaskStatusBadge/TaskStatusBadge';

interface TaskBadgesProps {
  task: UserTask & { task: Task };
}

export const TaskBadges = ({ task }: TaskBadgesProps) => {
  return (
    <div className={styles.taskBadgesWrapper}>
      {task.status === 'upcoming' && (
        <span className={clsx(styles.taskLockWrapper)} aria-label="Task locked">
          <LockIcon />
        </span>
      )}
      {task.score && (
        <span
          className={clsx(
            styles.taskScore,
            styles[`taskScore${getColorByScore(task.score)}`]
          )}
        >
          {task.score}
        </span>
      )}
      <TaskStatusBadge status={task.status} />
      <TaskTypeBadge type={task.task.type} />
    </div>
  );
};

const SCORE_COLOR_MODIFIER = {
  RED: 'Red',
  ORANGE: 'Orange',
  GREEN: 'Green',
};

function getColorByScore(score: number) {
  switch (score) {
    case 1:
      return SCORE_COLOR_MODIFIER.RED;
    case 2:
      return SCORE_COLOR_MODIFIER.ORANGE;
    case 3:
      return SCORE_COLOR_MODIFIER.GREEN;
    default:
      return SCORE_COLOR_MODIFIER.GREEN;
  }
}
