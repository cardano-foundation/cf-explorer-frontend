import React, { ReactNode, useState } from "react";
import { TablePagination, Skeleton } from "@mui/material";

import { handleClicktWithoutAnchor, numberWithCommas } from "../../../commons/utils/helper";

import noData from "../../../commons/resources/images/noData.png";

import styles from "./index.module.scss";
import { useWindowSize } from "react-use";

export const EmptyRecord = () => (
  <div className={styles.noData}>
    <img src={noData} alt="no data" />
  </div>
);
interface ColumnType {
  [key: string | number | symbol]: any;
}
export interface Column<T extends ColumnType = any> {
  key: string;
  title?: string;
  minWidth?: string;
  render?: (data: T, index: number) => ReactNode;
}

type TableHeaderProps<T extends ColumnType> = Pick<TableProps<T>, "columns">;

type TableRowProps<T extends ColumnType> = Pick<TableProps, "columns"> & {
  row: T;
  index: number;
  onClickRow?: (e: React.MouseEvent, record: T, index: number) => void;
};
interface TableProps<T extends ColumnType = any> {
  columns: Column<T>[];
  data?: T[];
  className?: string;
  loading?: boolean;
  initialized?: boolean;
  total?: {
    count: number;
    title: string;
  };
  pagination?: {
    onChange?: (page: number, size: number) => void;
    page?: number;
    size?: number;
    total?: number;
  };
  allowSelect?: boolean;
  onClickRow?: (e: React.MouseEvent, record: T, index: number) => void;
}
interface FooterTableProps {
  total: TableProps["total"];
  pagination: TableProps["pagination"];
}

const TableHeader = <T extends ColumnType>({ columns }: TableHeaderProps<T>) => {
  return (
    <thead className={styles.headerRow}>
      <tr>
        {columns.map((column, idx) => (
          <th className={styles.header} key={idx}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRow = <T extends ColumnType>({ row, columns, index, onClickRow }: TableRowProps<T>) => {
  return (
    <tr className={styles.bodyRow} onClick={e => handleClicktWithoutAnchor(e, () => onClickRow?.(e, row, index))}>
      {columns.map((column, idx) => {
        return (
          <td
            className={styles.col}
            key={idx}
            style={{
              minWidth: column.minWidth ? column.minWidth : "max-content",
            }}
          >
            {column.render ? column.render(row, index) : row[column.key]}
          </td>
        );
      })}
    </tr>
  );
};

const TableBody = <T extends ColumnType>({ data, columns, onClickRow }: TableProps<T>) => {
  return (
    <tbody className={styles.tableBody}>
      {data &&
        data.map((row, index) => (
          <TableRow row={row} key={index} columns={columns} index={index} onClickRow={onClickRow} />
        ))}
    </tbody>
  );
};

const TableSekeleton = <T extends ColumnType>({ columns }: TableProps<T>) => {
  return (
    <tbody className={styles.tableBody}>
      {[...Array(10)].map((_, i) => {
        return (
          <tr key={i} className={styles.bodyRow}>
            {columns.map((column, idx) => {
              return (
                <td
                  className={styles.col}
                  key={idx}
                  style={{
                    minWidth: column.minWidth ? column.minWidth : "max-content",
                    padding: "0",
                    height: "75px",
                    overflow: "hidden",
                  }}
                >
                  <Skeleton variant="rectangular" style={{ height: "75px" }} animation="wave" />
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

const FooterTable: React.FC<FooterTableProps> = ({ total, pagination }) => {
  const { width } = useWindowSize();
  const [page, setPage] = useState(pagination?.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(pagination?.size || 10);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    pagination && pagination.onChange && pagination.onChange(page + 1, rowsPerPage);
    setPage(page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    pagination && pagination.onChange && pagination.onChange(1, parseInt(event.target.value, 10));
  };
  return (
    <div className={styles.footer} style={{ justifyContent: total && width > 800 ? "space-between" : "center" }}>
      {total && width > 800 && (
        <div className={styles.total}>
          {total.title}: <span className={styles.totalNumber}>{numberWithCommas(total.count)}</span>
        </div>
      )}
      <div>
        {pagination && (
          <TablePagination
            component="div"
            count={pagination.total || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiToolbar-root": {
                alignItems: "baseline",
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  total,
  pagination,
  className,
  loading,
  initialized = true,
  onClickRow,
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHeader columns={columns} />
          {!initialized && loading ? (
            <TableSekeleton columns={columns} />
          ) : (
            <TableBody columns={columns} data={data} onClickRow={onClickRow} />
          )}
        </table>
        {!initialized && !loading && data && data.length === 0 && <EmptyRecord />}
      </div>
      <FooterTable total={total} pagination={pagination} />
    </div>
  );
};

export default Table;
