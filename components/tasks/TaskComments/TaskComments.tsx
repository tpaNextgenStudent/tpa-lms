import styles from './TaskComments.module.scss';

interface TaskCommentsProps {}

export const TaskComments = ({}: TaskCommentsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p>comments here</p>
      </div>
    </div>
  );
};
