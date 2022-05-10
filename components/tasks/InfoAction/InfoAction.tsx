import styles from './InfoAction.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { TaskType } from '../../../lib/types';
import { SizedHTMLElement } from '../../../lib/hooks/useElementSize';

interface InfoActionProps {
  task: {
    id: string;
    name: string;
    type: TaskType;
    description: string;
    link: string | null;
  };
  sizeRef?: (element: SizedHTMLElement) => void;
}

export const InfoAction = ({ sizeRef }: InfoActionProps) => {
  return (
    <div ref={sizeRef} data-cypress="InfoAction" className={styles.wrapper}>
      <CTAButton text="Mark as read" />
    </div>
  );
};
