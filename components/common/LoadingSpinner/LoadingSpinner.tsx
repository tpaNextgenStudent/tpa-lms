import styles from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
  return (
    <div>
      <div className={styles.loadingWrapper} aria-hidden>
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};
