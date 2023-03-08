import React from "react";
export interface ColumnType {
  [key: string | number | symbol]: any;
}

export interface Column<T extends ColumnType = any> {
  key: string;
  title?: string;
  width?: number | string;
  minWidth?: number | string;
  isHiddeBorder?: boolean;
  maxWidth?: number | string;
  render?: (data: T, index: number) => ReactNode;
}

export type TableHeaderProps<T extends ColumnType> = Pick<TableProps<T>, "columns">;

export type TableRowProps<T extends ColumnType> = Pick<TableProps, "columns"> & {
  row: T;
  dataLength?: number;
  index: number;
  onClickRow?: (e: React.MouseEvent, record: T, index: number) => void;
  selectedProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
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
  };
  pagination?: {
    onChange?: (page: number, size: number) => void;
    page?: number;
    size?: number;
    total?: number;
    handleCloseDetailView?: () => void;
  };
  allowSelect?: boolean;
  onClickRow?: (e: React.MouseEvent, record: T, index: number) => void;
  selected?: number | null;
  selectedProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
}

export interface FooterTableProps {
  total: TableProps["total"];
  pagination: TableProps["pagination"];
  loading: boolean;
}
