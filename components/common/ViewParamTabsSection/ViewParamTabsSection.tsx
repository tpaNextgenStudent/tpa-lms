import styles from './ViewParamTabsSection.module.scss';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { capitalize } from '../../../lib/utils/capitalize';

interface TabsSectionProps {
  tabs: { [label: string]: ReactNode };
}

export const ViewParamTabsSection = ({ tabs }: TabsSectionProps) => {
  const router = useRouter();
  const viewParam = router.query.view as string | undefined;

  const [defaultLabel, defaultComponent] = useMemo(
    () => Object.entries(tabs)[0],
    [tabs]
  );

  useEffect(() => {
    //when view param is invalid redirect to default view
    if (viewParam && !Object.keys(tabs).includes(viewParam)) {
      const { view: _, ...prevQuery } = router.query;
      router.push(
        {
          pathname: router.pathname,
          query: prevQuery,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router, tabs, viewParam]);

  const CurrentComponent = useMemo(
    () => (viewParam ? tabs[viewParam] : defaultComponent),
    [viewParam, tabs, defaultComponent]
  );

  const updateViewParam = useCallback(
    (view: keyof typeof tabs | null) => {
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
    },
    [router]
  );

  return (
    <div>
      <div data-cypress="ViewParamTabsSection" className={styles.taskNav}>
        {Object.keys(tabs).map(label => {
          return (
            <button
              key={label}
              onClick={() =>
                updateViewParam(label !== defaultLabel ? label : null)
              }
              className={clsx(
                styles.taskNavButton,
                label === (router.query.view || defaultLabel) &&
                  styles.taskNavButtonActive
              )}
            >
              {capitalize(label)}
            </button>
          );
        })}
      </div>
      {CurrentComponent}
    </div>
  );
};
