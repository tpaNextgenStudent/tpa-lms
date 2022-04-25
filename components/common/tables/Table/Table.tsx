import styles from './Table.module.scss';
import { Column, useTable } from 'react-table';
import clsx from 'clsx';
import { TableGridWrapper } from '../TableGridWrapper/TableGridWrapper';

interface TableProps<T extends {}> {
  data: T[];
  columns: Column<T>[];
  isFullWidth?: boolean;
  colGap?: number;
  className?: string;
  id?: string;
}

export const Table = <T extends {}>({
  data,
  columns,
  isFullWidth,
  colGap,
  className,
  id,
}: TableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({ columns, data });

  const gridTemplateCols = headerGroups[0].headers.map(({ width }) => width);

  return (
    <main
      data-cypress="Table"
      id={id}
      className={clsx(styles.wrapper, className)}
    >
      <div
        className={clsx(styles.table, isFullWidth && styles.tableFullWidth)}
        {...getTableProps()}
      >
        <div>
          {headerGroups.map(headerGroup => {
            const { key, ...headerProps } = headerGroup.getHeaderGroupProps();
            return (
              <div key={key} {...headerProps}>
                <TableGridWrapper
                  colGap={colGap}
                  className={styles.headRow}
                  columns={gridTemplateCols}
                >
                  {headerGroup.headers.map(column => {
                    const { key, ...columnHeaderProps } =
                      column.getHeaderProps();
                    return (
                      <div
                        data-cypress="TableHead"
                        style={{
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                        className={styles.tableHead}
                        key={key}
                        {...columnHeaderProps}
                      >
                        {column.render('Header')}
                      </div>
                    );
                  })}
                </TableGridWrapper>
              </div>
            );
          })}
        </div>
        <div {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <div
                data-cypress="TableRow"
                className={styles.tableRowWrapper}
                key={key}
                {...rowProps}
              >
                <TableGridWrapper
                  colGap={colGap}
                  className={styles.tableRow}
                  columns={gridTemplateCols}
                >
                  {row.cells.map(cell => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <div
                        className={styles.tableCell}
                        key={key}
                        {...cellProps}
                      >
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </TableGridWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
