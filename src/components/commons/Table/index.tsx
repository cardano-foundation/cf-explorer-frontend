import React, { useEffect, useMemo, useState } from "react";
import { Box, PaginationRenderItemParams, IconButton, MenuItem, styled, CircularProgress, alpha } from "@mui/material";
import { handleClicktWithoutAnchor, numberWithCommas } from "../../../commons/utils/helper";
import {
  DownIcon,
  EmptyIcon,
  EndPage,
  EyeIcon,
  NextPage,
  PrevPage,
  StartPage,
  SortTableDown,
  SortTableUp,
  SortTableUpDown,
} from "../../../commons/resources";
import {
  Empty,
  EmtyImage,
  TBody,
  TCol,
  TFooter,
  THead,
  THeader,
  TRow,
  TotalNumber,
  Wrapper,
  TableFullWidth,
  InputNumber,
  SelectMui,
  LoadingWrapper,
  TableCheckBox,
  TableHeaderContainer,
  TableTitle,
  ShowedResults,
  TableCustomTitle,
  StyledPagination,
} from "./styles";
import {
  ColumnType,
  FooterTableProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableTopHeaderProps,
} from "../../../types/table";
import { useUpdateEffect } from "react-use";
import { useParams } from "react-router-dom";
import Filter from "../Filter";
import { useScreen } from "../../../commons/hooks/useScreen";

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
  selected = null,
  selectable,
  toggleSelectAll,
  isSelectAll,
}: TableHeaderProps<T>) => {
  const [{ columnKey, sort }, setSort] = useState<{ columnKey: string; sort: "" | "DESC" | "ASC" }>({
    columnKey: defaultSort ? defaultSort.split(",")[0] : "",
    sort: defaultSort ? (defaultSort.split(",")[1] as "" | "DESC" | "ASC") : "",
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
            <TableCheckBox checked={isSelectAll} onChange={e => toggleSelectAll?.(e.target.checked)} />
          </THeader>
        )}
        {columns.map((column, idx) => (
          <THeader key={idx}>
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
        {showTabView && selected === null && <THeader />}
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
  isSelected,
}: TableRowProps<T>) => {
  return (
    <TRow onClick={e => handleClicktWithoutAnchor(e, () => onClickRow?.(e, row, index))} {...selectedProps}>
      {selectable && (
        <TCol>
          <TableCheckBox checked={isSelected?.(row)} onChange={e => toggleSelection?.(row)} />
        </TCol>
      )}
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
      {showTabView && selected === null && (
        <TCol minWidth={50} maxWidth={90}>
          <EyeIcon style={{ transform: "scale(.6)" }} />
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
  isSelected,
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

const FooterTable: React.FC<FooterTableProps> = ({ total, pagination, loading, clearSelection }) => {
  const [page, setPage] = useState(pagination?.page || 1);
  const [size, setSize] = useState(pagination?.size || 50);
  const { poolType } = useParams<{ poolType: "registration" | "de-registration" }>();

  useUpdateEffect(() => {
    setPage(1);
  }, [poolType]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    pagination && pagination.onChange && pagination.onChange(page, size);
    setPage(page);
    clearSelection?.();
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
                clearSelection?.();
              }}
              value={size}
              IconComponent={DownIcon}
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
        {total?.count ? (
          <Box ml={"20px"} fontSize="0.875rem" lineHeight={"1 !important"}>
            <TotalNumber>{numberWithCommas(total.count)}</TotalNumber> {`Result${total.count > 1 ? "s" : ""}`}
          </Box>
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
  maxHeight,
}) => {
  const { selectedItems, toggleSelection, isSelected, clearSelection, selectAll } = useSelection({
    onSelectionChange,
  });

  const toggleSelectAll = (isChecked: boolean) => {
    if (data && isChecked) {
      selectAll(data);
      return;
    }
    clearSelection();
  };

  useEffect(() => {
    clearSelection();
  }, [data]);

  const isSelectAll = useMemo(() => data?.length === selectedItems.length, [data, selectedItems]);
  return (
    <Box className={className || ""} style={style}>
      <TableTopHeader
        onFilterChange={onFilterChange}
        renderAction={items => renderAction?.(items, clearSelection)}
        title={tableTitle}
        totalShowingResult={isShowingResult && data?.length}
        fliterOptions={fliterOptions}
        selectedItems={selectedItems}
        isSelectAll={isSelectAll}
      />
      <Wrapper maxHeight={maxHeight}>
        <TableFullWidth>
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
        <FooterTable total={total} clearSelection={clearSelection} pagination={pagination} loading={loading || false} />
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
  onFilterChange,
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
          <Box width={isGalaxyFoldSmall ? "100vw" : "auto"} textAlign={isGalaxyFoldSmall ? "left" : "center"}>
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

function useSelection<T>({ onSelectionChange }: { onSelectionChange?: (items: T[]) => void }) {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const toggleSelection = (item: T) => {
    setSelectedItems(prevSelectedItems => {
      const itemIndex = prevSelectedItems.indexOf(item);
      if (itemIndex >= 0) {
        onSelectionChange?.(prevSelectedItems.filter(i => i !== item));
        return prevSelectedItems.filter(i => i !== item);
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
