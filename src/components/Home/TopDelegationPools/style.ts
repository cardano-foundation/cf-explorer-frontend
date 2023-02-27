import { Box, LinearProgress, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { BoxRaised } from "../../commons/BoxRaised";
import Table from "../../commons/Table";

export const TopDelegateContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 30px 30px;
  text-align: left;
  @media screen and (max-width: 539px) {
    padding: 20px 15px;
  }
`;

export const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 10px;
`;

export const Title = styled("h3")`
  position: relative;
  text-align: left;
  margin: 0px;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: var(--color-green-light);
  }
`;

export const DelegateTable = styled(Table)`
  overflow-x: auto;
  table {
    // min-width: 1200px;
    tr {
      th {
        background-color: transparent !important;
        border-bottom-width: 2px !important;
        font-size: var(--font-size-text-small) !important;
        color: var(--title-color) !important;
        font-weight: var(--font-weight-bold) !important;

        &::before {
          content: unset !important;
        }
      }
      td {
        cursor: pointer;
        font-size: var(--font-size-text-small);
        border-bottom: 1px solid ${props => props.theme.borderColor};
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
  color: ${props => props.theme.colorBlue} !important;
`;

export const ProgressContainer = styled("div")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const ProgressTitle = styled("div")`
  line-height: 1;
`;

export const StyledProgress = styled("div")<{ value: number; width?: number }>`
  position: relative;
  width: ${props => (typeof props.width === "number" ? `${props.width}px` : props.width || "100%")};
  height: 12px;
  margin-left: 8px;
  background: ${props => props.theme.borderColor};
  border-radius: 6px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 6px;
    width: ${props => props.value}%;
    background: ${props => props.theme.linearGradientGreen};
  }
`;

export const StyledLinearProgress = styled(LinearProgress)`
  display: inline-block;
  width: 100%;
  height: 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
  margin-left: 8px;
  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 8px;
    background: ${props => props.theme.linearGradientGreen};
  }
`;
