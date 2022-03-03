import styles from './TaskSection.module.scss';
import { Module, Task, UserTask } from '../../../lib/mocks';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';

interface TaskSectionProps {
  task: UserTask & { task: Task };
  module: Module;
}

export const TaskSection = ({
  task: { task, status },
  module,
}: TaskSectionProps) => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.taskHeader}>
        <span className={styles.taskTitleIcon} aria-hidden={true} />
        <h2 className={styles.taskTitle}>{task.name}</h2>
        <span className={styles.taskModule}>{module.name}</span>
        <button className={styles.fullScreenButton}>full</button>
      </div>
      <div className={styles.taskBadges}>
        <span className={styles.taskBadge}>{status}</span>
        <span className={styles.taskBadge}>{task.type}</span>
      </div>
      <TaskDescription description={task.description} />
      <TaskAction task={task} />
    </main>
  );
};
