import { CodeAction } from '../CodeAction/CodeAction';
import { InfoAction } from '../InfoAction/InfoAction';
import { TaskType } from '../../../lib/utils/types';

interface TaskActionProps {
  task: {
    id: string;
    name: string;
    type: TaskType;
    description: string;
    link: string | null;
  };
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
      return <CodeAction task={task} />;
    case TASK_TYPES.INFO:
      return <InfoAction task={task} />;
    default:
      return null;
  }
};
