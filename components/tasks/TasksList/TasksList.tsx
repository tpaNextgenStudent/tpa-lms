import styles from './TasksList.module.scss';
import { UserTask, Task, Module } from '../../../lib/utils/types';
import { TasksListItem } from '../TasksListItem/TasksListItem';

interface TasksListProps {
  currentTask: UserTask & { task: Task };
  tasks: (UserTask & { task: Task })[];
  module: Module;
}

export const TasksList = ({ currentTask, tasks, module }: TasksListProps) => {
  return (
    <ul className={styles.tasksList}>
      {tasks.map(task => (
        <TasksListItem
          key={task.id}
          isActive={task.task.id === currentTask.taskId}
          task={task}
          module={module}
        />
      ))}
    </ul>
  );
};
