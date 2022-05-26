import styles from './InfoAction.module.scss';
import { CTAButton } from '../../common/CTAButton/CTAButton';
import { TaskStatus, TaskType } from '../../../lib/types';
import { useIsLoading } from '../../../lib/hooks/loadingContext';
import { postMarkTaskAsRead } from '../../../apiHelpers/assess';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ITask } from '../../../apiHelpers/tasks';

interface InfoActionProps {
  sizeRef?: (element: HTMLElement | null) => void;
}

export const InfoAction = ({ sizeRef }: InfoActionProps) => {
  const { setIsLoading } = useIsLoading();
  const router = useRouter();
  const attemptId = router.query.task as string;

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await postMarkTaskAsRead(attemptId);
      toast('Task was marked as read.', { type: 'success' });
      await router.push('/student/tasks');
    } catch (e) {
      toast('There was an error while marking this task as read.', {
        type: 'error',
      });
    }
    setIsLoading(false);
  };

  return (
    <div ref={sizeRef} data-cypress="InfoAction" className={styles.wrapper}>
      <CTAButton onClick={handleClick} text="Mark as read" />
    </div>
  );
};
