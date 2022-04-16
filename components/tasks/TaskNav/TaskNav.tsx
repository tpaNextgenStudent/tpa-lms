import styles from './TaskNav.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface TaskNavProps {}

export const TaskNav = ({}: TaskNavProps) => {
  const router = useRouter();

  const changeViewParam = (view: 'comments' | null) => {
    const { view: _, ...prevQuery } = router.query;
    const newQuery = Object.assign(prevQuery, view ? { view } : {});
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const isCommentsView = router.query.view === 'comments';

  return (
    <div data-cypress="TaskNav" className={styles.taskNav}>
      <button
        data-cypress="TaskNavDescription"
        onClick={() => {
          changeViewParam(null);
        }}
        className={clsx(
          styles.taskNavButton,
          !isCommentsView && styles.taskNavButtonActive
        )}
      >
        Description
      </button>
      <button
        data-cypress="TaskNavComments"
        onClick={() => {
          changeViewParam('comments');
        }}
        className={clsx(
          styles.taskNavButton,
          isCommentsView && styles.taskNavButtonActive
        )}
      >
        Comments
      </button>
    </div>
  );
};
