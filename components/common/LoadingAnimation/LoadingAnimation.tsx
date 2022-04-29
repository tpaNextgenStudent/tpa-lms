import styles from './LoadingAnimation.module.scss';
import TpaTextIcon from '../../../public/svg/tpa-text-icon.svg';

interface LoadingAnimationProps {
  size?: number;
}

export const LoadingAnimation = ({ size = 96 }: LoadingAnimationProps) => {
  return (
    <span
      className={styles.loading}
      style={{ ['--size' as string]: `${size}px` }}
      aria-label="loading..."
    >
      <span className={styles.tpa} aria-hidden>
        <TpaTextIcon />
      </span>
    </span>
  );
};
