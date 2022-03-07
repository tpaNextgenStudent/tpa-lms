import styles from './TasksList.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { UserTask, Task, Module } from '../../../lib/utils/types';
import LockIcon from '../../../public/lock-icon.svg';

interface TasksListProps {
  currentTask: UserTask & { task: Task };
  tasks: (UserTask & { task: Task })[];
  module: Module;
}

const IN_PROGRESS_STATUS = 'in progress';

export const TasksList = ({ currentTask, tasks, module }: TasksListProps) => {
  return (
    <ul className={styles.tasksList}>
      {tasks.map(({ task, status, id }) => {
        const isActive = task.id === currentTask.taskId;
        return (
          <Link key={id} href={`/tasks/${module.id}/${id}`}>
            <a className={styles.taskLink}>
              <li className={clsx(styles.task, isActive && styles.taskActive)}>
                <h3 className={styles.taskName}>{task.name}</h3>
                <div className={styles.taskBadges}>
                  <span
                    className={clsx(
                      styles.taskBadge,
                      isActive && styles.taskBadgeActive
                    )}
                  >
                    {status}
                  </span>
                  <span
                    className={clsx(
                      styles.taskBadge,
                      isActive && styles.taskBadgeActive
                    )}
                  >
                    {task.type}
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
                {status !== IN_PROGRESS_STATUS && (
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
      })}
    </ul>
  );
};
