import { Box } from "@mui/material";
import TabularOverview from "../../../TabularView/TabularOverview";
import StakeTab from "../../../TabularView/StakeTab";
import { DelegationIcon, DeredistrationIcon, RegistrationIcon, RewardsDistributionIcon, RewardsWithdrawalIcon } from "../../../../commons/resources";
import StakeRegistrationTab from "../../../TabularView/StakeTab/Tabs/StakeRegistrationTab";
import DelegationTab from "../../../TabularView/StakeTab/Tabs/DelegationTab";
import RewardsDistributionTab from "../../../TabularView/StakeTab/Tabs/RewardsDistributionTab";
import WithdrawalHistoryTab from "../../../StakeDetail/StakeTab/Tabs/WithdrawalHistoryTab";
import DeregistrationTab from "../../../TabularView/StakeTab/Tabs/DeregistrationTab";
const tabs: {
  icon: React.ReactNode;
  label: React.ReactNode;
  key: TTabularTabKey;
  component: React.ReactNode;
}[] = [
  {
    icon: (
      <RegistrationIcon
        // fill={tabActive === "registration" ? theme.palette.primary.main : theme.palette.text.hint}
        width={"25px"}
        height={"25px"}
      />
    ),
    label: "Stake Key Registration",
    key: "registration",
    component: <StakeRegistrationTab />,
  },
  {
    icon: (
      <DelegationIcon
        // fill={tabActive === "delegation" ? theme.palette.primary.main : theme.palette.text.hint}
        width={"25px"}
        height={"25px"}
      />
    ),
    label: "Delegation History",
    key: "delegation",
    component: <DelegationTab />,
  },
  {
    icon: (
      <RewardsDistributionIcon
        // fill={tabActive === "rewards" ? theme.palette.primary.main : theme.palette.text.hint}
        width={"25px"}
        height={"25px"}
      />
    ),
    label: "Rewards Distribution",
    key: "rewards",
    component: <RewardsDistributionTab />,
  },
  {
    icon: (
      <RewardsWithdrawalIcon
        // fill={tabActive === "withdrawal-history" ? theme.palette.primary.main : theme.palette.text.hint}
        width={"25px"}
        height={"25px"}
      />
    ),
    label: "Withdrawal History",
    key: "withdrawal-history",
    component: <WithdrawalHistoryTab />,
  },
  {
    icon: (
      <DeredistrationIcon
        // fill={tabActive === "deregistration" ? theme.palette.primary.main : theme.palette.text.hint}
        width={"25px"}
        height={"25px"}
      />
    ),
    label: "Deregistration",
    key: "deregistration",
    component: <DeregistrationTab />,
  },
];
const Tablular = () => {
  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={tabs}/>
    </Box>
  );
};

export default Tablular;
