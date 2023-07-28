import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router";

import {
  DelegationIcon,
  DeredistrationIcon,
  RegistrationIcon,
  RewardsDistributionIcon,
  RewardsWithdrawalIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import StakeTab from "src/components/TabularView/StakeTab";
import DelegationTab from "src/components/TabularView/StakeTab/Tabs/DelegationTab";
import DeregistrationTab from "src/components/TabularView/StakeTab/Tabs/DeregistrationTab";
import RewardsDistributionTab from "src/components/TabularView/StakeTab/Tabs/RewardsDistributionTab";
import StakeRegistrationTab from "src/components/TabularView/StakeTab/Tabs/StakeRegistrationTab";
import WithdrawalHistoryTab from "src/components/TabularView/StakeTab/Tabs/WithdrawalHistoryTab";
import TabularOverview from "src/components/TabularView/TabularOverview";

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
  const history = useHistory();

  if (!tabsRenderConfig) return null;

  const onChangeTab = (tab: any) => {
    history.replace(details.staking(stakeId, "tabular", tab));
  };

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab
        tabsRenderConfig={tabsRenderConfig}
        tabs={tabs}
        initTab={tab}
        onChangeTab={onChangeTab}
        checkshow={true}
      />
    </Box>
  );
};

export default Tabular;
