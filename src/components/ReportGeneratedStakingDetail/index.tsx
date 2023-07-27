import React, { useMemo, createContext } from "react";
import { useParams } from "react-router-dom";

import {
  DelegationIcon,
  DeredistrationIcon,
  RegistrationIcon,
  RewardsDistributionIcon,
  RewardsWithdrawalIcon,
  TranferIcon
} from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import StakeTab from "../TabularView/StakeTab";
import DelegationTab from "./StakeyTabs/DelegationTab";
import DeregistrationTab from "./StakeyTabs/DeregistrationTab";
import RewardsDistributionTab from "./StakeyTabs/RewardsDistributionTab";
import StakingRegistrationTab from "./StakeyTabs/StakingRegistrationTab";
import WithdrawalHistoryTab from "./StakeyTabs/WithdrawalHistoryTab";
import WalletActitityTab from "./StakeyTabs/WalletActivityTab";
import { getEventList } from "../StakekeySummary";
import { SkeletonUI } from "../TokenDetail/TokenAnalytics/styles";
import { Headline } from "../TabularView/StakeTab/styles";
import CustomTooltip from "../commons/CustomTooltip";

interface ITab {
  icon: React.FC;
  label: React.ReactNode;
  key: TTabularTabKey | string;
  mappingKey: string;
  component: React.ReactNode;
}

export const StakingDetailContext = createContext({ stakeKey: "", reportName: "" });

const stackeTabs: ITab[] = [
  {
    icon: RegistrationIcon,
    label: "Stake Address Registration",
    key: "registration",
    mappingKey: "Registration",
    component: <StakingRegistrationTab />
  },
  {
    icon: DelegationIcon,
    label: "Delegation History",
    key: "delegation",
    mappingKey: "Delegation",
    component: <DelegationTab />
  },
  {
    icon: RewardsDistributionIcon,
    label: "Rewards Distribution",
    key: "rewards",
    mappingKey: "Rewards",
    component: <RewardsDistributionTab />
  },
  {
    icon: RewardsWithdrawalIcon,
    label: "Withdrawal History",
    key: "withdrawal-history",
    mappingKey: "Withdrawal",
    component: <WithdrawalHistoryTab />
  },
  {
    icon: DeredistrationIcon,
    label: "Deregistration",
    key: "deregistration",
    mappingKey: "Deregistration",
    component: <DeregistrationTab />
  }
];

const ReportGeneratedStakingDetailTabs = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const reportDetail = useFetch<IReportStaking>(API.REPORT.STAKING_REPORTED_DETAIL(reportId));

  const events = useMemo(() => {
    const { data } = reportDetail;
    if (!data) return [];

    return getEventList(data);
  }, [reportDetail]);

  const displayedTabs = useMemo(() => {
    let tabs = stackeTabs.filter((tab) => events.includes(tab.mappingKey));
    if (reportDetail.data?.isADATransfer) {
      tabs = [
        ...tabs,
        {
          icon: TranferIcon,
          label: "ADA Transfers",
          key: "walletActivity",
          mappingKey: "",
          component: <WalletActitityTab />
        }
      ];
    }
    return tabs;
  }, [events, reportDetail]);
  const initTab = useMemo(() => (displayedTabs.length ? displayedTabs[0].key : undefined), [displayedTabs]);

  return (
    <StakingDetailContext.Provider
      value={{ stakeKey: reportDetail.data?.stakeKey ?? "", reportName: reportDetail.data?.reportName ?? "" }}
    >
      {reportDetail.loading ? (
        <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
      ) : (
        <>
          <CustomTooltip title={`${reportDetail.data?.reportName}`.replaceAll("-", " ")}>
            <Headline collapsed={1}>{`${reportDetail.data?.reportName}`.replaceAll("-", " ")}</Headline>
          </CustomTooltip>
          <CustomTooltip title={`${reportDetail.data?.reportName}`.replaceAll("-", " ")}>
            <Headline>{`${reportDetail.data?.reportName}`.replaceAll("-", " ")} </Headline>
          </CustomTooltip>
          <StakeTab tabs={displayedTabs} initTab={initTab} />
        </>
      )}
    </StakingDetailContext.Provider>
  );
};

export default ReportGeneratedStakingDetailTabs;
