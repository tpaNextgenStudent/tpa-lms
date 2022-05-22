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
  const listItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && listItemRef.current) {
      listItemRef.current.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [isActive]);

  const modulePosition = `Module ${module.module_number}`;
  const taskPosition = `Task ${String(task.task_data.position).padStart(
    2,
    '0'
  )}`;

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
          <p className={styles.taskPosition}>
            <span className={styles.taskPositionModule}>{modulePosition}</span>
            <span className={styles.taskPositionTask}>{taskPosition}</span>
          </p>
          <h2 data-cypress="TaskListItemTitle" className={styles.taskName}>
            {task.task_data.name}
          </h2>
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
