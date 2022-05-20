import styles from './TaskSectionPassAgain.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { useRouter } from 'next/router';
import { IModuleVersion } from '../../../apiHelpers/modules';
import { ITask } from '../../../apiHelpers/tasks';

interface TaskSectionPassAgainProps {
  module: IModuleVersion;
  task: ITask['task_data'];
}

export const TaskSectionPassAgain = ({
  module,
  task,
}: TaskSectionPassAgainProps) => {
  const router = useRouter();
  return (
    <div data-cypress="TaskSectionTryAgainBar" className={styles.tryAgainBar}>
      <CTAButton
        onClick={() => {
          router.push(`/student/tasks/${module.module_version_id}/${task.id}`);
        }}
        text="Pass one more time"
      />
    </div>
  );
};
