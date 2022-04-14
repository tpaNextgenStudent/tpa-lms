import styles from './InfoAction.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';

interface InfoActionProps {}

export const InfoAction = ({}: InfoActionProps) => {
  return (
    <div data-cypress="InfoAction" className={styles.wrapper}>
      <CTAButton text="Mark as read" />
    </div>
  );
};
