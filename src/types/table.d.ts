/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { BoxProps } from "@mui/material";

import { Option } from "src/components/commons/Filter";

export interface ColumnType {
  [key: string | number | symbol]: any;
}

export interface Column<T extends ColumnType = any> {
  key: string;
  title?: React.ReactNode;
  width?: number | string;
  minWidth?: number | string;
  isHiddenBorder?: boolean;
  maxWidth?: number | string;
  fixed?: boolean;
  leftFixed?: number | string;
  render?: (data: T, index: number) => ReactNode;
  sort?: ({ columnKey, sortValue }: { columnKey: string; sortValue: string }) => void;
}

export type TableHeaderProps<T extends ColumnType> = Pick<
  TableProps<T>,
  "columns" | "loading" | "defaultSort" | "showTabView" | "selected"
> & {
  selectable?: boolean;
  toggleSelectAll?: (checked: boolean) => void;
  isModal?: boolean;
  isSelectAll?: boolean;
};

export type TableRowProps<T extends ColumnType> = Pick<TableProps, "columns"> & {
  row: T;
  dataLength?: number;
  index: number;
  onClickRow?: (e: React.MouseEvent, record: T) => void;
  showTabView?: boolean;
  selected?: boolean;
  selectedProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  selectable?: boolean;
  toggleSelection?: (row: T) => void;
  isSelected?: (item: T) => boolean;
  isModal?: boolean;
};

export interface TableProps<T extends ColumnType = any> {
  columns: Column<T>[];
  data?: T[];
  className?: string;
  emptyClassName?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  initialized?: boolean;
  error?: React.ReactNode;
  total?: {
    count: number;
    title: string;
    isDataOverSize?: boolean | null;
  };
  defaultSort?: string;
  pagination?: {
    onChange?: (page: number, size: number) => void;
    page?: number;
    size?: number;
    total?: number;
    handleCloseDetailView?: () => void;
    hideLastPage?: boolean;
  };
  allowSelect?: boolean;
  onClickRow?: (e: React.MouseEvent, record: T) => void;
  showTabView?: boolean;
  /**
   * @default This props default is row index. If value is string, key of row is row[rowKey].
   * If rowKey is function, key is result of that fuction
   */
  rowKey?: string | ((record: T) => string | number | symbol);
  selected?: string | number | symbol | null;
  selectedProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  showPagination?: boolean;
  selectable?: boolean;
  toggleSelection?: (row: T) => void;
  isSelected?: (row: T) => boolean;
  selectionKey?: string;
  onSelectionChange?: (items: string[]) => void;
  tableTitle?: string | React.ReactNode | React.ReactElement;
  fliterOptions?: Option[];
  renderAction?: (items, clearSelection: () => void) => React.ReactElement;
  onFilterChange?: (value: any, option?: Option) => void;
  isShowingResult?: boolean;
  /**
   * @deprecated: This props is deprecated. Please pass maxHeight attribute to tableWrapperProps.
   */
  maxHeight?: number | string;
  tableWrapperProps?: BoxProps;
  isModal?: boolean;
}

export interface FooterTableProps {
  total?: TableProps["total"];
  pagination: TableProps["pagination"];
  loading: boolean;
  clearSelection?: () => void;
}

export interface TableTopHeaderProps {
  title?: string | React.ReactNode | React.ReactElement;
  fliterOptions?: Option[];
  renderAction?: (items) => React.ReactNode;
  selectedItems?: string[];
  isModal?: boolean;
  isSelectAll?: boolean;
  totalShowingResult?: number | boolean;
  onFilterChange?: (value: any, option?: Option) => void;
}
