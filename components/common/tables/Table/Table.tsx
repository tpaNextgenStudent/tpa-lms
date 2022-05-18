import styles from './Table.module.scss';
import { Column, useTable } from 'react-table';
import clsx from 'clsx';

interface TableProps<T extends {}> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  id?: string;
}

export const Table = <T extends {}>({
  data,
  columns,
  className,
  id,
}: TableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({ columns, data });

  return (
    <main
      data-cypress="Table"
      id={id}
      className={clsx(styles.wrapper, className)}
    >
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => {
            const { key, ...headerProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerProps}>
                {headerGroup.headers.map(column => {
                  const { key, ...columnHeaderProps } = column.getHeaderProps();
                  return (
                    <th
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
              <tr
                data-cypress="TableRow"
                className={styles.tableRowWrapper}
                key={key}
                {...rowProps}
              >
                {row.cells.map(cell => {
                  const { key, ...cellProps } = cell.getCellProps();
                  console.log(cell.column.width);
                  return (
                    <td
                      className={styles.tableCell}
                      key={key}
                      style={{
                        minWidth: cell.column.minWidth,
                        maxWidth: cell.column.maxWidth,
                      }}
                      {...cellProps}
                    >
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
