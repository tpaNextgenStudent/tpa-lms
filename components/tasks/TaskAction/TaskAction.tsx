import { CodeAction } from '../CodeAction/CodeAction';
import { InfoAction } from '../InfoAction/InfoAction';
import { TaskType } from '../../../lib/utils/types';

interface TaskActionProps {
  type: TaskType;
}

const TASK_TYPES = {
  CODE: 'code',
  IMAGE: 'image',
  QUIZ: 'quiz',
  INFO: 'info',
};

export const TaskAction = ({ type }: TaskActionProps) => {
  switch (type) {
    case TASK_TYPES.CODE:
      return <CodeAction />;
    case TASK_TYPES.INFO:
      return <InfoAction />;
    default:
      return null;
  }
};
