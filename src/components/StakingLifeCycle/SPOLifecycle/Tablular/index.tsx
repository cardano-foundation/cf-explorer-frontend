import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router";

import StakeTab, { StakeTabItem } from "src/components/TabularView/StakeTab";
import { DeredistrationIcon, OperatorRewardIcon, PoolUpdateIcon, RegistrationIcon } from "src/commons/resources";
import { details } from "src/commons/routers";

import TabularOverview from "./TabularOverview";
import PoolRegistrationTab from "./Tabs/PoolRegistrationTab";
import PoolUpdateTab from "./Tabs/PoolUpdateTab";
import DeregsitrationTab from "./Tabs/DeregsitrationTab";
import OperatorRewardTab from "./Tabs/OperatorReward";
interface SPOTabItem extends StakeTabItem {
  key: SPOStep;
  keyCheckShow: string;
}

const tabs: SPOTabItem[] = [
  {
    icon: RegistrationIcon,
    label: "Registration",
    key: "registration",
    component: <PoolRegistrationTab />,
    keyCheckShow: "isRegistration"
  },
  {
    icon: PoolUpdateIcon,
    label: "Pool Update",
    key: "pool-updates",
    component: <PoolUpdateTab />,
    keyCheckShow: "isUpdate"
  },
  {
    icon: OperatorRewardIcon,
    label: "Operator Rewards",
    key: "operator-rewards",
    component: <OperatorRewardTab />,
    keyCheckShow: "isReward"
  },
  {
    icon: DeredistrationIcon,
    label: "Deregistration",
    key: "deregistration",
    component: <DeregsitrationTab />,
    keyCheckShow: "isDeRegistration"
  }
];

interface ITabular {
  renderTabsSPO?: ListTabResponseSPO;
}

const Tabular = ({ renderTabsSPO }: ITabular) => {
  const { poolId = "", tab = "registration" } = useParams<{ poolId: string; tab: SPOStep }>();
  const history = useHistory();

  const onChangeTab = (tab: any) => {
    history.replace(details.spo(poolId, "tabular", tab));
  };

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabsRenderConfig={renderTabsSPO} tabs={tabs} initTab={tab} onChangeTab={onChangeTab} checkshow={true} />
    </Box>
  );
};

export default Tabular;
