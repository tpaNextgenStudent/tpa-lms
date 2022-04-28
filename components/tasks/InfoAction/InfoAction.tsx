import styles from './InfoAction.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { TaskType } from '../../../lib/types';

interface InfoActionProps {
  task: {
    id: string;
    name: string;
    type: TaskType;
    description: string;
    link: string | null;
  };
}

export const InfoAction = ({}: InfoActionProps) => {
  return (
    <div data-cypress="InfoAction" className={styles.wrapper}>
      <CTAButton text="Mark as read" />
    </div>
  );
};
