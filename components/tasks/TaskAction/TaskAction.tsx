import { CodeAction } from '../CodeAction/CodeAction';
import { InfoAction } from '../InfoAction/InfoAction';
import { TaskType } from '../../../lib/types';
import { SizedHTMLElement } from '../../../lib/hooks/useElementSize';

interface TaskActionProps {
  task: {
    id: string;
    name: string;
    type: TaskType;
    description: string;
    link: string | null;
  };
  sizeRef?: (element: SizedHTMLElement) => void;
}

const TASK_TYPES = {
  CODE: 'code',
  IMAGE: 'image',
  QUIZ: 'quiz',
  INFO: 'info',
};

export const TaskAction = ({ task, sizeRef }: TaskActionProps) => {
  switch (task.type) {
    case TASK_TYPES.CODE:
      return <CodeAction sizeRef={sizeRef} task={task} />;
    case TASK_TYPES.INFO:
      return <InfoAction sizeRef={sizeRef} task={task} />;
    default:
      return null;
  }
};
