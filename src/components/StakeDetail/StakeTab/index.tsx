import React from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { ReactComponent as DelegationHistoryIcon } from "../../../commons/resources/icons/delegationHistory.svg";
import { ReactComponent as StateKeyHistoryIcon } from "../../../commons/resources/icons/stateKeyHistory.svg";
import { ReactComponent as WithdrawHistoryIcon } from "../../../commons/resources/icons/withdrawHistory.svg";
import { ReactComponent as InstantaneousHistoryIcon } from "../../../commons/resources/icons/instantaneousHistory.svg";
import { TitleTab } from "./component";
import TableTab from "./TableTab";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";

interface StakeTabProps {
  setActiveTab: (v: TabStakeDetail) => void;
  activeTab: TabStakeDetail;
  data: (DelegationHistory | Instantaneous | StakeHistory | WithdrawalHistory)[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  currentPage: number;
  total: number;
}

const StakeTab: React.FC<StakeTabProps> = ({
  activeTab,
  setActiveTab,
  data,
  error,
  initialized,
  loading,
  currentPage,
  total,
}) => {
  const history = useHistory();

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    setActiveTab(tab);
    setQuery({ page: 1, size: 10 });
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
      children: (
        <TableTab
          total={total}
          currentPage={currentPage}
          loading={loading}
          error={error}
          initialized={initialized}
          type={activeTab}
          data={data}
        />
      ),
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
      children: (
        <TableTab
          total={total}
          currentPage={currentPage}
          loading={loading}
          error={error}
          initialized={initialized}
          type={activeTab}
          data={data}
        />
      ),
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
      children: (
        <TableTab
          total={total}
          currentPage={currentPage}
          loading={loading}
          error={error}
          initialized={initialized}
          type={activeTab}
          data={data}
        />
      ),
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
      children: (
        <TableTab
          total={total}
          currentPage={currentPage}
          loading={loading}
          error={error}
          initialized={initialized}
          type={activeTab}
          data={data}
        />
      ),
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
