import styles from './TasksMenu.module.scss';
import { OptionType } from '../../common/CustomSelect/CustomSelect';
import { TasksList } from '../TasksList/TasksList';
import { useRouter } from 'next/router';
import { SingleValue } from 'react-select';
import { IModuleVersion } from '../../../apiHelpers/modules';
import { ITask } from '../../../apiHelpers/tasks';
import { CustomSelect } from '../../common/CustomSelect/CustomSelect';
import { LoadingAnimation } from '../../common/LoadingAnimation/LoadingAnimation';

interface TasksMenuProps {
  modules?: IModuleVersion[];
  module?: IModuleVersion;
  tasks?: ITask[];
  task?: ITask;
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

  return (
    <section className={styles.wrapper}>
      {modules && module && tasks && task ? (
        <>
          <CustomSelect
            id="module-select"
            options={modules.map(({ module_version_id, module_number }) => ({
              value: module_version_id,
              label: `Module ${module_number}`,
            }))}
            value={{
              value: module.module_version_id,
              label: `Module ${module.module_number}`,
            }}
            handleChange={handleChange}
          />
          <TasksList
            tasksPathPrefix={tasksPathPrefix}
            currentTask={task}
            tasks={tasks}
            module={module}
          />
        </>
      ) : (
        <div className={styles.loadingWrapper}>
          <LoadingAnimation />
        </div>
      )}
    </section>
  );
};
