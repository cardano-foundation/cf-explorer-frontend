import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  PaginationRenderItemParams,
  alpha,
  styled,
  useScrollTrigger
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateEffect } from "react-use";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  DownIcon,
  EmptyIcon,
  EndPage,
  EyeIcon,
  NextPage,
  PrevPage,
  SortTableDown,
  SortTableUp,
  SortTableUpDown,
  StartPage
} from "src/commons/resources";
import { handleClicktWithoutAnchor, numberWithCommas } from "src/commons/utils/helper";
import {
  ColumnType,
  FooterTableProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableTopHeaderProps
} from "src/types/table";

import CustomIcon from "../CustomIcon";
import Filter from "../Filter";
import {
  Empty,
  EmtyImage,
  InputNumber,
  LoadingWrapper,
  SelectMui,
  ShowedResults,
  StyledPagination,
  TBody,
  TCol,
  TFooter,
  THead,
  THeader,
  TRow,
  TableCheckBox,
  TableCustomTitle,
  TableFullWidth,
  TableHeaderContainer,
  TableTitle,
  TotalNumber,
  Wrapper
} from "./styles";

type TEmptyRecord = {
  className?: string;
};
export const EmptyRecord: React.FC<TEmptyRecord> = ({ className }) => (
  <Empty className={className}>
    <EmtyImage src={EmptyIcon} alt="no data" />
  </Empty>
);

const TableHeader = <T extends ColumnType>({
  columns,
  loading,
  defaultSort,
  showTabView,
  selectable,
  toggleSelectAll,
  isSelectAll
}: TableHeaderProps<T>) => {
  const [{ columnKey, sort }, setSort] = useState<{ columnKey: string; sort: "" | "DESC" | "ASC" }>({
    columnKey: defaultSort ? defaultSort.split(",")[0] : "",
    sort: defaultSort ? (defaultSort.split(",")[1] as "" | "DESC" | "ASC") : ""
  });
  const sortValue = ({ key, sort }: { key: string; sort: "" | "DESC" | "ASC" }) => {
    if (key === columnKey) {
      switch (sort) {
        case "DESC":
          setSort({ columnKey: key, sort: "ASC" });
          return { columnKey: key, sortValue: "ASC" };
        case "ASC":
          setSort({ columnKey: key, sort: "" });
          return { columnKey: key, sortValue: "" };
        default: {
          setSort({ columnKey: key, sort: "DESC" });
          return { columnKey: key, sortValue: "DESC" };
        }
      }
    }
    setSort({ columnKey: key, sort: "DESC" });
    return { columnKey: key, sortValue: "DESC" };
  };
  const IconSort = ({ key, sort }: { key: string; sort: "" | "DESC" | "ASC" }) => {
    if (key === columnKey)
      switch (sort) {
        case "DESC":
          return <SortTableDown />;
        case "ASC":
          return <SortTableUp />;
        default: {
          return <SortTableUpDown />;
        }
      }
    return <SortTableUpDown />;
  };
  return (
    <THead>
      <tr>
        {selectable && (
          <THeader>
            <TableCheckBox checked={isSelectAll} onChange={(e) => toggleSelectAll?.(e.target.checked)} />
          </THeader>
        )}
        {columns.map((column, idx) => (
          <THeader
            key={idx}
            style={
              column.fixed ? { position: "sticky", left: column.leftFixed ? column.leftFixed : "-8px", zIndex: 10 } : {}
            }
          >
            {column.title}
            {column.sort && (
              <IconButton
                disabled={loading}
                onClick={() => column?.sort && column?.sort(sortValue({ sort, key: column.key }))}
              >
                {IconSort({ sort, key: column.key })}
              </IconButton>
            )}
          </THeader>
        ))}
        {showTabView && <THeader />}
      </tr>
    </THead>
  );
};

const TableRow = <T extends ColumnType>({
  row,
  columns,
  index,
  onClickRow,
  showTabView,
  selectedProps,
  selected = null,
  dataLength,
  selectable,
  toggleSelection,
  isSelected
}: TableRowProps<T>) => {
  const colRef = useRef(null);
  const isClickRow = selected === index ? 1 : 0;

  return (
    <TRow onClick={(e) => handleClicktWithoutAnchor(e, () => onClickRow?.(e, row, index))} {...selectedProps}>
      {selectable && (
        <TCol>
          <TableCheckBox checked={isSelected?.(row)} onChange={() => toggleSelection?.(row)} />
        </TCol>
      )}
      {columns.map((column, idx) => {
        return (
          <TCol
            className="tb-col"
            key={idx}
            ref={colRef}
            minWidth={column.minWidth}
            maxWidth={column.maxWidth}
            hiddenBorder={column.isHiddenBorder && dataLength === index + 1}
            selected={isClickRow}
            style={column.fixed ? { position: "sticky", left: column.leftFixed ? column.leftFixed : "-8px" } : {}}
          >
            {column.render ? column.render(row, index) : row[column.key]}
          </TCol>
        );
      })}
      {showTabView && (
        <TCol minWidth={50} maxWidth={90} selected={isClickRow}>
          <Box display="flex" alignItems="center" height="1rem">
            {selected !== index && <CustomIcon icon={EyeIcon} originWidth={31} originHeight={23} width={24} />}
          </Box>
        </TCol>
      )}
    </TRow>
  );
};

const TableBody = <T extends ColumnType>({
  data,
  columns,
  onClickRow,
  showTabView,
  selected,
  selectedProps,
  loading,
  initialized,
  selectable,
  toggleSelection,
  isSelected
}: TableProps<T>) => {
  return (
    <TBody>
      {loading && initialized && (
        <tr>
          <td>
            <LoadingWrapper
              bgcolor={(theme) => alpha(theme.palette.common.black, 0.05)}
              width={"100%"}
              height={"100%"}
              zIndex={1000}
              display="flex"
              justifyContent="center"
              alignItems="self-start"
            >
              <Box pt={"20%"}>
                <CircularProgress />
              </Box>
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
            showTabView={showTabView}
            selected={selected}
            selectedProps={selected === index ? selectedProps : undefined}
            selectable={selectable}
            toggleSelection={toggleSelection}
            isSelected={isSelected}
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

export const FooterTable: React.FC<FooterTableProps> = ({ total, pagination, loading, clearSelection }) => {
  const defaultPage = pagination?.page && (pagination?.page === 0 ? 1 : pagination?.page + 1);
  const [page, setPage] = useState(defaultPage || 1);
  const [size, setSize] = useState(pagination?.size || 50);
  const [open, setOpen] = useState(false);
  const trigger = useScrollTrigger();
  const { poolType } = useParams<{ poolType: "registration" | "de-registration" }>();

  useUpdateEffect(() => {
    setPage(1);
  }, [poolType]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    pagination && pagination.onChange && pagination.onChange(page, size);
    setPage(page);
    clearSelection?.();
  };

  useEffect(() => {
    trigger && setOpen(false);
  }, [trigger, setOpen]);

  return (
    <TFooter>
      <Box display={"flex"} alignItems="center" margin="15px 0px">
        {pagination?.total && pagination.total > 10 ? (
          <Box display="flex" alignItems="center">
            <SelectMui
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              size="small"
              onChange={(e: any) => {
                setSize(+e.target.value);
                setPage(1);
                pagination?.onChange && pagination.onChange(1, +e.target.value);
                clearSelection?.();
              }}
              value={size}
              IconComponent={DownIcon}
              MenuProps={{
                sx: {
                  zIndex: 1305
                }
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </SelectMui>
            <Box component={"span"} ml={1} fontSize="0.875rem">
              Per page
            </Box>
          </Box>
        ) : (
          ""
        )}
        {total && total.count ? (
          <Box ml={"20px"} fontSize="0.875rem">
            <TotalNumber>{numberWithCommas(total.count)}</TotalNumber> {`Result${total.count > 1 ? "s" : ""}`}
          </Box>
        ) : (
          ""
        )}
      </Box>
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
  showTabView,
  selected,
  selectedProps,
  defaultSort,
  showPagination = true,
  selectable,
  onSelectionChange,
  tableTitle,
  renderAction,
  fliterOptions,
  onFilterChange,
  isShowingResult,
  maxHeight
}) => {
  const { selectedItems, toggleSelection, isSelected, clearSelection, selectAll } = useSelection({
    onSelectionChange
  });
  const tableRef = useRef(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const heightTable = Math.min((tableRef?.current as any)?.clientHeight || 0, 800);
  const toggleSelectAll = (isChecked: boolean) => {
    if (data && isChecked) {
      selectAll(data);
      return;
    }
    clearSelection();
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    }
  }, [loading]);

  useEffect(() => {
    clearSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isSelectAll = useMemo(() => data?.length === selectedItems.length, [data, selectedItems]);
  return (
    <Box className={className || ""} style={style} data-testid="table-common">
      <TableTopHeader
        onFilterChange={onFilterChange}
        renderAction={(items) => renderAction?.(items, clearSelection)}
        title={tableTitle}
        totalShowingResult={isShowingResult && data?.length}
        fliterOptions={fliterOptions}
        selectedItems={selectedItems}
        isSelectAll={isSelectAll}
      />
      <Wrapper
        ref={wrapperRef}
        maxHeight={maxHeight}
        minHeight={(!data || data.length === 0) && !loading ? 360 : loading ? 400 : 150}
        height={heightTable}
        className={data && data.length !== 0 ? "table-wrapper" : ""}
        loading={loading ? 1 : 0}
      >
        <TableFullWidth ref={tableRef}>
          <TableHeader
            columns={columns}
            loading={loading}
            defaultSort={defaultSort}
            showTabView={showTabView}
            selected={selected}
            selectable={selectable}
            toggleSelectAll={toggleSelectAll}
            isSelectAll={isSelectAll}
          />
          <TableBody
            columns={columns}
            data={data}
            onClickRow={onClickRow}
            showTabView={showTabView}
            selected={selected}
            selectedProps={selectedProps}
            initialized={initialized}
            loading={loading}
            selectable={selectable}
            toggleSelection={toggleSelection}
            isSelected={isSelected}
          />
        </TableFullWidth>
        {loading && !initialized && <TableSekeleton />}
        {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord className={emptyClassName} />}
      </Wrapper>
      {showPagination && (
        <FooterTable total={total} clearSelection={clearSelection} pagination={pagination} loading={!!loading} />
      )}
    </Box>
  );
};

const TableTopHeader: React.FC<TableTopHeaderProps> = ({
  fliterOptions,
  renderAction,
  selectedItems,
  title,
  isSelectAll,
  totalShowingResult = 0,
  onFilterChange
}) => (
  <TableHeaderContainer>
    {typeof title === "string" ? <TableTitle>{title}</TableTitle> : <TableCustomTitle>{title}</TableCustomTitle>}
    {Boolean(totalShowingResult) && <ShowedResults>Showing {totalShowingResult} results</ShowedResults>}
    {fliterOptions && <Filter onOptionChange={onFilterChange} options={fliterOptions} />}

    {isSelectAll && renderAction?.(selectedItems)}
  </TableHeaderContainer>
);

export * from "../../../types/table.d";

export default Table;

const PaginationCustom = ({
  pagination,
  total,
  page,
  size,
  handleChangePage,
  loading
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
  }, [poolType, size]);

  useEffect(() => {
    if (pagination?.page) {
      setInputPage(pagination?.page + 1);
    }
  }, [pagination?.page]);

  const { isGalaxyFoldSmall } = useScreen();

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
          <Box textAlign={isGalaxyFoldSmall ? "left" : "center"}>
            <InputNumber
              type={"string"}
              value={inputPage}
              length={inputPage.toString().length || 1}
              onChange={(e) => {
                if (+e.target.value <= totalPage) {
                  setInputPage(+e.target.value);
                }
              }}
              onBlur={() => {
                setInputPage(page);
              }}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputPage < 1) {
                    setInputPage(1);
                  }
                  pagination?.handleCloseDetailView && pagination.handleCloseDetailView();
                  handleChangePage(null, inputPage);
                }
              }}
            />
            <Box component={"span"} color={(theme) => theme.palette.grey[400]} fontSize="0.875rem">
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
    <StyledPagination
      count={total || 0}
      page={page}
      showFirstButton={true}
      showLastButton={true}
      renderItem={renderItem}
    />
  );
};

const StartPageIcon = styled(StartPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400]
}));
const EndPageIcon = styled(EndPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400]
}));
const NextPageIcon = styled(NextPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400]
}));
const PrevPageIcon = styled(PrevPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.grey[400]
}));

function useSelection<T>({ onSelectionChange }: { onSelectionChange?: (items: T[]) => void }) {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const toggleSelection = (item: T) => {
    setSelectedItems((prevSelectedItems) => {
      const itemIndex = prevSelectedItems.indexOf(item);
      if (itemIndex >= 0) {
        onSelectionChange?.(prevSelectedItems.filter((i) => i !== item));
        return prevSelectedItems.filter((i) => i !== item);
      }
      onSelectionChange?.([...prevSelectedItems, item]);
      return [...prevSelectedItems, item];
    });
  };

  const selectAll = (items: T[]) => {
    if (!items) return;
    setSelectedItems(items);
    onSelectionChange?.(items);
  };

  const clearSelection = () => {
    setSelectedItems([]);
    onSelectionChange?.([]);
  };

  const isSelected = (item: T) => {
    return selectedItems.includes(item);
  };

  return { selectedItems, toggleSelection, clearSelection, isSelected, selectAll };
}
