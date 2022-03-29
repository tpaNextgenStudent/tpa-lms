import styles from './TasksListItem.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { TaskBadges } from '../TaskBadges/TaskBadges';
import { ITask } from '../../../api/tasks';
import { IModule } from '../../../api/modules';

interface TaskListItemProps {
  task: ITask;
  module: IModule;
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
          <h3 className={styles.taskName}>{task.name}</h3>
          <TaskBadges task={task} />
        </a>
      </Link>
    </li>
  );
};
