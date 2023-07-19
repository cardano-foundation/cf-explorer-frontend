import { alpha, Box, LinearProgress, styled } from "@mui/material";
import { Link } from "react-router-dom";

import { BoxRaised } from "src/components/commons/BoxRaised";
import Table from "src/components/commons/Table";

export const TopDelegateContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 20px;
  text-align: left;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 15px;
  }
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 10px;
`;

export const Title = styled("h3")`
  position: relative;
  text-align: left;
  margin: 0px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.grey[400]};
  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const Actions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 15,
  position: "relative"
}));

export const TimeDuration = styled("small")(({ theme }) => ({
  color: theme.palette.grey[300],
  display: "block",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

export const TimeDurationSm = styled("small")(({ theme }) => ({
  color: theme.palette.grey[300],
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    marginBottom: "0.5rem"
  }
}));

export const DelegateTable = styled(Table)`
  & > div {
    overflow-y: hidden;
    padding: 0;
    border: none;
  }
  * {
    box-shadow: none !important;
  }
  table {
    tr {
      th {
        background-color: transparent !important;
        border-bottom-width: 2px !important;
        font-size: var(--font-size-text-small) !important;
        color: ${({ theme }) => theme.palette.text.hint} !important;
        font-weight: var(--font-weight-bold) !important;

        &::before {
          content: unset !important;
        }
      }
      td {
        cursor: pointer;
        font-size: var(--font-size-text-small);
        border-bottom: 1px solid ${(props) => props.theme.palette.border.main};
        border-radius: 0 !important;
      }
      &:last-child {
        td {
          border-bottom: none;
        }
      }
    }
    tbody {
      top: 0 !important;
    }
  }
`;

export const PoolName = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const ProgressContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const ProgressTitle = styled("div")`
  line-height: 1;
`;

export const StyledProgress = styled("div")<{ value: number; width?: number }>`
  position: relative;
  width: ${(props) => (typeof props.width === "number" ? `${props.width}px` : props.width || "100%")};
  height: 12px;
  margin-left: 8px;
  background: ${(props) => props.theme.palette.grey[200]};
  border-radius: 6px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 6px;
    width: ${(props) => props.value}%;
    background: ${(props) => props.theme.palette.gradient[0]};
  }
`;

export const StyledLinearProgress = styled(LinearProgress)<{ saturation: number }>`
  display: inline-block;
  width: 150px;
  height: 8px;
  border-radius: 8px;
  background: ${(props) => alpha(props.theme.palette.grey[400], 0.1)};
  margin-left: 8px;
  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 8px;
    background: ${({ theme, saturation }) => (saturation > 100 ? theme.palette.red[100] : theme.palette.green[200])};
  }
`;

export const SubHeader = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.palette.grey[300]};
  margin-bottom: 6px;
`;
