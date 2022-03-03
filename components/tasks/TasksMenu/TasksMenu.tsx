import styles from './TasksMenu.module.scss';
import { Module, Task, UserTask } from '../../../lib/mocks';
import { ModuleSelect } from '../ModuleSelect/ModuleSelect';
import { TasksList } from '../TasksList/TasksList';

interface TasksMenuProps {
  modules: Module[];
  module: Module;
  tasks: (UserTask & { task: Task })[];
  task: UserTask & { task: Task };
}

export const TasksMenu = ({ modules, module, tasks, task }: TasksMenuProps) => {
  return (
    <section className={styles.wrapper}>
      <ModuleSelect modules={modules} />
      <TasksList currentTask={task} tasks={tasks} module={module} />
    </section>
  );
};
