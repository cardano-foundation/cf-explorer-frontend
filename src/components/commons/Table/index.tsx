import React, { ReactNode, useState, useEffect } from "react";
import { Pagination, PaginationProps, Select, Skeleton } from "antd";

import { handleClicktWithoutAnchor, numberWithCommas } from "../../../commons/utils/helper";

import noData from "../../../commons/resources/images/noData.png";

import styles from "./index.module.scss";
import { useWindowSize } from "react-use";
import { ArrowDropDownIcon } from "../../../commons/resources";
import { useHistory } from "react-router-dom";

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
  pagination?: PaginationProps;
  allowSelect?: boolean;
  onClickRow?: (e: React.MouseEvent, record: T, index: number) => void;
  scrollTop?: boolean;
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

const FooterTable: React.FC<FooterTableProps> = ({ total, pagination }) => {
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10);
  const { width } = useWindowSize();

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
    <div className={styles.footer} style={{ justifyContent: total && width > 800 ? "space-between" : "center" }}>
      {total && width > 800 && (
        <div className={styles.total}>
          {total.title}: <span className={styles.totalNumber}>{numberWithCommas(total.count)}</span>
        </div>
      )}
      {pagination && (
        <div style={{ display: "flex", alignItems: "center", textAlign: "left" }}>
          {pagination.pageSizeOptions && width > 800 && (
            <div className={styles.total}>
              Rows per page:
              <Select
                options={pagination.pageSizeOptions.map(page => ({
                  label: page,
                  value: page,
                }))}
                suffixIcon={<img src={ArrowDropDownIcon} alt="" className={styles.selectIcon} />}
                className={styles.selectPageSize}
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
            className={`${styles.pagitation} ${pagination.className || ""}`}
            itemRender={(page, type, originalElement) => renderPagination(page, type, originalElement)}
            pageSize={pageSize}
            showTotal={width > 800 ? pagination.showTotal : undefined}
          />
        </div>
      )}
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
  scrollTop = true,
}) => {

  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      scrollTop && window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

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
