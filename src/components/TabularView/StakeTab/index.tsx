import React, { useState } from "react";
import { Tab, Box, useTheme } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { StyledTabList, TitleTab } from "./styles";
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

const StakeTab = () => {
  const [tabActive, setTabActive] = useState<string>("registration");
  const theme = useTheme();
  const tabs: {
    icon: React.ReactNode;
    label: React.ReactNode;
    key: TTabularTabKey;
    component: React.ReactNode;
  }[] = [
    {
      icon: (
        <RegistrationIcon
          fill={tabActive === "registration" ? theme.palette.primary.main : theme.palette.text.hint}
          width={"25px"}
          height={"25px"}
        />
      ),
      label: "Stake Key Registration",
      key: "registration",
      component: <StakeRegistrationTab />,
    },
    {
      icon: (
        <DelegationIcon
          fill={tabActive === "delegation" ? theme.palette.primary.main : theme.palette.text.hint}
          width={"25px"}
          height={"25px"}
        />
      ),
      label: "Delegation History",
      key: "delegation",
      component: <DelegationTab />,
    },
    {
      icon: (
        <RewardsDistributionIcon
          fill={tabActive === "rewards" ? theme.palette.primary.main : theme.palette.text.hint}
          width={"25px"}
          height={"25px"}
        />
      ),
      label: "Rewards Distribution",
      key: "rewards",
      component: <RewardsDistributionTab />,
    },
    {
      icon: (
        <RewardsWithdrawalIcon
          fill={tabActive === "withdrawal-history" ? theme.palette.primary.main : theme.palette.text.hint}
          width={"25px"}
          height={"25px"}
        />
      ),
      label: "Withdrawal History",
      key: "withdrawal-history",
      component: <WithdrawalHistoryTab />,
    },
    {
      icon: (
        <DeredistrationIcon
          fill={tabActive === "deregistration" ? theme.palette.primary.main : theme.palette.text.hint}
          width={"25px"}
          height={"25px"}
        />
      ),
      label: "Deregistration",
      key: "deregistration",
      component: <DeregistrationTab />,
    },
  ];

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
                  <Box display={"flex"} alignItems="center">
                    {Icon}
                    <TitleTab pl={1} active={key === tabActive}>
                      {label}
                    </TitleTab>
                  </Box>
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
