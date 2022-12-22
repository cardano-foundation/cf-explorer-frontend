import React from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { ReactComponent as DelegationHistoryIcon } from "../../../commons/resources/icons/delegationHistory.svg";
import { ReactComponent as StateKeyHistoryIcon } from "../../../commons/resources/icons/stateKeyHistory.svg";
import { ReactComponent as WithdrawHistoryIcon } from "../../../commons/resources/icons/withdrawHistory.svg";
import { ReactComponent as InstantaneousHistoryIcon } from "../../../commons/resources/icons/instantaneousHistory.svg";
import { TitleTab } from "./component";
import TableTab from "./TableTab";

const StakeTab = () => {
  const [activeTab, setActiveTab] = React.useState<TabStakeDetail>("delegation");

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    setActiveTab(tab);
  };
  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <Box>
          <Box display={"flex"} alignItems="center">
            <DelegationHistoryIcon fill={activeTab === "delegation" ? "#438F68" : "#98A2B3"} />
            <TitleTab pl={1}>Delegation History</TitleTab>
          </Box>
        </Box>
      ),
      key: "delegation",
      children: <TableTab type={activeTab} />,
    },
    {
      label: (
        <Box>
          <Box display={"flex"} alignItems="center">
            <StateKeyHistoryIcon fill={activeTab === "stakeKey" ? "#438F68" : "#98A2B3"} />
            <TitleTab pl={1}>Stake Key History</TitleTab>
          </Box>
        </Box>
      ),
      key: "stakeKey",
      children: <TableTab type={activeTab} />,
    },
    {
      label: (
        <Box>
          <Box display={"flex"} alignItems="center">
            <WithdrawHistoryIcon fill={activeTab === "withdrawal" ? "#438F68" : "#98A2B3"} />
            <TitleTab pl={1}>Withdrawal History</TitleTab>
          </Box>
        </Box>
      ),
      key: "withdrawal",
      children: <TableTab type={activeTab} />,
    },
    {
      label: (
        <Box>
          <Box display={"flex"} alignItems="center">
            <InstantaneousHistoryIcon fill={activeTab === "instantaneous" ? "#438F68" : "#98A2B3"} />
            <TitleTab pl={1}>Instantaneous Rewards</TitleTab>
          </Box>
        </Box>
      ),
      key: "instantaneous",
      children: <TableTab type={activeTab} />,
    },
  ];

  return (
    <Box mt={4}>
      <TabContext value={activeTab}>
        <Box>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: "#438f68", color: "#438f68" } }}>
            {tabs?.map(item => (
              <Tab key={item.key} label={item.label} value={item.key} />
            ))}
          </TabList>
        </Box>
        {tabs.map(item => (
          <TabPanel key={item.key} value={item.key}>
            {item.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default StakeTab;
