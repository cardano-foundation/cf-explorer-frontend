import { Box } from "@mui/material";
import StakeTab, { StakeTabItem } from "../../../TabularView/StakeTab";
import PoolRegistrationTab from "./Tabs/PoolRegistrationTab";
import PoolUpdateTab from "./Tabs/PoolUpdateTab";
import DeregsitrationTab from "./Tabs/DeregsitrationTab";
import OperatorRewardTab from "./Tabs/OperatorReward";
import CustomIcon from "../../../commons/CustomIcon";
import {
  DeredistrationIcon,
  OperatorRewardIcon,
  PoolUpdateIcon,
  RegistrationIcon,
} from "../../../../commons/resources";
import TabularOverview from "./TabularOverview";
import { useHistory, useParams } from "react-router";
import { details } from "../../../../commons/routers";

interface SPOTabItem extends StakeTabItem {
  key: SPOStep;
}

const tabs: SPOTabItem[] = [
  {
    icon: RegistrationIcon,
    label: "Pool Registration",
    key: "registration",
    component: <PoolRegistrationTab />,
  },
  {
    icon: PoolUpdateIcon,
    label: "Pool Update",
    key: "pool-updates",
    component: <PoolUpdateTab />,
  },
  {
    icon: OperatorRewardIcon,
    label: "Operator Rewards",
    key: "operator-rewards",
    component: <OperatorRewardTab />,
  },
  {
    icon: DeredistrationIcon,
    label: "Deregsitration",
    key: "deregistration",
    component: <DeregsitrationTab />,
  },
];

const Tablular = () => {
  const { poolId = "", tab = "registration" } = useParams<{ poolId: string; tab: SPOStep }>();
  const history = useHistory();

  const onChangeTab = (tab: any) => {
    history.push(details.spo(poolId, "tablular", tab));
  };

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={tabs} initTab={tab} onChangeTab={onChangeTab} />
    </Box>
  );
};

export default Tablular;
