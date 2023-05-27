import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router";
import {
  DelegationIcon,
  DeredistrationIcon,
  RegistrationIcon,
  RewardsDistributionIcon,
  RewardsWithdrawalIcon
} from "../../../../commons/resources";
import { details } from "../../../../commons/routers";
import StakeTab from "../../../TabularView/StakeTab";
import DelegationTab from "../../../TabularView/StakeTab/Tabs/DelegationTab";
import DeregistrationTab from "../../../TabularView/StakeTab/Tabs/DeregistrationTab";
import RewardsDistributionTab from "../../../TabularView/StakeTab/Tabs/RewardsDistributionTab";
import StakeRegistrationTab from "../../../TabularView/StakeTab/Tabs/StakeRegistrationTab";
import WithdrawalHistoryTab from "../../../TabularView/StakeTab/Tabs/WithdrawalHistoryTab";
import TabularOverview from "../../../TabularView/TabularOverview";
import { ListStakeKeyResponse } from "~/pages/DelegatorLifecycle";
import { useEffect, useState } from "react";

interface ITabularTab {
  icon: React.FC;
  label: React.ReactNode;
  key: TTabularTabKey;
  component: React.ReactNode;
  keyCheckShow: string;
}

const tabs: ITabularTab[] = [
  {
    icon: RegistrationIcon,
    label: "Registration",
    key: "registration",
    component: <StakeRegistrationTab />,
    keyCheckShow: "hasRegistration"
  },
  {
    icon: DelegationIcon,
    label: "Delegation History",
    key: "delegation",
    component: <DelegationTab />,
    keyCheckShow: "hasDelegation"
  },
  {
    icon: RewardsDistributionIcon,
    label: "Rewards Distribution",
    key: "rewards",
    component: <RewardsDistributionTab />,
    keyCheckShow: "hashRewards"
  },
  {
    icon: RewardsWithdrawalIcon,
    label: "Withdrawal History",
    key: "withdrawal-history",
    component: <WithdrawalHistoryTab />,
    keyCheckShow: "hasWithdrawal"
  },
  {
    icon: DeredistrationIcon,
    label: "Deregistration",
    key: "deregistration",
    component: <DeregistrationTab />,
    keyCheckShow: "hasDeRegistration"
  }
];

interface ITabularProps {
  tabsRenderConfig?: ListStakeKeyResponse;
}

const Tabular = ({ tabsRenderConfig }: ITabularProps) => {
  const { stakeId = "", tab = "registration" } = useParams<{ stakeId: string; tab: DelegationStep }>();
  const [listTabs, setListTabs] = useState<ITabularTab[]>(tabs);
  const history = useHistory();

  useEffect(() => {
    if (tabsRenderConfig) {
      const filteredTabs = tabs.filter((tab: ITabularTab) => tabsRenderConfig[tab.keyCheckShow]);
      setListTabs(filteredTabs);
    }
  }, [tabsRenderConfig]);

  if (!tabsRenderConfig) return null;

  const onChangeTab = (tab: any) => {
    history.push(details.staking(stakeId, "tabular", tab));
  };

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={listTabs} initTab={tab} onChangeTab={onChangeTab} />
    </Box>
  );
};

export default Tabular;
