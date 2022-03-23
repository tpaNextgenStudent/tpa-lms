import styles from './TasksListItem.module.scss';
import clsx from 'clsx';
import { Module, Task, UserTask } from '../../../lib/utils/types';
import Link from 'next/link';
import { TaskBadges } from '../TaskBadges/TaskBadges';

interface TaskListItemProps {
  task: UserTask & { task: Task };
  module: Module;
  isActive: boolean;
}

export const TasksListItem = ({
  isActive,
  module,
  task,
}: TaskListItemProps) => {
  return (
    <li className={clsx(styles.task, isActive && styles.taskActive)}>
      <Link href={`/student/tasks/${module.id}/${task.id}`}>
        <a className={styles.taskLink}>
          <span
            className={clsx(
              styles.moduleName,
              isActive && styles.moduleNameActive
            )}
          >
            {module.name}
          </span>
          <h3 className={styles.taskName}>{task.task.name}</h3>
          <TaskBadges task={task} />
        </a>
      </Link>
    </li>
  );
};
