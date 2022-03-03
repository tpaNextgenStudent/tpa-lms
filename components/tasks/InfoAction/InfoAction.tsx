import styles from './InfoAction.module.scss';

interface InfoActionProps {}

export const InfoAction = ({}: InfoActionProps) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>Mark as read</button>
    </div>
  );
};
