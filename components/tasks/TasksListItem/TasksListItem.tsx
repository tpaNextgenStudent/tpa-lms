import styles from './TasksListItem.module.scss';
import clsx from 'clsx';
import LockIcon from '../../../public/lock-icon.svg';
import { Module, Task, UserTask } from '../../../lib/utils/types';
import { BlockedLink } from '../../common/BlockedLink/BlockedLink';

interface TaskListItemProps {
  task: UserTask & { task: Task };
  module: Module;
  isActive: boolean;
}

const IN_PROGRESS_STATUS = 'in progress';

export const TasksListItem = ({
  isActive,
  module,
  task,
}: TaskListItemProps) => {
  const isTaskLocked = task.status === 'todo';
  return (
    <li
      className={clsx(
        styles.task,
        isActive && styles.taskActive,
        isTaskLocked && styles.taskLocked
      )}
    >
      <BlockedLink
        href={`/student/tasks/${module.id}/${task.id}`}
        isBlocked={isTaskLocked}
        className={styles.taskLink}
      >
        <h3 className={styles.taskName}>{task.task.name}</h3>
        <div className={styles.taskBadges}>
          <span
            className={clsx(
              styles.taskBadge,
              isActive && styles.taskBadgeActive
            )}
          >
            {task.status}
          </span>
          <span
            className={clsx(
              styles.taskBadge,
              isActive && styles.taskBadgeActive
            )}
          >
            {task.task.type}
          </span>
        </div>
        <span
          className={clsx(
            styles.moduleName,
            isActive && styles.moduleNameActive
          )}
        >
          {module.name}
        </span>
        {task.status !== IN_PROGRESS_STATUS && (
          <span
            className={clsx(
              styles.taskLockWrapper,
              isActive && styles.taskLockWrapperActive
            )}
            aria-label="Task locked"
          >
            <LockIcon />
          </span>
        )}
      </BlockedLink>
    </li>
  );
};
