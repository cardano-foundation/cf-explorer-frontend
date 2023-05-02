import React, { useState } from "react";
import { Tab, Box, useTheme } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { StyledTabList, TabHead, TitleTab } from "./styles";
import WithdrawalHistoryTab from "./Tabs/WithdrawalHistoryTab";
import StakeRegistrationTab from "./Tabs/StakeRegistrationTab";
import DelegationTab from "./Tabs/DelegationTab";
import RewardsDistributionTab from "./Tabs/RewardsDistributionTab";
import DeregistrationTab from "./Tabs/DeregistrationTab";
import {
  RegistrationIcon,
  RewardsWithdrawalIcon,
  DelegationIcon,
  DeredistrationIcon,
  RewardsDistributionIcon,
} from "../../../commons/resources";

export interface StakeTabItem {
  icon: React.ReactNode;
  label: React.ReactNode;
  key: string;
  component: React.ReactNode;
}
export interface StackTabProps {
  tabs: StakeTabItem[];
  initTab?: string;
}

const StakeTab: React.FC<StackTabProps> = ({ tabs, initTab = "registration" }) => {
  const [tabActive, setTabActive] = useState<string>(initTab);
  const theme = useTheme();
  
  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    setTabActive(tab);
  };
  
  return (
    <Box mt={4}>
      <TabContext value={tabActive}>
        <Box sx={{ borderBottom: theme => `1px solid ${theme.palette.border.secondary}` }}>
          <StyledTabList
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}
          >
            {tabs.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                style={{ padding: "12px 0px", marginRight: 40 }}
                label={
                  <TabHead active={+(key === tabActive)} display={"flex"} alignItems="center">
                    {Icon}
                    <TitleTab pl={1} active={+(key === tabActive)}>
                      {label}
                    </TitleTab>
                  </TabHead>
                }
              />
            ))}
          </StyledTabList>
        </Box>
        {tabs.map(item => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0 }}>
            {item.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default StakeTab;
