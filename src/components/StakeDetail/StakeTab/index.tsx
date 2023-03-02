import React from "react";
import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReactComponent as DelegationHistoryIcon } from "../../../commons/resources/icons/delegationHistory.svg";
import { ReactComponent as StakeKeyHistoryIcon } from "../../../commons/resources/icons/stateKeyHistory.svg";
import { ReactComponent as WithdrawHistoryIcon } from "../../../commons/resources/icons/withdrawHistory.svg";
import { ReactComponent as InstantaneousHistoryIcon } from "../../../commons/resources/icons/instantaneousHistory.svg";
import { TitleTab } from "./styles";
import { useHistory, useParams } from "react-router-dom";
import DelegationHistoryTab from "./Tabs/DelegationHistoryTab";
import StakeHistoryTab from "./Tabs/StakeHistoryTab";
import WithdrawalHistoryTab from "./Tabs/WithdrawalHistoryTab";
import InstantaneousTab from "./Tabs/InstantaneousTab";
import { details } from "../../../commons/routers";

const tabs: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  key: TabStakeDetail;
  component: React.ReactNode;
}[] = [
  {
    icon: DelegationHistoryIcon,
    label: "Delegation History",
    key: "delegation",
    component: <DelegationHistoryTab />,
  },
  {
    icon: StakeKeyHistoryIcon,
    label: "Stake Key History",
    key: "stake-key",
    component: <StakeHistoryTab />,
  },
  {
    icon: WithdrawHistoryIcon,
    label: "Withdrawal History",
    key: "withdrawal",
    component: <WithdrawalHistoryTab />,
  },
  {
    icon: InstantaneousHistoryIcon,
    label: "Instantaneous Rewards",
    key: "instantaneous",
    component: <InstantaneousTab />,
  },
];

const StakeTab = () => {
  const { stakeId, tabActive = "delegation" } = useParams<{ stakeId: string; tabActive?: TabStakeDetail }>();
  const history = useHistory();

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    history.push({ pathname: details.stake(stakeId || "", tab) });
  };

  return (
    <Box mt={4}>
      <TabContext value={tabActive}>
        <Box style={{ borderBottom: "1px solid rgba(24, 76, 120, 0.1)" }}>
          <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: "#438f68" } }}>
            {tabs.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                label={
                  <Box>
                    <Box display={"flex"} alignItems="center">
                      <Icon fill={key === tabActive ? "#438F68" : "#98A2B3"} />
                      <TitleTab pl={1} active={key === tabActive}>
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
          <TabPanel key={item.key} value={item.key} style={{ padding: 0 }}>
            {item.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default StakeTab;
