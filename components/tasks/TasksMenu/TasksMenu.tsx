import styles from './TasksMenu.module.scss';
import { Module, Task, UserTask } from '../../../lib/utils/types';
import { ModuleSelect } from '../../common/ModuleSelect/ModuleSelect';
import { TasksList } from '../TasksList/TasksList';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

interface TasksMenuProps {
  modules: Module[];
  module: Module;
  tasks: (UserTask & { task: Task })[];
  task: UserTask & { task: Task };
}

export const TasksMenu = ({ modules, module, tasks, task }: TasksMenuProps) => {
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/student/tasks/${e.target.value}`);
  };
  return (
    <section className={styles.wrapper}>
      <ModuleSelect
        modules={modules}
        module={module}
        handleChange={handleChange}
      />
      <TasksList currentTask={task} tasks={tasks} module={module} />
    </section>
  );
};
