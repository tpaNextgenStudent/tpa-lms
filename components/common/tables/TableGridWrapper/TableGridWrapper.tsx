import { ReactNode } from 'react';
import styles from './TableGridWrapper.module.scss';
import clsx from 'clsx';

interface TableGridWrapperProps {
  children: ReactNode;
  className?: string;
  columns: (string | number | undefined)[];
  colGap?: number;
}

export const TableGridWrapper = ({
  children,
  className,
  columns,
  colGap = 32,
}: TableGridWrapperProps) => {
  const gridTemplateColumns = columns
    .map(v => (typeof v === 'number' ? `${v}px` : v))
    .join(' ');
  return (
    <div
      style={{ gridTemplateColumns, ['--gap' as string]: `${colGap}px` }}
      className={clsx(styles.gridWrapper, className)}
    >
      {children}
    </div>
  );
};
