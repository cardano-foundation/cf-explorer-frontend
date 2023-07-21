import { TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";

export const TabLabel = styled(Typography)<{ active: number }>(
  (props) => `
 font-size: 24px;
    font-weight: 700;
    text-transform: capitalize;
    color: ${props.active ? props.theme.palette.grey[400] : props.theme.palette.grey[300]};
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

export const StyledTabList = styled(TabList)`
  display: flex;
  gap: 20px !important;
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-flexContainer {
    gap: 50px;
    ${({ theme }) => theme.breakpoints.down("md")} {
      gap: 30px;
    }
  }
`;

export const StyledTab = styled(Tab)`
  color: ${(props) => props.theme.palette.grey[300]};
  padding: 0;
  &.Mui-selected {
    color: ${(props) => props.theme.palette.text.primary};
  }
`;
