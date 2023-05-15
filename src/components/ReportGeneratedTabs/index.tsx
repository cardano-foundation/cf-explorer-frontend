import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TabContent, TabHeader, TabLabel } from "./styles";
import { DownloadButtonAll } from "../../pages/StackingLifecycle/styles";
import { DownloadWhiteIC } from "../../commons/resources";
import { useHistory, useLocation, useParams } from "react-router-dom";

export interface TabsItem {
  value: string;
  label: string;
  component: React.ReactNode;
}

interface ReportGeneratedProps {
  tabsItem: TabsItem[];
  defaultTab: string;
}

const ReportGeneratedTabs: React.FC<ReportGeneratedProps> = ({ tabsItem, defaultTab }) => {
  const { search } = useLocation();
  const history = useHistory();
  const tab = new URLSearchParams(search).get("tab");
  const [value, setValue] = useState(tab ?? defaultTab);

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    history.push("/report-generated?tab=" + newValue);
  };

  useEffect(() => {
    setValue(tab ?? defaultTab);
  }, [tab]);
  
  return (
    <Box data-testid="report-generated-tabs">
      <TabContext value={value}>
        <TabHeader>
          <Tabs>
            <Box>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                {tabsItem.map((item) => (
                  <Tab
                    key={item.value}
                    value={item.value}
                    label={<TabLabel active={value === item.value}>{item.label}</TabLabel>}
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
