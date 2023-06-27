import React from "react";
import { TabContext } from "@mui/lab";
import { Box, Tabs } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

import { details } from "src/commons/routers";

import { StyledTab, StyledTabs, TabContent, TabHeader, TabLabel } from "./styles";

export interface TabsItem {
  value: string;
  label: string;
  component: React.ReactNode;
}

interface ReportGeneratedProps {
  tabsItem: TabsItem[];
}

const ReportGeneratedTabs: React.FC<ReportGeneratedProps> = ({ tabsItem }) => {
  const { tab } = useParams<{ tab: "stake-key" | "pools" }>();
  const history = useHistory();
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    history.replace(details.dashboard(newValue));
  };

  return (
    <Box data-testid="report-generated-tabs">
      <TabContext value={tab || "stake-key"}>
        <TabHeader>
          <Tabs style={{ flex: 1 }}>
            <Box width={"100%"}>
              <StyledTabs
                value={tab || "stake-key"}
                onChange={handleChange}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.border.main}` }}
                TabIndicatorProps={{ sx: { backgroundColor: (theme) => theme.palette.primary.main, height: 4 } }}
                scrollButtons="auto"
                variant="scrollable"
                aria-label="lab API tabs example"
              >
                {tabsItem.map((item) => (
                  <StyledTab
                    key={item.value}
                    value={item.value}
                    label={<TabLabel active={+(tab === item.value)}>{item.label}</TabLabel>}
                  />
                ))}
              </StyledTabs>
            </Box>
          </Tabs>
        </TabHeader>

        {tabsItem.map((item) => (
          <TabContent key={item.value} value={item.value}>
            {item.component}
          </TabContent>
        ))}
      </TabContext>
    </Box>
  );
};

export default ReportGeneratedTabs;
