import styles from './TaskDescription.module.scss';

interface TaskDescriptionProps {
  description: string;
}

export const TaskDescription = ({ description }: TaskDescriptionProps) => {
  return (
    <article className={styles.wrapper}>
      <h3 className={styles.title}>Description</h3>
      <div className={styles.content}>{description}</div>
    </article>
  );
};
