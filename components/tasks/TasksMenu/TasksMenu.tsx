import styles from './TasksMenu.module.scss';
import { OptionType } from '../../common/CustomSelect/CustomSelect';
import { TasksList } from '../TasksList/TasksList';
import { useRouter } from 'next/router';
import { SingleValue } from 'react-select';
import { IModuleVersion } from '../../../apii/modules';
import { ITask } from '../../../apii/tasks';
import { CustomSelect } from '../../common/CustomSelect/CustomSelect';
import { useMemo } from 'react';

interface TasksMenuProps {
  modules: IModuleVersion[];
  module: IModuleVersion;
  tasks: ITask[];
  task: ITask;
  tasksPathPrefix: string;
}

export const TasksMenu = ({
  modules,
  module,
  tasks,
  task,
  tasksPathPrefix,
}: TasksMenuProps) => {
  const router = useRouter();
  const handleChange = (option: SingleValue<OptionType>) => {
    if (option?.value) {
      router.push(`${tasksPathPrefix}/${option.value}`);
    }
  };

  const selectOptions = useMemo(() => {
    return modules.map(({ module_version_id, module_number }) => ({
      value: module_version_id,
      label: `Module ${module_number}`,
    }));
  }, [modules]);

  const defaultValue = {
    value: module.module_version_id,
    label: `Module ${module.module_number}`,
  };

  return (
    <section className={styles.wrapper}>
      <CustomSelect
        id="module-select"
        options={selectOptions}
        value={defaultValue}
        handleChange={handleChange}
      />
      <TasksList
        tasksPathPrefix={tasksPathPrefix}
        currentTask={task}
        tasks={tasks}
        module={module}
      />
    </section>
  );
};
