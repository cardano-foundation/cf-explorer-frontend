import { TabPanel } from "@mui/lab";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";

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

export const StyledTabLabel = styled(Typography)<{ active: number }>(
  (props) => `
  font-size: 18px;
    font-weight: 700;
    text-transform: capitalize;
    color: ${props.active ? props.theme.palette.primary.main : props.theme.palette.secondary.light};
`
);

export const TabContent = styled(TabPanel)`
  padding: 0px;
`;

export const TabHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .MuiTabs-indicator {
    height: 4px;
  }
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    ${({ theme }) => theme.breakpoints.down("md")} {
      gap: 30px;
    }
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    border-bottom: 1px solid ${(props) => props.theme.palette.border.main};
    width: 100%;
  }
`;

export const StyledTab = styled(Tab)`
  color: ${(props) => props.theme.palette.secondary.main};
  padding: 0;
  &.Mui-selected {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;
export const WrapFilterDescription = styled("span")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.secondary.light,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12
  }
}));
