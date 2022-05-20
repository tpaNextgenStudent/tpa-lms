import styles from './TaskSectionModuleInfo.module.scss';
import { IModuleVersion } from '../../../apiHelpers/modules';

interface TaskSectionModuleInfoProps {
  module: IModuleVersion;
}

export const TaskSectionModuleInfo = ({
  module,
}: TaskSectionModuleInfoProps) => {
  const modulePosition = `Module ${module.module_number}`;

  return (
    <p data-cypress="TaskSectionModuleName" className={styles.taskModule}>
      <span className={styles.taskModuleNumber}>{modulePosition}</span>
      <span className={styles.taskModuleName}>{module.name}</span>
    </p>
  );
};
