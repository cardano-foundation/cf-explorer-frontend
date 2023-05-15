import { TabContext, TabList } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { TabContent, TabHeader, TabLabel } from './styles';
import { DownloadButtonAll } from '../../pages/StackingLifecycle/styles';
import { DownloadWhiteIC } from '../../commons/resources';

export interface TabsItem {
  value: string;
  label: string;
  component: React.ReactNode;
}

interface ReportGeneratedProps {
  tabsItem: TabsItem[];
}

const ReportGeneratedTabs: React.FC<ReportGeneratedProps> = ({ tabsItem }) => {
  const [value, setValue] = useState('1');

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
