import { Box } from "@mui/material";
import StakeTab, { StakeTabItem } from "../../../TabularView/StakeTab";
import PoolRegistrationTab from "./Tabs/PoolRegistrationTab";
import ProtocolUpdateTab from "./Tabs/ProtocolUpdateTab";
import DeregsitrationTab from "./Tabs/DeregsitrationTab";
import RewardsDistributionTab from "./Tabs/RewardsDistributionTab";
import CustomIcon from "../../../commons/CustomIcon";
import { DeredistrationIcon, OperatorRewardIcon, PoolUpdateIcon, RegistrationIcon } from "../../../../commons/resources";
import TabularOverview from "./TabularOverview";

const tabs: StakeTabItem[] = [
      {
        icon: (
          <CustomIcon icon={RegistrationIcon} width={26} fill="currentColor" />
        ),
        label: "Pool Registration",
        key: "poolRegistration",
        component: <PoolRegistrationTab />,
      },
      {
        icon: (
          <CustomIcon icon={PoolUpdateIcon} width={26} fill="currentColor" />
        ),
        label: "Protocol Update",
        key: "protocolUpdate",
        component: <ProtocolUpdateTab />,
      },
      {
        icon: (
          <CustomIcon icon={OperatorRewardIcon} width={26} fill="currentColor" />
        ),
        label: "Rewards Distribution",
        key: "rewardDistribution",
        component: <RewardsDistributionTab />,
      },
      {
        icon: (
          <CustomIcon icon={DeredistrationIcon} width={26} fill="currentColor" />
        ),
        label: "Deregsitration",
        key: "deregsitration",
        component: <DeregsitrationTab />,
      },
    ];

const Tablular = () => {
  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={tabs} initTab="poolRegistration"/>
    </Box>
  );
};

export default Tablular;
