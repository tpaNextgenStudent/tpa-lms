import styles from './TaskDescription.module.scss';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';

interface TaskDescriptionProps {
  description: string;
}

export const TaskDescription = ({ description }: TaskDescriptionProps) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.content}>
        <MarkdownContent content={description} />
      </div>
    </article>
  );
};
