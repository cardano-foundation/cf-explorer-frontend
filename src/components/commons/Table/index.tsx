import {
  Box,
  CircularProgress,
  IconButton,
  PaginationRenderItemParams,
  SelectChangeEvent,
  alpha,
  styled,
  useScrollTrigger,
  useTheme
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  DownIcon,
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
import breakpoints from "src/themes/breakpoints";

import CustomIcon from "../CustomIcon";
import Filter from "../Filter";
import NoRecord from "../NoRecord";
import {
  Empty,
  InputNumber,
  LoadingWrapper,
  SelectMui,
  ShowedResults,
  StyledMenuItem,
  StyledPagination,
  StyledPerPage,
  StyledResult,
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
import { Lowercase } from "../CustomText/styles";
import NotAvailable from "../NotAvailable";

const SPACING_TOP_TABLE = 300;

type TEmptyRecord = {
  className?: string;
  isModal?: boolean;
};
export const EmptyRecord: React.FC<TEmptyRecord> = ({ className, isModal }) => (
  <Empty className={className} ismodal={+(isModal || 0)}>
    <NoRecord p={`${0} !important`} />
  </Empty>
);
export const NotAvailableIcon: React.FC<TEmptyRecord> = ({ className, isModal }) => (
  <Empty className={className} ismodal={+(isModal || 0)}>
    <NotAvailable p={`${0} !important`} />
  </Empty>
);

const TableHeader = <T extends ColumnType>({
  columns,
  loading,
  defaultSort,
  showTabView,
  selectable,
  toggleSelectAll,
  isSelectAll,
  isModal
}: TableHeaderProps<T>) => {
  const theme = useTheme();
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
          return <SortTableDown fill={theme.palette.primary.main} />;
        case "ASC":
          return <SortTableUp fill={theme.palette.primary.main} />;
        default: {
          return <SortTableUpDown fill={theme.palette.primary.main} />;
        }
      }
    return <SortTableUpDown fill={theme.palette.primary.main} />;
  };
  return (
    <THead>
      <tr>
        {selectable && (
          <THeader ismodal={+(isModal || 0)}>
            <TableCheckBox checked={isSelectAll} onChange={(e) => toggleSelectAll?.(e.target.checked)} />
          </THeader>
        )}
        {columns.map((column, idx) => (
          <THeader
            key={idx}
            style={
              column.fixed ? { position: "sticky", left: column.leftFixed ? column.leftFixed : "-8px", zIndex: 10 } : {}
            }
            ismodal={+(isModal || 0)}
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
  screen,
  index,
  onClickRow,
  showTabView,
  selectedProps,
  selected = false,
  dataLength,
  selectable,
  toggleSelection,
  isSelected,
  isModal,
  onCallBackHeight
}: TableRowProps<T>) => {
  const colRef = useRef(null);
  const theme = useTheme();
  const { isMobile } = useScreen();

  const rowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    onCallBackHeight?.(rowRef?.current?.clientHeight || 0);
  }),
    [rowRef.current];

  return (
    <TRow ref={rowRef} onClick={(e) => handleClicktWithoutAnchor(e, () => onClickRow?.(e, row))} {...selectedProps}>
      {selectable && (
        <TCol ismodal={+(isModal || 0)}>
          <TableCheckBox checked={isSelected?.(row)} onChange={() => toggleSelection?.(row)} />
        </TCol>
      )}
      {columns.map((column, idx) => {
        const isFirstColumn = idx === 0;
        const isNativeScriptsOrSmartContracts = screen === "nativeScripts" || screen === "smartContracts";
        return (
          <TCol
            ismodal={+(isModal || 0)}
            className="tb-col"
            key={idx}
            ref={colRef}
            minWidth={column.minWidth}
            maxWidth={column.maxWidth}
            hiddenBorder={column.isHiddenBorder && dataLength === index + 1}
            selected={+selected}
            style={{
              ...(column.fixed ? { position: "sticky", left: column.leftFixed ? column.leftFixed : "-8px" } : {}),
              ...(isFirstColumn && isNativeScriptsOrSmartContracts && !isMobile ? { width: "50%" } : {})
            }}
          >
            {column.render ? column.render(row, index) : row[column.key]}
          </TCol>
        );
      })}
      {showTabView && (
        <TCol minWidth={50} maxWidth={90} selected={+selected}>
          <Box display="flex" alignItems="center" height="1rem">
            {!selected && (
              <CustomIcon
                icon={EyeIcon}
                stroke={theme.palette.secondary.light}
                originWidth={31}
                originHeight={23}
                width={24}
              />
            )}
          </Box>
        </TCol>
      )}
    </TRow>
  );
};

const TableBody = <T extends ColumnType>({
  data,
  columns,
  screen,
  rowKey,
  onClickRow,
  showTabView,
  selected,
  selectedProps,
  loading,
  initialized,
  selectable,
  toggleSelection,
  isSelected,
  isModal,
  onCallBackHeight,
  maxHeight,
  isCenterLoading,
  headerTableHeight,
  visibleTableWidth
}: TableProps<T>) => {
  return (
    <TBody>
      {loading && initialized && (
        <LoadingWrapper
          isCenterLoading={isCenterLoading}
          bgcolor={(theme) => alpha(theme.palette.common.black, 0.05)}
          width={isCenterLoading ? visibleTableWidth : "100%"}
          height={
            isCenterLoading && headerTableHeight
              ? `${typeof maxHeight === "number" ? maxHeight - headerTableHeight : maxHeight}px`
              : "100%"
          }
          zIndex={1000}
          display="flex"
          justifyContent="center"
          alignItems={isCenterLoading ? "center" : "self-start"}
        >
          <Box pt={isCenterLoading ? "0" : "20%"}>
            <CircularProgress />
          </Box>
        </LoadingWrapper>
      )}
      {data?.map((row, index) => (
        <TableRow
          row={row}
          key={index}
          columns={columns}
          screen={screen}
          index={index}
          dataLength={data.length}
          onClickRow={onClickRow}
          showTabView={showTabView}
          selected={!!rowKey && (typeof rowKey === "function" ? rowKey(row) : row[rowKey]) === selected}
          selectedProps={selected === index ? selectedProps : undefined}
          selectable={selectable}
          toggleSelection={toggleSelection}
          isSelected={isSelected}
          isModal={isModal}
          onCallBackHeight={onCallBackHeight}
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

export const FooterTable: React.FC<FooterTableProps> = ({
  total,
  pagination,
  loading,
  clearSelection,
  optionList = [10, 20, 50, 100]
}) => {
  const { t } = useTranslation();
  const defaultPage = pagination?.page && (pagination?.page === 0 ? 1 : pagination?.page + 1);
  const [page, setPage] = useState(defaultPage || 1);
  const [size, setSize] = useState(pagination?.size || 50);
  const [open, setOpen] = useState(false);
  const trigger = useScrollTrigger();
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    pagination && pagination.onChange && pagination.onChange(page, size);
    setPage(page);
    clearSelection?.();
  };

  useEffect(() => {
    if (pagination?.page === 0) {
      setPage(1);
    }
  }, [pagination?.page]);

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
              onChange={(e: SelectChangeEvent<unknown>) => {
                const value = e.target.value as string;
                setSize(+value);
                setPage(1);
                pagination?.onChange && pagination.onChange(1, +value);
                clearSelection?.();
              }}
              value={size}
              IconComponent={DownIcon}
              MenuProps={{
                sx: {
                  zIndex: 1305
                },
                MenuListProps: {
                  sx: {
                    bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
                  }
                },
                PaperProps: {
                  sx: {
                    bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
                  }
                }
              }}
            >
              {optionList.map((item, index) => (
                <StyledMenuItem key={index} value={item}>
                  {item}
                </StyledMenuItem>
              ))}
              {/* <StyledMenuItem value={10}>10</StyledMenuItem>
              <StyledMenuItem value={20}>20</StyledMenuItem>
              <StyledMenuItem value={50}>50</StyledMenuItem>
              <StyledMenuItem value={100}>100</StyledMenuItem> */}
            </SelectMui>
            <StyledPerPage>{t("perPage")}</StyledPerPage>
          </Box>
        ) : (
          ""
        )}
        {total && total.count ? (
          <StyledResult>
            <TotalNumber>{numberWithCommas(total.count)}</TotalNumber>{" "}
            {total.isDataOverSize
              ? t("glossary.mostRelavant")
              : total.count > 1
              ? t("common.results")
              : t("common.result")}
          </StyledResult>
        ) : (
          ""
        )}
      </Box>
      {pagination?.total && pagination.total > 10 ? (
        <PaginationCustom
          key={page}
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
  screen,
  total,
  pagination,
  className,
  emptyClassName,
  style,
  tableWrapperProps,
  loading,
  initialized = true,
  error,
  onClickRow,
  showTabView,
  rowKey,
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
  maxHeight,
  isShowingResult,
  isModal,
  height,
  minHeight,
  isFullTableHeight = false,
  isCenterLoading
}) => {
  const { selectedItems, toggleSelection, isSelected, clearSelection, selectAll } = useSelection({
    onSelectionChange
  });

  const tableRef = useRef<HTMLTableElement>(null);
  const [maxHeightTable, setMaxHeightTable] = useState<number>(0);
  const wrapperRef = useRef<HTMLElement>(null);
  const { width } = useScreen();
  const scrollHeight = 5;
  let heightTable = Math.min((tableRef?.current?.clientHeight || 0) + scrollHeight, window.innerHeight * 0.5);
  const tableFullHeight = (tableRef?.current?.clientHeight || 0) + scrollHeight;

  if (width >= breakpoints.values.sm && (data || []).length >= 9) {
    const footerHeight = document.getElementById("footer")?.offsetHeight || SPACING_TOP_TABLE;
    const spaceTop =
      Math.min(tableRef?.current?.clientHeight || 0, window.innerHeight) - (footerHeight + SPACING_TOP_TABLE) < 200
        ? 0
        : SPACING_TOP_TABLE;
    heightTable = window.innerHeight - (footerHeight + spaceTop);
  }

  const onCallBackHeight = (rowHeight: number) => {
    if (!maxHeightTable) setMaxHeightTable(rowHeight * 9);
  };

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const headerTableHeight = tableRef?.current?.querySelector("thead")?.clientHeight || 0;

  const visibleTableWidth = tableContainerRef.current?.offsetWidth || 0;

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
    <Box className={className || ""} style={style} data-testid="table-common" ref={tableContainerRef}>
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
        maxHeight={maxHeight || maxHeightTable}
        minHeight={minHeight ? minHeight : (!data || data.length === 0) && !loading ? 360 : loading ? 400 : 15}
        height={height || (isFullTableHeight ? tableFullHeight : heightTable)}
        ismodal={+!!isModal}
        className={data && data.length !== 0 ? "table-wrapper" : "hide-scroll"}
        loading={loading ? 1 : 0}
        {...tableWrapperProps}
      >
        <TableFullWidth ref={tableRef}>
          <TableHeader
            columns={columns}
            loading={loading}
            defaultSort={defaultSort}
            showTabView={showTabView}
            selected={selected}
            selectable={selectable}
            isModal={isModal}
            toggleSelectAll={toggleSelectAll}
            isSelectAll={isSelectAll}
          />
          <TableBody
            columns={columns}
            screen={screen}
            data={data}
            onClickRow={onClickRow}
            showTabView={showTabView}
            rowKey={rowKey}
            selected={selected}
            selectedProps={selectedProps}
            initialized={initialized}
            loading={loading}
            selectable={selectable}
            toggleSelection={toggleSelection}
            isSelected={isSelected}
            isModal={isModal}
            onCallBackHeight={onCallBackHeight}
            maxHeight={maxHeight || maxHeightTable}
            isCenterLoading={isCenterLoading}
            headerTableHeight={headerTableHeight}
            visibleTableWidth={visibleTableWidth}
          />
        </TableFullWidth>
        {loading && !initialized && <TableSekeleton />}
        {!loading && ((initialized && data?.length === 0) || error) && (
          <EmptyRecord isModal={isModal} className={emptyClassName} />
        )}
        {!loading && initialized && data === null && <NotAvailableIcon isModal={isModal} className={emptyClassName} />}
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
  const { t } = useTranslation();
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
    if (!pagination?.hideLastPage && item.type === "last") {
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
              onBlur={() => {
                setInputPage(page);
              }}
              disabled={true}
            />
            <Box component={"span"} color={(theme) => theme.palette.secondary.main} fontSize="0.875rem">
              {numberWithCommas((page - 1 >= 0 ? page - 1 : -0) * size + 1)} -{" "}
              {numberWithCommas((page > 0 ? page : 1) * size > total ? total : (page > 0 ? page : 1) * size)}{" "}
              <Lowercase>{t("common.of")}</Lowercase> {numberWithCommas(pagination?.total || 0)}
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
  stroke: disabled ? theme.palette.text.disabled : theme.palette.secondary.light
}));
const EndPageIcon = styled(EndPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.secondary.light
}));
const NextPageIcon = styled(NextPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.secondary.light
}));
const PrevPageIcon = styled(PrevPage)<{ disabled: boolean }>(({ disabled, theme }) => ({
  stroke: disabled ? theme.palette.text.disabled : theme.palette.secondary.light
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
