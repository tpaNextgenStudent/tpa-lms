import { CodeAction } from '../CodeAction/CodeAction';
import { InfoAction } from '../InfoAction/InfoAction';
import { ITask } from '../../../api/tasks';

interface TaskActionProps {
  task: ITask;
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
    case TASK_TYPES.INFO:
      return <InfoAction />;
    default:
      return null;
  }
};
