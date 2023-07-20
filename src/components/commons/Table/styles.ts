import { Box, Checkbox, Typography, styled, Pagination } from "@mui/material";

import CustomSelect from "../CustomSelect";

export const Empty = styled(Box)`
  text-align: center;
  padding: 30px 0;
  position: relative;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const EmtyImage = styled("img")`
  width: auto;
  height: 214px;
`;

export const Error = styled(Box)`
  text-align: center;
  padding: 0 0 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: ${(props) => props.theme.palette.text.hint};
  font-size: var(--font-size-text-x-large);
`;

export const THead = styled("thead")(({ theme }) => ({
  paddingBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    "& tr th": {
      padding: "15px 20px"
    }
  }
}));

export const THeader = styled("th")`
  text-align: left;
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-text-small);
  padding: 20px;
  color: ${(props) => props.theme.palette.grey[300]};
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.palette.common.white};
  z-index: 2;
`;

export const TRow = styled("tr")<{ selected?: number }>`
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  position: relative;
  background-color: ${({ selected, theme }) => (selected ? theme.palette.background.neutral : "transparent")};
  &:hover {
    border-radius: 10px;
    > td {
      background-color: ${({ theme }) => theme.palette.background.neutral} !important;
    }
  }
`;

export const TCol = styled("td")<{
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  hiddenBorder?: boolean;
  selected?: number;
}>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width || "max-content")};
  min-width: ${({ minWidth }) => (typeof minWidth === "number" ? `${minWidth}px` : minWidth || "80px")};
  max-width: ${({ maxWidth }) => (typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth || "unset")};
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  font-family: var(--font-family-text);
  color: ${(props) => props.theme.palette.text.primary};
  padding: 24px 20px;
  background: ${(props) =>
    props.selected ? props.theme.palette.background.neutral : props.theme.palette.common.white};
`;

export const TBody = styled("tbody")`
  position: relative;
`;
export const LoadingWrapper = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const TFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  flexWrap: "wrap",
  color: theme.palette.grey[300],
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    flexDirection: "column"
  }
}));

export const Total = styled(Box)``;

export const TotalNumber = styled("span")`
  color: ${(props) => props.theme.palette.text.primary};
  font-weight: 500;
`;

export const WrappModalScrollBar = styled(Box)(
  ({ theme }) => `
  overflow-y: auto;
  max-height: 70vh;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${theme.palette.grey[300]};
    }
    &::-webkit-scrollbar-track {
      background: ${theme.palette.grey[100]};
    }
  }
`
);

export const Wrapper = styled(Box)<{ maxHeight?: number | string; height: number; loading?: number }>(
  ({ maxHeight, height, theme, loading }) => `
  overflow: scroll;
  height: ${height || 800}px;
  background: ${theme.palette.common.white};
  padding: ${theme.spacing(1)};
  padding-top: 0;
  border-radius: ${theme.spacing(1.5)};
  ${loading ? "overflow-y: hidden;" : ""}
  ${maxHeight ? "max-height:" + (typeof maxHeight === "number" ? maxHeight + "px" : maxHeight) : ""};

  ${theme.breakpoints.down("sm")} {
    padding: 0;
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${theme.palette.grey[300]};
    }
    &::-webkit-scrollbar-track {
      background: ${theme.palette.grey[100]};
    }
  }
`
);

export const TableFullWidth = styled("table")`
  border-collapse: separate;
  border-spacing: 0;
  min-width: 100%;
  width: max-content;
  position: relative;
`;

export const InputNumber = styled("input")<{ length: number }>(({ theme, length }) => ({
  width: length + "ch !important",
  padding: `4px ${theme?.spacing(1)}`,
  marginRight: theme?.spacing(1),
  borderRadius: 4,
  textAlign: "center",
  fontWeight: "bold",
  border: `1px solid ${theme.palette.border.main}`,
  color: theme.palette.grey[400],
  "::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0
  },
  background: "transparent"
}));

export const SelectMui = styled(CustomSelect)(({ theme }) => ({
  borderRadius: "4px",
  fontSize: 14,
  minWidth: 50,
  border: `1px solid ${theme.palette.grey[200]}`,
  color: theme.palette.grey[400],
  "& > div": {
    padding: "2.45px 14px"
  },
  "& > fieldset": {
    top: 2
  },
  background: "transparent",
  "& >svg": {
    top: "calc(50% - 9px)"
  }
}));

export const TableCheckBox = styled(Checkbox)`
  padding: 0px;
  margin: 0px;
`;
export const TableHeaderContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin-bottom: 16px;
`;

export const TableTitle = styled(Typography)`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: ${(props) => props.theme.palette.common.black};
  flex: 1;
  text-align: left;
  padding-top: 20px;
`;

export const ShowedResults = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  color: rgba(102, 112, 133, 1);
`;

export const TableCustomTitle = styled(Box)`
  flex: 1;
  text-align: left;
`;

export const StyledPagination = styled(Pagination)(() => ({
  "ul li > button": {
    width: 24,
    height: 24,
    padding: 0
  }
}));
