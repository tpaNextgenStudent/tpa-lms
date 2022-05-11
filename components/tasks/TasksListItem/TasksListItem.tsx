import styles from './TasksListItem.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { TaskBadges } from '../TaskBadges/TaskBadges';
import { ITask } from '../../../apiHelpers/tasks';
import { IModuleVersion } from '../../../apiHelpers/modules';
import { useEffect, useRef } from 'react';

interface TaskListItemProps {
  task: ITask;
  module: IModuleVersion;
  isActive: boolean;
  tasksPathPrefix: string;
}

export const TasksListItem = ({
  isActive,
  module,
  task,
  tasksPathPrefix,
}: TaskListItemProps) => {
  const moduleName = `Module ${module.module_number}`;
  const listItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && listItemRef.current) {
      listItemRef.current.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [isActive]);

  return (
    <li
      ref={listItemRef}
      data-cypress={isActive ? 'ActiveTaskListItem' : 'TaskListItem'}
      className={clsx(styles.task, isActive && styles.taskActive)}
    >
      <Link
        href={`${tasksPathPrefix}/${module.module_version_id}/${task.task_data.id}`}
      >
        <a className={styles.taskLink}>
          <span
            className={clsx(
              styles.moduleName,
              isActive && styles.moduleNameActive
            )}
          >
            {moduleName}
          </span>
          <h3 data-cypress="TaskListItemTitle" className={styles.taskName}>
            {task.task_data.name}
          </h3>
          <TaskBadges
            task={task.task_data}
            attempt={task.last_attempt}
            config={{ score: { withBorder: true } }}
          />
        </a>
      </Link>
    </li>
  );
};
