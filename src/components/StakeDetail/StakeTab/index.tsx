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
import { stringify } from "qs";
import useFetchList from "../../../commons/hooks/useFetchList";
import { getPageInfo } from "../../../commons/utils/helper";

enum TABS {
  delegation = "delegation-history",
  stakeKey = "stake-history",
  withdrawal = "withdrawal-history",
  instantaneous = "instantaneous-rewards",
}

type DataTable = DelegationHistory | Instantaneous | StakeHistory | WithdrawalHistory;

const StakeTab = () => {
  const [activeTab, setActiveTab] = React.useState<TabStakeDetail>("delegation");
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<DataTable>(`/stake/${stakeId}/${TABS[activeTab]}`, pageInfo);

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    setActiveTab(tab);
    history.push({ search: stringify({ page: 1, size: 10 }) });
  };

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: keyof typeof TABS;
  }[] = [
    {
      icon: DelegationHistoryIcon,
      label: "Delegation History",
      key: "delegation",
    },
    {
      icon: StateKeyHistoryIcon,
      label: "Stake Key History",
      key: "stakeKey",
    },
    {
      icon: WithdrawHistoryIcon,
      label: "Withdrawal History",
      key: "withdrawal",
    },
    {
      icon: InstantaneousHistoryIcon,
      label: "Instantaneous Rewards",
      key: "instantaneous",
    },
  ];

  return (
    <Box mt={4}>
      <TabContext value={activeTab}>
        <Box style={{ borderBottom: "1px solid rgba(24, 76, 120, 0.1)" }}>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: "#438f68" } }}>
            {tabs?.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={"flex"} alignItems="center">
                      <Icon fill={key === activeTab ? "#438F68" : "#98A2B3"} />
                      <TitleTab pl={1} active={key === activeTab}>
                        {label}
                      </TitleTab>
                    </Box>
                  </Box>
                }
              />
            ))}
          </TabList>
        </Box>
        {tabs.map(item => (
          <TabPanel key={item.key} value={item.key}>
            <TableTab {...fetchData} type={activeTab} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default StakeTab;
