import styles from './TaskAction.module.scss';
import { Task } from '../../../lib/mocks';
import { CodeAction } from '../CodeAction/CodeAction';
import { ImageAction } from '../ImageAction/ImageAction';
import { QuizAction } from '../QuizAction/QuizAction';
import { InfoAction } from '../InfoAction/InfoAction';

interface TaskActionProps {
  task: Task;
}

export const TaskAction = ({ task }: TaskActionProps) => {
  return (
    <div className={styles.wrapper}>
      {task.type === 'code' && <CodeAction />}
      {task.type === 'image' && <ImageAction />}
      {task.type === 'quiz' && <QuizAction />}
      {task.type === 'info' && <InfoAction />}
    </div>
  );
};
