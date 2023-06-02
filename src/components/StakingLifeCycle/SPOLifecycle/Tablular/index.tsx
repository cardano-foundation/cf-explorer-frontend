import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router";

import StakeTab, { StakeTabItem } from "src/components/TabularView/StakeTab";
import { DeredistrationIcon, OperatorRewardIcon, PoolUpdateIcon, RegistrationIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { ListTabResponseSPO } from "src/pages/SPOLifecycle";

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

  const [listTabs, setListTabs] = useState<SPOTabItem[]>(tabs);

  const onChangeTab = (tab: any) => {
    history.replace(details.spo(poolId, "tabular", tab));
  };

  useEffect(() => {
    if (renderTabsSPO) {
      const filteredList = tabs.filter((tab: SPOTabItem) => renderTabsSPO[tab.keyCheckShow]);
      setListTabs(filteredList);
    }
  }, [renderTabsSPO]);

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={listTabs} initTab={tab} onChangeTab={onChangeTab} />
    </Box>
  );
};

export default Tabular;
