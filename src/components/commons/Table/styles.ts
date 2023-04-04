import { Box, Select, styled } from "@mui/material";

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

export const TFooter = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  color: ${props => props.theme.palette.grey[400]};
  margin-top: 10px;

  @media screen and (max-width: 767px) {
    justify-content: flex-end;
  }
`;

export const Total = styled(Box)`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const TotalNumber = styled("span")`
  color: ${props => props.theme.palette.text.primary};
  font-weight: 500;
`;

export const Wrapper = styled(Box)`
  overflow-x: auto;
`;

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
