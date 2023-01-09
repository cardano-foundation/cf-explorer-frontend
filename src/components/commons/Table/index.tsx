import React, { useState } from "react";
import {
  TablePagination,
  Skeleton,
  Box,
  Pagination,
  PaginationRenderItemParams,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";

import { handleClicktWithoutAnchor, numberWithCommas } from "../../../commons/utils/helper";

import { EmptyIcon } from "../../../commons/resources";
import { ReactComponent as StartPage } from "../../../commons/resources/icons/startPagePagination.svg";
import { ReactComponent as EndPage } from "../../../commons/resources/icons/endPagePagination.svg";
import { ReactComponent as PrevPage } from "../../../commons/resources/icons/prevPagePagination.svg";
import { ReactComponent as NextPage } from "../../../commons/resources/icons/nextPagePagination.svg";
import { ReactComponent as DownIcon } from "../../../commons/resources/icons/down.svg";

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
  InputNumber,
  SelectMui,
} from "./styles";
import { ColumnType, FooterTableProps, TableHeaderProps, TableProps, TableRowProps } from "../../../types/table";
import { useUpdateEffect } from "react-use";

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

const TableRow = <T extends ColumnType>({ row, columns, index, onClickRow, selectedProps }: TableRowProps<T>) => {
  return (
    <TRow onClick={e => handleClicktWithoutAnchor(e, () => onClickRow?.(e, row, index))} {...selectedProps}>
      {columns.map((column, idx) => {
        return (
          <TCol key={idx} minWidth={column.minWidth} maxWidth={column.maxWidth}>
            {column.render ? column.render(row, index) : row[column.key]}
          </TCol>
        );
      })}
    </TRow>
  );
};

const TableBody = <T extends ColumnType>({ data, columns, onClickRow, selected, selectedProps }: TableProps<T>) => {
  return (
    <TBody>
      {data &&
        data.map((row, index) => (
          <TableRow
            row={row}
            key={index}
            columns={columns}
            index={index}
            onClickRow={onClickRow}
            selectedProps={selected === index ? selectedProps : undefined}
          />
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
                <td key={idx} style={{ minWidth: minWidth || "unset" }}>
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
  const [page, setPage] = useState(pagination?.page || 1);
  const [size, setSize] = useState(pagination?.size || 10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    pagination && pagination.onChange && pagination.onChange(page, size);
    setPage(page);
  };

  return (
    <TFooter>
      {total ? (
        <Box display={"flex"} alignItems="center">
          <Box>
            <SelectMui
              size="small"
              onChange={(e: any) => {
                setSize(+e.target.value);
                setPage(1);
                pagination?.onChange && pagination.onChange(1, +e.target.value);
              }}
              value={size}
              IconComponent={() => <DownIcon width={30} />}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </SelectMui>
            <Box component={"span"} ml={1}>
              Per page
            </Box>
          </Box>
          <Total ml={2}>
            <TotalNumber>{numberWithCommas(total.count)}</TotalNumber> Results
          </Total>
        </Box>
      ) : (
        ""
      )}
      <Box />
      {pagination?.total && pagination.total > 10 ? (
        <PaginationCustom
          pagination={pagination}
          total={pagination.total || 0}
          page={page}
          size={size}
          handleChangePage={handleChangePage}
        />
      ) : (
        ""
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
  selected,
  selectedProps,
}) => {
  return (
    <Box className={className || ""} style={style}>
      <Wrapper>
        <TableFullWidth>
          <TableHeader columns={columns} />
          {loading ? (
            <TableSekeleton columns={columns} />
          ) : (
            <TableBody
              columns={columns}
              data={data}
              onClickRow={onClickRow}
              selected={selected}
              selectedProps={selectedProps}
            />
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

const PaginationCustom = ({
  pagination,
  total,
  page,
  size,
  handleChangePage,
}: {
  pagination: TableProps["pagination"];
  total: number;
  page: number;
  size: number;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
}) => {
  const [inputPage, setInputPage] = useState(page);

  useUpdateEffect(() => {
    setInputPage(1);
  }, [size]);
  const totalPage = Math.ceil((pagination?.total || 0) / size);
  const renderItem = (item: PaginationRenderItemParams) => {
    if (item.type === "first") {
      return (
        <IconButton
          disabled={page === 1}
          onClick={() => {
            handleChangePage(null, 1);
            setInputPage(1);
          }}
        >
          <StartPage />
        </IconButton>
      );
    }
    if (item.type === "last") {
      return (
        <IconButton
          disabled={page === totalPage}
          onClick={() => {
            handleChangePage(null, totalPage || 1);
            setInputPage(totalPage || 1);
          }}
        >
          <EndPage />
        </IconButton>
      );
    }
    if (item.type === "next") {
      return (
        <IconButton
          disabled={page === totalPage}
          onClick={() => {
            setInputPage(page + 1);
            handleChangePage(null, page + 1);
          }}
        >
          <NextPage />
        </IconButton>
      );
    }
    if (item.type === "previous") {
      return (
        <IconButton
          disabled={page === 1}
          onClick={() => {
            setInputPage(page - 1);
            handleChangePage(null, page - 1);
          }}
        >
          <PrevPage />
        </IconButton>
      );
    }
    if (item.type === "page") {
      if (item.page === 1) {
        return (
          <Box>
            <InputNumber
              type={"number"}
              value={inputPage}
              length={inputPage.toString().length || 1}
              onChange={e => {
                if (+e.target.value < totalPage) {
                  setInputPage(+e.target.value);
                }
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (inputPage < 1) {
                    setInputPage(1);
                  }
                  handleChangePage(null, inputPage);
                }
              }}
            />
            <Box component={"span"} color={props => props.textColorPale}>
              {(page - 1) * size + 1} - {page * size > total ? total : page * size} of {pagination?.total || 0}
            </Box>
          </Box>
        );
      }
    }
  };
  return (
    <Pagination count={total || 0} page={page} showFirstButton={true} showLastButton={true} renderItem={renderItem} />
  );
};
