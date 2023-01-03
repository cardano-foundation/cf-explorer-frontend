import { Box, styled } from "@mui/material";

export const Empty = styled(Box)`
  text-align: center;
  padding: 30px 0;
  background: #e7e8eb;
  position: relative;
  top: -15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const EmtyImage = styled("img")`
  width: auto;
  height: 200px;
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
  text-overflow: clip;
  overflow: hidden;
  text-align: left;
  font-family: var(--font-family-text);
  color: ${props => props.theme.textColor};
  padding: 24px 20px;
`;
export const TBody = styled("tbody")``;

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
  font-weight: var(--font-weight-bold);
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
