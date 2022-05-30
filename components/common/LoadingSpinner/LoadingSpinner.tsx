import styles from './LoadingSpinner.module.scss';
import clsx from 'clsx';
import { CTAButton } from '../CTAButton/CTAButton';

interface LoadingSpinnerProps {
  className?: string;
  isLoading: boolean;
  refetch: () => void;
  label?: string;
}

export const LoadingSpinner = ({
  className,
  isLoading,
  refetch,
  label,
}: LoadingSpinnerProps) => {
  return (
    <div className={clsx(styles.loadingWrapper, className)}>
      {isLoading ? (
        <>
          <div className={styles.loading} aria-hidden>
            <span className={styles.blob} />
            <span className={styles.blob} />
            <span className={styles.blob} />
          </div>
          <p className={styles.text}>Loading...</p>
        </>
      ) : (
        <>
          <p>Error while fetching {label || 'data'}</p>
          <CTAButton
            text="Try again"
            className={styles.button}
            onClick={refetch}
          />
        </>
      )}
    </div>
  );
};
