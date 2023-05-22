import { Box } from "@mui/material";
import StakeTab, { StakeTabItem } from "../../../TabularView/StakeTab";
import PoolRegistrationTab from "./Tabs/PoolRegistrationTab";
import ProtocolUpdateTab from "./Tabs/ProtocolUpdateTab";
import DeregsitrationTab from "./Tabs/DeregsitrationTab";
import RewardsDistributionTab from "./Tabs/RewardsDistributionTab";
import CustomIcon from "../../../commons/CustomIcon";
import {
  DeredistrationIcon,
  OperatorRewardIcon,
  PoolUpdateIcon,
  RegistrationIcon,
} from "../../../../commons/resources";
import TabularOverview from "./TabularOverview";

const tabs: StakeTabItem[] = [
  {
    icon: RegistrationIcon,
    label: "Pool Registration",
    key: "poolRegistration",
    component: <PoolRegistrationTab />,
  },
  {
    icon: PoolUpdateIcon,
    label: "Pool Update",
    key: "protocolUpdate",
    component: <ProtocolUpdateTab />,
  },
  {
    icon: OperatorRewardIcon,
    label: "Rewards Distribution",
    key: "rewardDistribution",
    component: <RewardsDistributionTab />,
  },
  {
    icon: DeredistrationIcon,
    label: "Deregsitration",
    key: "deregsitration",
    component: <DeregsitrationTab />,
  },
];

const Tablular = () => {
  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={tabs} initTab="poolRegistration" />
    </Box>
  );
};

export default Tablular;
