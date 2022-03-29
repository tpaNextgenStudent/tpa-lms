import styles from './TasksList.module.scss';
import { TasksListItem } from '../TasksListItem/TasksListItem';
import { ITask } from '../../../api/tasks';
import { IModule } from '../../../api/modules';

interface TasksListProps {
  currentTask: ITask;
  tasks: ITask[];
  module: IModule;
}

export const TasksList = ({ currentTask, tasks, module }: TasksListProps) => {
  return (
    <ul className={styles.tasksList}>
      {tasks.map(task => (
        <TasksListItem
          key={task.id}
          isActive={task.id === currentTask.id}
          task={task}
          module={module}
        />
      ))}
    </ul>
  );
};
