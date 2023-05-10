import { Box } from "@mui/material";
import TabularOverview from "../../../TabularView/TabularOverview";
import StakeTab from "../../../TabularView/StakeTab";
import {
  DelegationIcon,
  DeredistrationIcon,
  RegistrationIcon,
  RewardsDistributionIcon,
  RewardsWithdrawalIcon,
} from "../../../../commons/resources";
import StakeRegistrationTab from "../../../TabularView/StakeTab/Tabs/StakeRegistrationTab";
import DelegationTab from "../../../TabularView/StakeTab/Tabs/DelegationTab";
import RewardsDistributionTab from "../../../TabularView/StakeTab/Tabs/RewardsDistributionTab";
import WithdrawalHistoryTab from "../../../TabularView/StakeTab/Tabs/WithdrawalHistoryTab";
import DeregistrationTab from "../../../TabularView/StakeTab/Tabs/DeregistrationTab";
import { useHistory, useParams } from "react-router";
import { details } from "../../../../commons/routers";

const tabs: {
  icon: React.FC;
  label: React.ReactNode;
  key: TTabularTabKey;
  component: React.ReactNode;
}[] = [
  {
    icon: RegistrationIcon,
    label: "Stake Key Registration",
    key: "registration",
    component: <StakeRegistrationTab />,
  },
  {
    icon: DelegationIcon,
    label: "Delegation History",
    key: "delegation",
    component: <DelegationTab />,
  },
  {
    icon: RewardsDistributionIcon,
    label: "Rewards Distribution",
    key: "rewards",
    component: <RewardsDistributionTab />,
  },
  {
    icon: RewardsWithdrawalIcon,
    label: "Withdrawal History",
    key: "withdrawal-history",
    component: <WithdrawalHistoryTab />,
  },
  {
    icon: DeredistrationIcon,
    label: "Deregistration",
    key: "deregistration",
    component: <DeregistrationTab />,
  },
];
const Tablular = () => {
  const { stakeId = "", tab = "registration" } = useParams<{ stakeId: string; tab: DelegationStep }>();
  const history = useHistory();

  const onChangeTab = (tab: any) => {
    history.push(details.staking(stakeId, "tablular", tab));
  };

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={tabs} initTab={tab} onChangeTab={onChangeTab} />
    </Box>
  );
};

export default Tablular;
