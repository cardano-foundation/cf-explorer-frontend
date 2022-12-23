import React from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { ReactComponent as DelegationHistoryIcon } from "../../../commons/resources/icons/delegationHistory.svg";
import { ReactComponent as StateKeyHistoryIcon } from "../../../commons/resources/icons/stateKeyHistory.svg";
import { ReactComponent as WithdrawHistoryIcon } from "../../../commons/resources/icons/withdrawHistory.svg";
import { ReactComponent as InstantaneousHistoryIcon } from "../../../commons/resources/icons/instantaneousHistory.svg";
import { TitleTab } from "./component";
import TableTab from "./TableTab";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse, stringify } from "qs";
import useFetchList from "../../../commons/hooks/useFetchList";

const StakeTab = () => {
  const [activeTab, setActiveTab] = React.useState<TabStakeDetail>("delegation");
  const history = useHistory();
  const { search } = useLocation();
  const { stakeId } = useParams<{ stakeId: string }>();
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    setActiveTab(tab);
    setQuery({ page: 1, size: 10 });
  };

  const { data, loading, error, initialized, total, currentPage } = useFetchList<
    DelegationHistory | Instantaneous | StakeHistory | WithdrawalHistory
  >(`/stake/${stakeId}/${apiPath[activeTab]}`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

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
const apiPath = {
  delegation: "delegation-history",
  stakeKey: "stake-history",
  withdrawal: "withdrawal-history",
  instantaneous: "instantaneous-rewards",
};
