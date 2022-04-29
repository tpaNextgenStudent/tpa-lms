import { TaskType } from '../../../lib/utils/types';
import InfoTypeIcon from '../../../public/svg/info-type-icon.svg';
import CodeTypeIcon from '../../../public/svg/code-type-icon.svg';

export const TaskTypeIcon = ({ type }: { type: TaskType }) => {
  switch (type) {
    case 'info':
      return <InfoTypeIcon />;
    case 'code':
      return <CodeTypeIcon />;
    default:
      return null;
  }
};
