import styles from './Table.module.scss';
import { Column, useTable } from 'react-table';
import clsx from 'clsx';

interface TableProps<T extends {}> {
  data: T[];
  columns: Column<T>[];
  isFullWidth?: boolean;
}

export const Table = <T extends {}>({
  data,
  columns,
  isFullWidth,
}: TableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({ columns, data });

  return (
    <main className={styles.wrapper}>
      <table
        className={clsx(styles.table, isFullWidth && styles.tableFullWidth)}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map(headerGroup => {
            const { key, ...headerProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerProps}>
                {headerGroup.headers.map(column => {
                  const { key, ...columnHeaderProps } = column.getHeaderProps();
                  return (
                    <th
                      style={{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                      className={styles.tableHead}
                      key={key}
                      {...columnHeaderProps}
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <tr className={styles.tableRow} key={key} {...rowProps}>
                {row.cells.map(cell => {
                  const { key, ...cellProps } = cell.getCellProps();
                  return (
                    <td className={styles.tableCell} key={key} {...cellProps}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
