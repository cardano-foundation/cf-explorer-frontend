import { Box, LinearProgress, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { BoxRaised } from "../../commons/BoxRaised";
import Table from "../../commons/Table";

export const TopDelegateContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 24px 30px;
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
  margin-bottom: 0px;

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

export const SeemoreButton = styled(Link)<{ mobile?: boolean }>`
  display: ${props => (props.mobile ? "none" : "block")};
  text-align: center;
  height: auto;
  @media screen and (max-width: 539px) {
    display: ${props => (props.mobile ? "block" : "none")};
    margin-top: ${props => (props.mobile ? 20 : 0)}px;
  }
`;

export const SeemoreText = styled("small")`
  display: block;
  width: max-content;
  margin: auto;
  padding: 6.5px 20px;
  border: 2px solid ${props => props.theme.colorGreenLight};
  border-radius: 5px;
  color: ${props => props.theme.colorGreenLight};
  font-weight: var(--font-weight-bold);
`;

export const DelegateTable = styled(Table)`
  overflow-x: auto;
  table {
    min-width: 1200px;
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
        font-size: var(--font-size-text);
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

export const PriceRate = styled("div")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  font-weight: var(--font-weight-bold);
  color: ${props => props.theme.colorRed};
`;
export const ImageRate = styled("img")<{ up: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
`;
export const PriceValue = styled("span")<{ up: boolean }>`
  color: ${props => (props.up ? props.theme.colorGreen : props.theme.colorRed)};
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

export const DetailButton = styled(Link)`
  display: inline-block;
  padding: 6.5px 20px;
  background: ${props => props.theme.textColor};
  color: ${props => props.theme.textColorReverse}!important;
  border-radius: 6px;
  font-weight: var(--font-weight-bold);
`;
