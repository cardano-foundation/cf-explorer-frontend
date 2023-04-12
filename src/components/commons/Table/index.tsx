import React, { useState } from "react";
import {
  Box,
  Pagination,
  PaginationRenderItemParams,
  IconButton,
  MenuItem,
  styled,
  CircularProgress,
  alpha,
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
  LoadingWrapper,
} from "./styles";
import { ColumnType, FooterTableProps, TableHeaderProps, TableProps, TableRowProps } from "../../../types/table";
import { useUpdateEffect } from "react-use";
import { useParams } from "react-router-dom";

type TEmptyRecord = {
  className?: string;
};
export const EmptyRecord: React.FC<TEmptyRecord> = ({ className }) => (
  <Empty className={className}>
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

const TableRow = <T extends ColumnType>({
  row,
  columns,
  index,
  onClickRow,
  selectedProps,
  dataLength,
}: TableRowProps<T>) => {
  return (
    <TRow onClick={e => handleClicktWithoutAnchor(e, () => onClickRow?.(e, row, index))} {...selectedProps}>
      {columns.map((column, idx) => {
        return (
          <TCol
            key={idx}
            minWidth={column.minWidth}
            maxWidth={column.maxWidth}
            hiddenBorder={column.isHiddenBorder && dataLength === index + 1}
          >
            {column.render ? column.render(row, index) : row[column.key]}
          </TCol>
        );
      })}
    </TRow>
  );
};

const TableBody = <T extends ColumnType>({
  data,
  columns,
  onClickRow,
  selected,
  selectedProps,
  loading,
  initialized,
}: TableProps<T>) => {
  return (
    <TBody>
      {loading && initialized && (
        <tr>
          <td>
            <LoadingWrapper
              bgcolor={theme => alpha(theme.palette.common.black, 0.05)}
              width={"100%"}
              height={"100%"}
              zIndex={1000}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </LoadingWrapper>
          </td>
        </tr>
      )}
      {data &&
        data.map((row, index) => (
          <TableRow
            row={row}
            key={index}
            columns={columns}
            index={index}
            dataLength={data.length}
            onClickRow={onClickRow}
            selectedProps={selected === index ? selectedProps : undefined}
          />
        ))}
    </TBody>
  );
};

const TableSekeleton = () => {
  return (
    <Empty height={218}>
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    </Empty>
  );
};

const FooterTable: React.FC<FooterTableProps> = ({ total, pagination, loading }) => {
  const [page, setPage] = useState(pagination?.page || 1);
  const [size, setSize] = useState(pagination?.size || 10);
  const { poolType } = useParams<{ poolType: "registration" | "de-registration" }>();

  useUpdateEffect(() => {
    setPage(1);
  }, [poolType]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    pagination && pagination.onChange && pagination.onChange(page, size);
    setPage(page);
  };

  return (
    <TFooter>
      <Box display={"flex"} alignItems="center">
        {pagination?.total && pagination.total > 10 ? (
          <Box>
            <SelectMui
              size="small"
              onChange={(e: any) => {
                setSize(+e.target.value);
                setPage(1);
                pagination?.onChange && pagination.onChange(1, +e.target.value);
              }}
              value={size}
              IconComponent={DownIcon}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </SelectMui>
            <Box component={"span"} ml={1} fontSize="0.875rem">
              Per page
            </Box>
          </Box>
        ) : (
          ""
        )}
        {total?.count ? (
          <Total ml={"20px"} fontSize="0.875rem" lineHeight={"1 !important"}>
            <TotalNumber>{numberWithCommas(total.count)}</TotalNumber> {`Result${total.count > 1 ? "s" : ""}`}
          </Total>
        ) : (
          ""
        )}
      </Box>

      <Box />
      {pagination?.total && pagination.total > 10 ? (
        <PaginationCustom
          pagination={pagination}
          total={pagination.total || 0}
          page={page}
          size={size}
          handleChangePage={handleChangePage}
          loading={loading}
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
  emptyClassName,
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
          <TableBody
            columns={columns}
            data={data}
            onClickRow={onClickRow}
            selected={selected}
            selectedProps={selectedProps}
            initialized={initialized}
            loading={loading}
          />
        </TableFullWidth>
        {loading && !initialized && <TableSekeleton />}
        {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord className={emptyClassName} />}
      </Wrapper>
      <FooterTable total={total} pagination={pagination} loading={loading || false} />
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
  loading,
}: {
  pagination: TableProps["pagination"];
  total: number;
  page: number;
  size: number;
  loading: boolean;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
}) => {
  const [inputPage, setInputPage] = useState(page);
  const { poolType } = useParams<{ poolType: "registration" | "de-registration" }>();

  useUpdateEffect(() => {
    setInputPage(1);
  }, [poolType]);

  useUpdateEffect(() => {
    setInputPage(1);
  }, [size]);

  const totalPage = Math.ceil((pagination?.total || 0) / size);
  const renderItem = (item: PaginationRenderItemParams) => {
    if (item.type === "first") {
      return (
        <IconButton
          disabled={page === 1 || loading}
          onClick={() => {
            handleChangePage(null, 1);
            setInputPage(1);
            pagination?.handleCloseDetailView && pagination.handleCloseDetailView();
          }}
        >
          <StartPageIcon disabled={page === 1 || loading} />
        </IconButton>
      );
    }
    if (item.type === "last") {
      return (
        <IconButton
          disabled={page === totalPage || loading}
          onClick={() => {
            handleChangePage(null, totalPage || 1);
            setInputPage(totalPage || 1);
            pagination?.handleCloseDetailView && pagination.handleCloseDetailView();
          }}
        >
          <EndPageIcon disabled={page === totalPage || loading} />
        </IconButton>
      );
    }
    if (item.type === "next") {
      return (
        <IconButton
          disabled={page === totalPage || loading}
          onClick={() => {
            setInputPage(page + 1);
            handleChangePage(null, page + 1);
            pagination?.handleCloseDetailView && pagination.handleCloseDetailView();
          }}
        >
          <NextPageIcon disabled={page === totalPage || loading} />
        </IconButton>
      );
    }
    if (item.type === "previous") {
      return (
        <IconButton
          disabled={page === 1 || loading}
          onClick={() => {
            setInputPage(page - 1);
            handleChangePage(null, page - 1);
            pagination?.handleCloseDetailView && pagination.handleCloseDetailView();
          }}
        >
          <PrevPageIcon disabled={page === 1 || loading} />
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
                if (+e.target.value <= totalPage) {
                  setInputPage(+e.target.value);
                }
              }}
              disabled={loading}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (inputPage < 1) {
                    setInputPage(1);
                  }
                  pagination?.handleCloseDetailView && pagination.handleCloseDetailView();
                  handleChangePage(null, inputPage);
                }
              }}
            />
            <Box component={"span"} color={theme => theme.palette.grey[400]} fontSize="0.875rem">
              {numberWithCommas((page - 1 >= 0 ? page - 1 : -0) * size + 1)} -{" "}
              {numberWithCommas((page > 0 ? page : 1) * size > total ? total : (page > 0 ? page : 1) * size)} of{" "}
              {numberWithCommas(pagination?.total || 0)}
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

const StartPageIcon = styled(StartPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400],
}));
const EndPageIcon = styled(EndPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400],
}));
const NextPageIcon = styled(NextPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400],
}));
const PrevPageIcon = styled(PrevPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400],
}));
