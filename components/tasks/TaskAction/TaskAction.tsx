import { CodeAction } from '../CodeAction/CodeAction';
import { InfoAction } from '../InfoAction/InfoAction';
import { TaskStatus, TaskType } from '../../../lib/types';
import { ITask } from '../../../apiHelpers/tasks';

interface TaskActionProps {
  type: TaskType;
  github_link?: string;
  sizeRef?: (element: HTMLElement | null) => void;
}

export const TaskAction = ({ type, github_link, sizeRef }: TaskActionProps) => {
  switch (type) {
    case 'code':
      return github_link ? (
        <CodeAction sizeRef={sizeRef} github_link={github_link} />
      ) : null;
    case 'info':
      return <InfoAction sizeRef={sizeRef} />;
    default:
      return null;
  }
};
