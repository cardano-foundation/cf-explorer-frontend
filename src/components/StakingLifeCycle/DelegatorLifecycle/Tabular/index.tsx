import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
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

interface ITabularProps {
  tabsRenderConfig?: ListStakeKeyResponse;
}

const Tabular = ({ tabsRenderConfig }: ITabularProps) => {
  const { t } = useTranslation();
  const { stakeId = "", tab = "" } = useParams<{ stakeId: string; tab: DelegationStep }>();
  const history = useHistory();
  const tabs: ITabularTab[] = [
    {
      icon: RegistrationIcon,
      label: t("common.registration"),
      key: "registration",
      component: <StakeRegistrationTab />,
      keyCheckShow: "hasRegistration"
    },
    {
      icon: DelegationIcon,
      label: t("common.delegationHistory"),
      key: "delegation",
      component: <DelegationTab />,
      keyCheckShow: "hasDelegation"
    },
    {
      icon: RewardsDistributionIcon,
      label: t("slc.rewardsDisttribution"),
      key: "rewards",
      component: <RewardsDistributionTab />,
      keyCheckShow: "hashRewards"
    },
    {
      icon: RewardsWithdrawalIcon,
      label: t("common.withdrawalHistory"),
      key: "withdrawal-history",
      component: <WithdrawalHistoryTab />,
      keyCheckShow: "hasWithdrawal"
    },
    {
      icon: DeredistrationIcon,
      label: t("slc.deregistration"),
      key: "deregistration",
      component: <DeregistrationTab />,
      keyCheckShow: "hasDeRegistration"
    }
  ];
  if (!tabsRenderConfig) return null;

  const onChangeTab = (tab: TabStakeDetail) => {
    history.replace(details.staking(stakeId, "tabular", tab as TTabularTabKey).replaceAll("//", ""));
  };

  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab
        tabsRenderConfig={tabsRenderConfig}
        tabs={tabs}
        tabActive={tab}
        onChangeTab={onChangeTab}
        checkshow={true}
      />
    </Box>
  );
};

export default Tabular;
