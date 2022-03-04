import styles from './TaskSection.module.scss';
import { Module, Task, UserTask } from '../../../lib/mocks';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';
import { useState } from 'react';
import { TaskNav } from '../TaskNav/TaskNav';
import EnlargeIcon from '../../../public/enlarge-icon.svg';

interface TaskSectionProps {
  task: UserTask & { task: Task };
  module: Module;
}

export const TaskSection = ({
  task: { task, status },
  module,
}: TaskSectionProps) => {
  const [isDescriptionView, setIsDescriptionView] = useState(true);
  return (
    <main className={styles.wrapper}>
      <div className={styles.taskHeader}>
        <h2 className={styles.taskTitle}>{task.name}</h2>
        <span className={styles.taskModule}>{module.name}</span>
        <button className={styles.fullScreenButton} aria-hidden>
          <EnlargeIcon />
        </button>
      </div>
      <div className={styles.taskBadges}>
        <span className={styles.taskBadge}>{status}</span>
        <span className={styles.taskBadge}>{task.type}</span>
      </div>
      <TaskNav
        setIsDescriptionView={setIsDescriptionView}
        isDescriptionView={isDescriptionView}
      />
      {isDescriptionView ? (
        <TaskDescription description={task.description} />
      ) : (
        <TaskDescription description={'information'} />
      )}
      <TaskAction task={task} />
    </main>
  );
};
