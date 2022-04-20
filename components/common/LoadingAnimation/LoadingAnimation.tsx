import styles from './LoadingAnimation.module.scss';

interface LoadingAnimationProps {
  size?: number;
}

export const LoadingAnimation = ({ size = 96 }: LoadingAnimationProps) => {
  return (
    <span
      className={styles.loading}
      style={{ ['--size' as string]: `${size}px` }}
      aria-label="loading..."
    />
  );
};
