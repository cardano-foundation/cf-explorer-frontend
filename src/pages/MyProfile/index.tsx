import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as SettingIcon } from "../../commons/resources/icons/setting.svg";
import { ReactComponent as FileSearch } from "../../commons/resources/icons/file-search.svg";
import { TabTitle, WrapTab } from "./styles";
import OverviewTab from "../../components/Account/OverviewTab";
import AccountSettingTab from "../../components/Account/AccountSettingTab";

const ContractDetailContent: React.FC = () => {
  const [tabActive, setTabActive] = useState<"overview" | "setting">("overview");

  const handleChange = (event: React.SyntheticEvent, tab: "overview" | "setting") => {
    setTabActive(tab);
  };

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <TabTitle className={tabActive === "overview" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <FileSearch fill={tabActive === "overview" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Overview</Box>
          </Box>
        </TabTitle>
      ),
      key: "overview",
      children: <OverviewTab />,
    },
    {
      label: (
        <TabTitle className={tabActive === "setting" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <SettingIcon fill={tabActive === "setting" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Account settings & Profile</Box>
          </Box>
        </TabTitle>
      ),
      key: "setting",
      children: <AccountSettingTab />,
    },
  ];

  return (
    <TabContext value={tabActive}>
      <Box>
        <TabList
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "#438f68", color: "#438f68", height: "3px" } }}
        >
          {tabs?.map(item => (
            <WrapTab key={item.key} label={item.label} value={item.key} />
          ))}
        </TabList>
      </Box>
      {tabs.map(item => (
        <TabPanel sx={{ padding: "25px 0", borderTop: "1px solid rgba(24, 76, 120, 0.1)" }} key={item.key} value={item.key}>
          {item.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default ContractDetailContent;
