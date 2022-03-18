import { Task } from '../../../lib/utils/types';
import { CodeAction } from '../CodeAction/CodeAction';
import { ImageAction } from '../ImageAction/ImageAction';
import { QuizAction } from '../QuizAction/QuizAction';
import { InfoAction } from '../InfoAction/InfoAction';

interface TaskActionProps {
  task: Task;
}

const TASK_TYPES = {
  CODE: 'code',
  IMAGE: 'image',
  QUIZ: 'quiz',
  INFO: 'info',
};

export const TaskAction = ({ task }: TaskActionProps) => {
  switch (task.type) {
    case TASK_TYPES.CODE:
      return <CodeAction />;
    case TASK_TYPES.IMAGE:
      return <ImageAction />;
    case TASK_TYPES.QUIZ:
      return <QuizAction />;
    case TASK_TYPES.INFO:
      return <InfoAction />;
    default:
      return null;
  }
};
