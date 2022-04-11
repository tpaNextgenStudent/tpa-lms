import { ReactNode } from 'react';
import styles from './TableGridWrapper.module.scss';
import clsx from 'clsx';

interface TableGridWrapperProps {
  children: ReactNode;
  className?: string;
  columns: (string | number | undefined)[];
}

export const TableGridWrapper = ({
  children,
  className,
  columns,
}: TableGridWrapperProps) => {
  const gridTemplateColumns = columns
    .map(v => (typeof v === 'number' ? `${v}px` : v))
    .join(' ');
  return (
    <div
      style={{ gridTemplateColumns }}
      className={clsx(styles.gridWrapper, className)}
    >
      {children}
    </div>
  );
};
