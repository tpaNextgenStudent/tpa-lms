import styles from './Toast.module.scss';
import CrossIcon from '../../../public/svg/cross-icon.svg';

interface ToastProps {
  message: string;
  onCloseClick: () => void;
}

export const Toast = ({ message, onCloseClick }: ToastProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
      <button onClick={onCloseClick} className={styles.closeButton}>
        <CrossIcon />
      </button>
    </div>
  );
};
