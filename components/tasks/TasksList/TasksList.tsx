import styles from './TasksList.module.scss';
import { TasksListItem } from '../TasksListItem/TasksListItem';
import { ITask } from '../../../api/tasks';
import { IModuleVersion } from '../../../api/modules';

interface TasksListProps {
  currentTask: ITask;
  tasks: ITask[];
  module: IModuleVersion;
}

export const TasksList = ({ currentTask, tasks, module }: TasksListProps) => {
  return (
    <ul className={styles.tasksList}>
      {tasks.map(task => (
        <TasksListItem
          key={task.task_data.id}
          isActive={task.task_data.id === currentTask.task_data.id}
          task={task}
          module={module}
        />
      ))}
    </ul>
  );
};
