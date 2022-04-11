import styles from './TasksListItem.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { TaskBadges } from '../TaskBadges/TaskBadges';
import { ITask } from '../../../api/tasks';
import { IModuleVersion } from '../../../api/modules';

interface TaskListItemProps {
  task: ITask;
  module: IModuleVersion;
  isActive: boolean;
}

export const TasksListItem = ({
  isActive,
  module,
  task,
}: TaskListItemProps) => {
  const moduleName = `Module ${module.module_number}`;
  return (
    <li className={clsx(styles.task, isActive && styles.taskActive)}>
      <Link
        href={`/student/tasks/${module.module_version_id}/${task.task_data.id}`}
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
          <h3 className={styles.taskName}>{task.task_data.name}</h3>
          <TaskBadges task={task.task_data} attempt={task.last_attempt} />
        </a>
      </Link>
    </li>
  );
};
