import styles from './TaskAction.module.scss';
import { Task } from '../../../lib/mocks';
import { CodeAction } from '../CodeAction/CodeAction';
import { ImageAction } from '../ImageAction/ImageAction';

interface TaskActionProps {
  task: Task;
}

export const TaskAction = ({ task }: TaskActionProps) => {
  return (
    <div className={styles.wrapper}>
      {task.type === 'code' && <CodeAction />}
      {task.type === 'image' && <ImageAction />}
    </div>
  );
};
