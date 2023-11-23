import { Box } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";

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

interface ITabular {
  renderTabsSPO?: ListTabResponseSPO;
}

const Tabular = ({ renderTabsSPO }: ITabular) => {
  const { t } = useTranslation();
  const tabs: SPOTabItem[] = [
    {
      icon: RegistrationIcon,
      label: t("common.registration"),
      key: "registration",
      component: <PoolRegistrationTab />,
      keyCheckShow: "isRegistration"
    },
    {
      icon: PoolUpdateIcon,
      label: t("common.poolUpdate"),
      key: "pool-updates",
      component: <PoolUpdateTab />,
      keyCheckShow: "isUpdate"
    },
    {
      icon: OperatorRewardIcon,
      label: t("common.operatorRewards"),
      key: "operator-rewards",
      component: <OperatorRewardTab />,
      keyCheckShow: "isReward"
    },
    {
      icon: DeredistrationIcon,
      label: t("slc.deregistration"),
      key: "deregistration",
      component: <DeregsitrationTab />,
      keyCheckShow: "isDeRegistration"
    }
  ];
  const { poolId = "", tab } = useParams<{ poolId: string; tab: SPOStep }>();
  const history = useHistory();

  const onChangeTab = (tab: TabStakeDetail) => {
    history.replace(details.spo(poolId, "tabular", tab as SPOStep).replaceAll("//", ""));
  };

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab
        tabsRenderConfig={renderTabsSPO}
        tabs={tabs}
        tabActive={tab}
        onChangeTab={onChangeTab}
        checkshow={true}
      />
    </Box>
  );
};

export default Tabular;
