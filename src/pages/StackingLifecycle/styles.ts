import { Box, Button, Container, Grid, styled } from "@mui/material";

import { TabLabel } from "src/components/ReportGeneratedTabs/styles";
import Table from "src/components/commons/Table";

export const DashboardCardList = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 45px;
`;

export const DashboardContainer = styled(Container)`
  box-sizing: border-box;
`;

export const DownloadButtonAll = styled(Button)`
  text-transform: capitalize;
  font-weight: 700;
  font-size: 14px;
`;

export const GridContainer = styled(Grid)`
  margin-bottom: 35px;
  & > div > div {
    height: 100%;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    padding-top: 30px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-top: 0px;
  }
`;

export const WrapGridItem = styled(Box)`
  min-width: 270px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-width: 160px;
  }
`;

export const Status = styled("span")<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  padding: 7.5px 11.5px;
  border-radius: 2px;
  text-transform: uppercase;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "EXPIRED":
      case "FAILED":
        return theme.palette.error.light;
      case "GENERATED":
        return theme.palette.success.light;
      case "IN_PROGRESS":
        return theme.palette.warning.light;
      default:
        return theme.palette.success.light;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "EXPIRED":
      case "FAILED":
        return theme.palette.error.main;
      case "GENERATED":
        return theme.palette.success.main;
      case "IN_PROGRESS":
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  }};
`;

export const TextHeadline = styled("span")`
  font-weight: 700;
  font-size: 36px;
  color: ${(props) => props.theme.palette.secondary.main};
  margin-bottom: 14px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 24px;
    line-height: 28.13px;
  }
`;

export const TitleHead = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 0;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterHead = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    justify-content: space-between;
  }
`;
export const StackingLifecycleTable = styled(Table)`
  & > div {
    padding: 0;
    border: none;
  }
`;

export const WrapReportName = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
`;
export const StyledTabLabel = styled(TabLabel)`
  font-size: 18px;
`;
export const StyledContainer = styled(Container)`
  max-width: 95vw !important;
`;
