import styles from './TaskBadges.module.scss';
import clsx from 'clsx';
import { Task, TaskStatus, TaskType, UserTask } from '../../../lib/utils/types';
import LockIcon from '../../../public/lock-icon.svg';
import InfoTypeIcon from '../../../public/info-type-icon.svg';
import CodeTypeIcon from '../../../public/code-type-icon.svg';

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
      <span
        className={clsx(
          styles.taskStatus,
          styles[`taskStatus${getColorByStatus(task.status)}`]
        )}
      >
        {task.status}
      </span>
      <span className={styles.taskType}>
        <span className={styles.taskTypeIcon}>
          <TaskTypeIcon type={task.task.type} />
        </span>
        <span className={styles.taskTypeText}>{task.task.type}</span>
      </span>
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
