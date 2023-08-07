import React, { useState } from "react";
import { Tab, Box, useTheme } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import CustomTooltip from "src/components/commons/CustomTooltip";
import CustomTabTitle from "src/components/commons/CustomTabTitle";

import { StyledTabList } from "./styles";

export interface StakeTabItem {
  icon: React.FC;
  label: React.ReactNode;
  key: string;
  component: React.ReactNode;
  keyCheckShow?: string;
}
export interface StackTabProps {
  checkshow?: boolean;
  tabs: StakeTabItem[];
  initTab?: string;
  onChangeTab?: (tab: TabStakeDetail) => void;
  tabsRenderConfig?: ListStakeKeyResponse | ListTabResponseSPO;
}

const StakeTab: React.FC<StackTabProps> = ({
  tabs,
  initTab = "registration",
  onChangeTab,
  tabsRenderConfig,
  checkshow
}) => {
  const [tabActive, setTabActive] = useState<string>(initTab);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    if (checkshow && tabsRenderConfig && !tabsRenderConfig[tabs.find((t) => t.key === tab)?.keyCheckShow || ""]) return;
    setTabActive(tab);
    onChangeTab?.(tab);
  };

  return (
    <Box mt={4}>
      <TabContext value={tabActive}>
        <Box sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary[200]}` }} marginBottom="15px">
          <StyledTabList
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}
            scrollButtons="auto"
            variant="scrollable"
            visibleScrollbar={true}
          >
            {tabs.map(({ icon: Icon, key, label, keyCheckShow }) => (
              <Tab
                key={key}
                value={key}
                style={{ padding: "12px 0px", marginRight: 40 }}
                label={
                  <CustomTooltip
                    title={
                      !checkshow || (tabsRenderConfig && tabsRenderConfig[keyCheckShow || ""])
                        ? undefined
                        : "There is no record at this time"
                    }
                  >
                    <CustomTabTitle
                      disabled={!(!checkshow || (tabsRenderConfig && tabsRenderConfig[keyCheckShow || ""]))}
                      labelProps={{ fontSize: "1.125rem !important" }}
                      iconProps={{
                        fill: key === "poolSize" ? "none" : "currentColor",
                        stroke: key === "poolSize" ? "currentColor" : "none",
                        width: 25
                      }}
                      active={key === tabActive}
                      icon={Icon}
                    >
                      {label}
                    </CustomTabTitle>
                  </CustomTooltip>
                }
              />
            ))}
          </StyledTabList>
        </Box>
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
