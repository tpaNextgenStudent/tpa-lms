import styles from './TasksMenu.module.scss';
import { Module, Task, UserTask } from '../../../lib/mocks';
import Link from 'next/link';
import clsx from 'clsx';

interface TasksMenuProps {
  modules: Module[];
  module: Module;
  tasks: (UserTask & { task: Task })[];
  task: UserTask & { task: Task };
}

export const TasksMenu = ({
  modules,
  module,
  tasks,
  task: currentTask,
}: TasksMenuProps) => {
  return (
    <section className={styles.wrapper}>
      <select
        className={styles.moduleSelect}
        defaultValue={module.id}
        name="module-select"
        id="module-select"
      >
        {modules.map(m => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <ul className={styles.tasksList}>
        {tasks.map(({ task, status }) => (
          <Link key={task.id} href={`/tasks/${module.id}/${task.id}`}>
            <a className={styles.taskLink}>
              <li
                className={clsx(
                  styles.task,
                  task.id === currentTask.taskId && styles.taskActive
                )}
              >
                <h3 className={styles.taskName}>{task.name}</h3>
                <div className={styles.taskBadges}>
                  <span className={styles.taskBadge}>{status}</span>
                  <span className={styles.taskBadge}>{task.type}</span>
                  <span className={styles.taskBadge}>{module.name}</span>
                </div>
                <span className={styles.viewDetails}>View details {'->'}</span>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </section>
  );
};
