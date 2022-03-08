import { Column, useTable } from 'react-table';
import Link from 'next/link';
import styles from './StudentScoresTable.module.scss';
import ArrowRightIcon from '../../../public/arrow-right.svg';

interface TableData {
  submission_date: string;
  review_date: string;
  module: string;
  task: string;
  task_type: string;
  attempts: number;
  score: number;
  reviewed_by: { name: string; img: string };
  view: { link: string };
}

const columns: Column<TableData>[] = [
  {
    Header: 'Date of submission',
    accessor: 'submission_date',
  },
  {
    Header: 'Date of review',
    accessor: 'review_date',
  },
  {
    Header: 'Module',
    accessor: 'module',
  },
  {
    Header: 'Task',
    accessor: 'task',
  },
  {
    Header: 'Task type',
    accessor: 'task_type',

    Cell: ({ cell: { value } }: { cell: { value: string } }) => (
      <span className={styles.taskTypeWrapper}>{value}</span>
    ),
  },
  {
    Header: 'Attempts',
    accessor: 'attempts',
  },
  {
    Header: 'Score',
    accessor: 'score',
  },
  {
    Header: 'Reviewed by',
    accessor: 'reviewed_by',

    Cell: ({
      cell: { value },
    }: {
      cell: { value: { name: string; img: string } };
    }) => (
      <div className={styles.teacherCellWrapper}>
        <img className={styles.teacherImg} src={value.img} alt={value.name} />
        <span className={styles.teacherName}>{value.name}</span>
      </div>
    ),
  },
  {
    Header: '',
    accessor: 'view',

    Cell: ({ cell: { value } }: { cell: { value: { link: string } } }) => (
      <Link href={value.link}>
        <a className={styles.viewLink}>
          <span>View</span>
          <span className={styles.viewLinkArrow}>
            <ArrowRightIcon />
          </span>
        </a>
      </Link>
    ),
  },
];

interface StudentScoresTableProps {
  data: TableData[];
}

export const StudentScoresTable = ({ data }: StudentScoresTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TableData>({ columns, data });

  return (
    <main className={styles.wrapper}>
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
