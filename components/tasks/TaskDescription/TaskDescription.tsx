import styles from './TaskDescription.module.scss';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import { LockedTaskInfo } from '../LockedTaskInfo/LockedTaskInfo';

interface TaskDescriptionProps {
  description: string;
  locked?: boolean;
}

export const TaskDescription = ({
  description,
  locked,
}: TaskDescriptionProps) => {
  return (
    <article data-cypress="TaskDescription" className={styles.wrapper}>
      <div className={styles.content}>
        {locked ? (
          <LockedTaskInfo content="Finish previous task to unlock this content!" />
        ) : (
          <MarkdownContent content={description} />
        )}
      </div>
    </article>
  );
};
