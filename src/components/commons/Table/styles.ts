import { Box, Select, styled, Theme } from "@mui/material";

export const Empty = styled(Box)`
  text-align: center;
  padding: 30px 0;
  background: #00000080;
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
  background: #e7e8eb;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: ${props => props.theme.textColorPale};
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
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding: 20px 20px 25px;
  color: ${props => props.theme.titleColor};
`;

export const TRow = styled("tr")<{ selected?: number }>`
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  background-color: ${props => (props.selected ? "#ECECEC " : "transparent")};
  &:hover {
    border-radius: 10px;
    background-color: ${props => (props.selected ? "#ECECEC " : "#ededed")};
  }
`;

export const TCol = styled("td")<{ width?: number | string; minWidth?: number | string; maxWidth?: number | string }>`
  border-bottom: 1px solid ${props => props.theme.borderColor};
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width || "max-content%")};
  min-width: ${({ minWidth }) => (typeof minWidth === "number" ? `${minWidth}px` : minWidth || "80px")};
  max-width: ${({ maxWidth }) => (typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth || "unset")};
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  font-family: var(--font-family-text);
  color: ${props => props.theme.textColor};
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
  color: ${props => props.theme.textColorPale};
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
  color: ${props => props.theme.textColor};
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

export const InputNumber = styled("input")(({ theme, length }: { length: number; theme?: Theme }) => ({
  width: length + "ch !important",
  padding: `4px ${theme?.spacing(1)}`,
  marginRight: theme?.spacing(1),
  borderRadius: 4,
  textAlign: "center",
  fontWeight: "bold",
  border: "1px solid rgba(227, 229, 233, 1)",
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
    borderColor: "rgba(227, 229, 233, 1)",
    height: 40,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(227, 229, 233, 1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(227, 229, 233, 1)",
  },
  ".MuiSelect-select": {
    paddingRight: "10px !important",
    paddingLeft: "0px !important",
  },
}));
