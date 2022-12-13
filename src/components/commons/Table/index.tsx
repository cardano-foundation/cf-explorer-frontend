import React, { useState } from "react";
import { TablePagination, Skeleton, Box } from "@mui/material";

import { handleClicktWithoutAnchor, numberWithCommas } from "../../../commons/utils/helper";

import { EmptyIcon } from "../../../commons/resources";
import {
  Empty,
  EmtyImage,
  TBody,
  TCol,
  TFooter,
  THead,
  THeader,
  TRow,
  Total,
  TotalNumber,
  Wrapper,
  TableFullWidth,
  Error,
} from "./styles";
import { ColumnType, FooterTableProps, TableHeaderProps, TableProps, TableRowProps } from "../../../types/table";

export const EmptyRecord = () => (
  <Empty>
    <EmtyImage src={EmptyIcon} alt="no data" />
  </Empty>
);

const TableHeader = <T extends ColumnType>({ columns }: TableHeaderProps<T>) => {
  return (
    <THead>
      <tr>
        {columns.map((column, idx) => (
          <THeader key={idx}>{column.title}</THeader>
        ))}
      </tr>
    </THead>
  );
};

const TableRow = <T extends ColumnType>({ row, columns, index, onClickRow }: TableRowProps<T>) => {
  return (
    <TRow onClick={e => handleClicktWithoutAnchor(e, () => onClickRow?.(e, row, index))}>
      {columns.map((column, idx) => {
        return (
          <TCol key={idx} minWidth={column.minWidth}>
            {column.render ? column.render(row, index) : row[column.key]}
          </TCol>
        );
      })}
    </TRow>
  );
};

const TableBody = <T extends ColumnType>({ data, columns, onClickRow }: TableProps<T>) => {
  return (
    <TBody>
      {data &&
        data.map((row, index) => (
          <TableRow row={row} key={index} columns={columns} index={index} onClickRow={onClickRow} />
        ))}
    </TBody>
  );
};

const TableSekeleton = <T extends ColumnType>({ columns }: TableProps<T>) => {
  return (
    <TBody>
      {[...Array(10)].map((_, i) => {
        return (
          <TRow key={i}>
            {columns.map(({ minWidth }, idx) => {
              return (
                <td>
                  <Skeleton variant="rectangular" style={{ height: "75px" }} animation="wave" />
                </td>
              );
            })}
          </TRow>
        );
      })}
    </TBody>
  );
};

const FooterTable: React.FC<FooterTableProps> = ({ total, pagination }) => {
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
    <TFooter>
      {total && (
        <Total>
          {total.title}: <TotalNumber>{numberWithCommas(total.count)}</TotalNumber>
        </Total>
      )}
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
    </TFooter>
  );
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  total,
  pagination,
  className,
  style,
  loading,
  initialized = true,
  error,
  onClickRow,
}) => {
  console.log({ initialized, loading, data });
  return (
    <Box className={className || ""} style={style}>
      <Wrapper>
        <TableFullWidth>
          <TableHeader columns={columns} />
          {loading ? (
            <TableSekeleton columns={columns} />
          ) : (
            <TableBody columns={columns} data={data} onClickRow={onClickRow} />
          )}
        </TableFullWidth>
        {!loading && ((initialized && data?.length === 0) || (error && error !== true)) && <EmptyRecord />}
        {error && error !== true && <Error>{error || "Something went wrong!"}</Error>}
      </Wrapper>
      <FooterTable total={total} pagination={pagination} />
    </Box>
  );
};

export * from "../../../types/table.d";

export default Table;
