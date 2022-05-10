import styles from './TaskDescription.module.scss';
import { MarkdownContent } from '../../common/markdown/MarkdownContent/MarkdownContent';
import { LockedTaskInfo } from '../LockedTaskInfo/LockedTaskInfo';

interface TaskDescriptionProps {
  description: string;
  locked?: boolean;
  answer?: string | null;
  paddingBottom?: number;
}

export const TaskDescription = ({
  description,
  locked,
  answer,
  paddingBottom,
}: TaskDescriptionProps) => {
  const content = answer
    ? `## Github link:\n${answer}\n${description}`
    : description;
  return (
    <article
      data-cypress="TaskDescription"
      style={{ paddingBottom: `${(paddingBottom || 0) + 48}px` }}
      className={styles.wrapper}
    >
      <div className={styles.content}>
        {locked ? (
          <LockedTaskInfo content="Finish previous task to unlock this content!" />
        ) : (
          <MarkdownContent content={content} />
        )}
      </div>
    </article>
  );
};
