import styles from './LoadingView.module.scss';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation';
import FocusTrap from 'focus-trap-react';

interface LoadingViewProps {
  children: ReactNode;
  isLoading: boolean;
}

export const LoadingView = ({ children, isLoading }: LoadingViewProps) => {
  return (
    <>
      <FocusTrap active={isLoading}>
        <div
          className={clsx(styles.wrapper, isLoading && styles.wrapperLoading)}
        >
          <button className={styles.trapButton} aria-hidden={'true'} />
          <LoadingAnimation />
        </div>
      </FocusTrap>
      {children}
    </>
  );
};
