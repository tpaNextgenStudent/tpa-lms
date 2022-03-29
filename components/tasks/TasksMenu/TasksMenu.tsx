import styles from './TasksMenu.module.scss';
import {
  ModuleSelect,
  OptionType,
} from '../../common/ModuleSelect/ModuleSelect';
import { TasksList } from '../TasksList/TasksList';
import { useRouter } from 'next/router';
import { SingleValue } from 'react-select';
import { IModule } from '../../../api/modules';
import { ITask } from '../../../api/tasks';

interface TasksMenuProps {
  modules: IModule[];
  module: IModule;
  tasks: ITask[];
  task: ITask;
}

export const TasksMenu = ({ modules, module, tasks, task }: TasksMenuProps) => {
  const router = useRouter();
  const handleChange = (option: SingleValue<OptionType>) => {
    if (option?.value) {
      router.push(`/student/tasks/${option.value}`);
    }
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
