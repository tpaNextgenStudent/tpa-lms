import styles from './TaskSectionHeader.module.scss';
import ShrinkIcon from '../../../public/svg/shrink-icon.svg';
import EnlargeIcon from '../../../public/svg/enlarge-icon.svg';
import { ITask } from '../../../apiHelpers/tasks';

interface TaskSectionHeaderProps {
  task: ITask['task_data'];
  isFullScreenMode: boolean;
  toggleFullScreenMode: () => void;
}

export const TaskSectionHeader = ({
  task,
  toggleFullScreenMode,
  isFullScreenMode,
}: TaskSectionHeaderProps) => {
  const taskPosition = `${task.position}`.padStart(2, '0');

  return (
    <div className={styles.taskHeader}>
      <h2 data-cypress="TaskSectionTaskTitle" className={styles.taskTitle}>
        <span className={styles.taskTitlePosition}>{taskPosition}</span>
        <span className={styles.taskTitleName}>{task.name}</span>
      </h2>
      <button
        data-cypress="TaskSectionFullScreenButton"
        onClick={toggleFullScreenMode}
        className={styles.fullScreenButton}
        aria-label="Toggle FullScreen"
      >
        {isFullScreenMode ? <ShrinkIcon /> : <EnlargeIcon />}
      </button>
    </div>
  );
};
