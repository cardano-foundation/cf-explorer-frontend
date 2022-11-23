import React, { ReactNode, useState } from "react";
import { Pagination, PaginationProps, Select, Skeleton } from "antd";

import { numberWithCommas } from "../../../commons/utils/helper";

import noData from "../../../commons/resources/images/noData.png";

import styles from "./index.module.scss";

export const EmptyRecord = () => (
  <div className={styles.noData}>
    <img src={noData} alt="no data" />
  </div>
);
interface ColumnType {
  [key: string | number | symbol]: any;
}

type TableRowProps<T extends ColumnType> = Pick<TableProps, "columns"> & {
  row: T;
  index: number;
  onClickRow?: (e: React.MouseEvent, record: T, index: number) => void;
};

type TableHeaderProps<T extends ColumnType> = Pick<TableProps<T>, "columns">;

interface TableProps<T extends ColumnType = any> {
  columns: Column<T>[];
  data?: T[];
  className?: string;
  loading?: boolean;
  total?: {
    count: number;
    title: string;
  };
  pagination?: PaginationProps;
  allowSelect?: boolean;
  onClickRow?: (e: React.MouseEvent, record: T, index: number) => void;
}

export interface Column<T extends ColumnType = any> {
  key: string;
  title?: string;
  minWidth?: string;
  render?: (data: T, index: number) => ReactNode;
}
interface FooterTableProps {
  total: TableProps["total"];
  pagination: TableProps["pagination"];
}

const Table: React.FC<TableProps> = ({ columns, data, total, pagination, className, loading, onClickRow }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHeader columns={columns} />
          {!loading && <TableBody columns={columns} data={data} onClickRow={onClickRow} />}
          {loading && <TableSekeleton columns={columns} />}
        </table>
        {!loading && data && data.length === 0 && <EmptyRecord />}
      </div>
      <FooterTable total={total} pagination={pagination} />
    </div>
  );
};

export default Table;

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

const TableRow = <T extends ColumnType>({ row, columns, index, onClickRow }: TableRowProps<T>) => {
  return (
    <tr className={styles.bodyRow} onClick={e => onClickRow?.(e, row, index)}>
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

const FooterTable: React.FC<FooterTableProps> = ({ total, pagination }) => {
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10);
  const renderPagination = (
    current: number,
    type: "prev" | "next" | "page" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return <span> {`<`} </span>;
    }
    if (type === "next") {
      return <span> {`>`} </span>;
    }
    return originalElement;
  };

  return (
    <div className={styles.footer} style={{ justifyContent: total ? "space-between" : "flex-end" }}>
      {total && (
        <div className={styles.total}>
          {total.title}: <span className={styles.fwBold}>{numberWithCommas(total.count)}</span>
        </div>
      )}
      {pagination && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {pagination.pageSizeOptions && (
            <div className={styles.total}>
              Rows per page:
              <Select
                options={pagination.pageSizeOptions.map(page => ({
                  label: page,
                  value: page,
                }))}
                style={{ border: "none", fontWeight: 700 }}
                value={pageSize}
                bordered={false}
                onChange={value => {
                  setPageSize(value);
                  pagination.onChange && pagination.onChange(1, value);
                }}
              />
            </div>
          )}
          <Pagination
            {...pagination}
            showSizeChanger={false}
            itemRender={(page, type, originalElement) => renderPagination(page, type, originalElement)}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
};

const TableSekeleton = <T extends ColumnType>({ columns }: TableProps<T>) => {
  return (
    <tbody className={styles.tableBody}>
      {[...Array(10)].map((_i, ii) => {
        return (
          <tr key={ii} className={styles.bodyRow}>
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
                  <Skeleton.Input size="large" style={{ height: "75px" }} active block />
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
