import styles from './LoadingView.module.scss';
import { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation';
import FocusTrap from 'focus-trap-react';
import { useIsLoading } from '../../../lib/hooks/loadingContext';
import { useRouter } from 'next/router';

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
          {isLoading && <button className={styles.trapButton} aria-hidden />}
          <LoadingAnimation />
        </div>
      </FocusTrap>
      {children}
    </>
  );
};
