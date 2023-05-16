import { TabContext, TabList } from "@mui/lab";
import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { TabContent, TabHeader, TabLabel } from "./styles";
import { useHistory, useParams } from "react-router-dom";
import { details } from "~/commons/routers";

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
    history.push(details.generated_report(newValue));
  };

  return (
    <Box data-testid='report-generated-tabs'>
      <TabContext value={tab || "stake-key"}>
        <TabHeader>
          <Tabs>
            <Box>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                {tabsItem.map((item) => (
                  <Tab
                    key={item.value}
                    value={item.value}
                    label={<TabLabel active={+(tab === item.value)}>{item.label}</TabLabel>}
                  />
                ))}
              </TabList>
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
