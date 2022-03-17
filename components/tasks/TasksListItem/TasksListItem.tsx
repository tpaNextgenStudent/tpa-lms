import styles from './TasksListItem.module.scss';
import clsx from 'clsx';
import LockIcon from '../../../public/lock-icon.svg';
import Link from 'next/link';
import { Module, Task, UserTask } from '../../../lib/utils/types';

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
  return (
    <Link href={`/student/tasks/${module.id}/${task.id}`}>
      <a className={styles.taskLink}>
        <li className={clsx(styles.task, isActive && styles.taskActive)}>
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
                styles.taskLocked,
                isActive && styles.taskLockedActive
              )}
              aria-label="Task locked"
            >
              <LockIcon />
            </span>
          )}
        </li>
      </a>
    </Link>
  );
};
