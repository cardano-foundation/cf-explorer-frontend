import { TabContext, TabList, TabPanel } from "@mui/lab";
import { alpha, Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as SettingIcon } from "../../commons/resources/icons/setting.svg";
import { ReactComponent as FileSearch } from "../../commons/resources/icons/file-search.svg";
import { TabLabel, TabTitle, WrapTab } from "./styles";
import OverviewTab from "../../components/Account/OverviewTab";
import AccountSettingTab from "../../components/Account/AccountSettingTab";

const MyProfile: React.FC = () => {
  const [tabActive, setTabActive] = useState<"overview" | "setting">("overview");
  const theme = useTheme();
  useEffect(() => {
    document.title = `My Profile | Cardano Explorer`;
  }, []);
  const handleChange = (event: React.SyntheticEvent, tab: "overview" | "setting") => {
    setTabActive(tab);
  };

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <TabTitle className={tabActive === "overview" ? "active" : ""}>
          <Box display={"flex"} alignItems='center'>
            <FileSearch fill={tabActive === "overview" ? theme.palette.primary.main : theme.palette.text.hint} />
            <TabLabel pl={1}>Overview</TabLabel>
          </Box>
        </TabTitle>
      ),
      key: "overview",
      children: <OverviewTab handleChangeTab={setTabActive} />
    },
    {
      label: (
        <TabTitle className={tabActive === "setting" ? "active" : ""}>
          <Box display={"flex"} alignItems='center'>
            <SettingIcon fill={tabActive === "setting" ? theme.palette.primary.main : theme.palette.text.hint} />
            <TabLabel pl={1}>Account settings & Profile</TabLabel>
          </Box>
        </TabTitle>
      ),
      key: "setting",
      children: <AccountSettingTab />
    }
  ];

  return (
    <TabContext value={tabActive}>
      <Box>
        <TabList
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: theme.palette.primary.main, color: theme.palette.primary.main, height: 3 }
          }}
        >
          {tabs?.map((item) => (
            <WrapTab key={item.key} label={item.label} value={item.key} />
          ))}
        </TabList>
      </Box>
      {tabs.map((item) => (
        <TabPanel
          sx={{ padding: "25px 0", borderTop: `1px solid ${alpha(theme.palette.green[800], 0.1)}` }}
          key={item.key}
          value={item.key}
        >
          {item.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default MyProfile;
