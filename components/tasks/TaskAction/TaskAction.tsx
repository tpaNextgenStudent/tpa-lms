import { Task } from '../../../lib/mocks';
import { CodeAction } from '../CodeAction/CodeAction';
import { ImageAction } from '../ImageAction/ImageAction';
import { QuizAction } from '../QuizAction/QuizAction';
import { InfoAction } from '../InfoAction/InfoAction';

interface TaskActionProps {
  task: Task;
}

export const TaskAction = ({ task }: TaskActionProps) => {
  switch (task.type) {
    case 'code':
      return <CodeAction />;
    case 'image':
      return <ImageAction />;
    case 'quiz':
      return <QuizAction />;
    case 'info':
      return <InfoAction />;
  }
};
