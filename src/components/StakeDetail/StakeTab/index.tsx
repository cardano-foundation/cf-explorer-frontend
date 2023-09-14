import React from "react";
import { Tab, Box, useTheme } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  DelegationHistoryIcon,
  StakeKeyHistoryIcon,
  WithdrawalHistoryIcon,
  InstantaneousHistoryIcon,
  TransactionIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";

import DelegationHistoryTab from "./Tabs/DelegationHistoryTab";
import StakeHistoryTab from "./Tabs/StakeHistoryTab";
import WithdrawalHistoryTab from "./Tabs/WithdrawalHistoryTab";
import InstantaneousTab from "./Tabs/InstantaneousTab";
import TransactionTab from "./Tabs/TransactionTab";
import { StyledTabList, TitleTab, WrapperTabList } from "./styles";

const StakeTab = () => {
  const { t } = useTranslation();
  const { stakeId, tabActive = "delegation" } = useParams<{ stakeId: string; tabActive?: TabStakeDetail }>();
  const history = useHistory();
  const theme = useTheme();
  const { isMobile } = useScreen();

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    history.replace({ pathname: details.stake(stakeId || "", tab) }, history.location.state);
  };

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: TabStakeDetail;
    component: React.ReactNode;
  }[] = [
    {
      icon: DelegationHistoryIcon,
      label: t("tab.DelegationHistory"),
      key: "delegation",
      component: <DelegationHistoryTab isMobile={isMobile} />
    },
    {
      icon: StakeKeyHistoryIcon,
      label: t("tab.stakeAddressHistory"),
      key: "stake-key",
      component: <StakeHistoryTab isMobile={isMobile} />
    },
    {
      icon: WithdrawalHistoryIcon,
      label: t("tab.withdrawalHistory"),
      key: "withdrawal",
      component: <WithdrawalHistoryTab />
    },
    {
      icon: InstantaneousHistoryIcon,
      label: t("tab.instantaneousRewards"),
      key: "instantaneous",
      component: <InstantaneousTab />
    },
    {
      icon: TransactionIcon,
      label: t("tab.transactions"),
      key: "transactions",
      component: <TransactionTab />
    }
  ];

  return (
    <Box>
      <TabContext value={tabActive}>
        <WrapperTabList>
          <StyledTabList
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}
            scrollButtons="auto"
            variant="scrollable"
            visibleScrollbar={true}
          >
            {tabs.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                style={{ padding: "12px 0px", marginRight: 40 }}
                label={
                  <Box display={"flex"} alignItems="center">
                    <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light} />
                    <TitleTab pl={1} active={key === tabActive}>
                      {label}
                    </TitleTab>
                  </Box>
                }
              />
            ))}
          </StyledTabList>
        </WrapperTabList>
        {tabs.map((item) => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0 }}>
            {item.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default StakeTab;
