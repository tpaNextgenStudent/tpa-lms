import styles from './TasksList.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { UserTask, Task, Module } from '../../../lib/mocks';

interface TasksListProps {
  currentTask: UserTask & { task: Task };
  tasks: (UserTask & { task: Task })[];
  module: Module;
}

export const TasksList = ({ currentTask, tasks, module }: TasksListProps) => {
  return (
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
  );
};
