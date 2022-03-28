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
    <article className={styles.wrapper}>
      <div className={styles.content}>
        {locked ? (
          <LockedTaskInfo content="There will be a copy that inform users to finish previous task to unlock this one" />
        ) : (
          <MarkdownContent content={description} />
        )}
      </div>
    </article>
  );
};
