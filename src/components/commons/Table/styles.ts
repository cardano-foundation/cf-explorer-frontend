import { Box, Checkbox, alpha, Select, Typography, styled, Pagination } from "@mui/material";

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
  color: ${props => props.theme.palette.text.hint};
  font-size: var(--font-size-text-x-large);
`;

export const THead = styled("thead")`
  padding-bottom: 10px;
`;

export const THeader = styled("th")`
  text-align: left;
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-text-small);
  border-bottom: 1px solid ${props => props.theme.palette.border.main};
  padding: 20px;
  color: ${props => props.theme.palette.grey[300]};
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;
`;

export const TRow = styled("tr")<{ selected?: number }>`
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  background-color: ${({ selected, theme }) => (selected ? theme.palette.background.neutral : "transparent")};
  &:hover {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.palette.background.neutral};
  }
`;

export const TCol = styled("td")<{
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  hiddenBorder?: boolean;
}>`
  border-bottom: ${({ hiddenBorder, theme }) => (hiddenBorder ? "none" : `1px solid ${theme.palette.grey[200]}`)};
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width || "max-content")};
  min-width: ${({ minWidth }) => (typeof minWidth === "number" ? `${minWidth}px` : minWidth || "80px")};
  max-width: ${({ maxWidth }) => (typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth || "unset")};
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  font-family: var(--font-family-text);
  color: ${props => props.theme.palette.text.primary};
  padding: 24px 20px;
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
  color: theme.palette.grey[400],
  marginTop: "10px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "flex-start",
  },
}));

export const Total = styled(Box)``;

export const TotalNumber = styled("span")`
  color: ${props => props.theme.palette.text.primary};
  font-weight: 500;
`;

export const Wrapper = styled(Box)<{ maxHeight?: number | string }>(
  ({ maxHeight, theme }) => `
  overflow-x: auto;
  background: ${theme.palette.common.white};
  padding: ${theme.spacing(1)};
  padding-top: 0;
  border-radius: ${theme.spacing(1.5)};
  box-shadow: 0 0.5rem 1.2rem rgba(82, 85, 92, 0.15);
  border: 1px solid ${alpha(theme.palette.common.black, 0.1)};
  ${maxHeight ? "max-height:" + (typeof maxHeight === "number" ? maxHeight + "px" : maxHeight) : ""};
`
);

export const TableFullWidth = styled("table")`
  border-collapse: separate;
  border-spacing: 0;
  min-width: 100%;
  width: max-content;
`;

export const InputNumber = styled("input")<{ length: number }>(({ theme, length }) => ({
  width: length + "ch !important",
  padding: `4px ${theme?.spacing(1)}`,
  marginRight: theme?.spacing(1),
  borderRadius: 4,
  textAlign: "center",
  fontWeight: "bold",
  border: `1px solid ${theme.palette.border.main}`,
  "::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0,
  },
}));

export const SelectMui = styled(Select)(({ theme }) => ({
  fontWeight: "bold",
  width: 60,
  height: 42,
  padding: 0,
  textAlign: "center",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.border.main,
    height: 40,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.border.main,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.border.main,
  },
  ".MuiSelect-select": {
    paddingRight: "10px !important",
    paddingLeft: "0px !important",
  },
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
  color: #000;
  flex: 1;
  text-align: left;
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

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  "ul li > button": {
    width: 24,
    height: 24,
    padding: 0,
  }
}));