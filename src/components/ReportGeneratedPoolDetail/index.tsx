import React, { useMemo, createContext } from "react";
import { useParams } from "react-router-dom";

import { DeredistrationIcon, OperatorRewardIcon, PoolUpdateIcon, RegistrationIcon } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { ReactComponent as WalletIcon } from "src/commons/resources/icons/WalletOutline.svg";

import StakeTab from "../TabularView/StakeTab";
import DeregsitrationTab from "./PoolTabs/DeregsitrationTab";
import PoolRegistrationTab from "./PoolTabs/PoolRegistrationTab";
import ProtocolUpdateTab from "./PoolTabs/ProtocolUpdateTab";
import RewardsDistributionTab from "./PoolTabs/RewardsDistributionTab";
import PoolSizeTab from "./PoolTabs/PoolSizeTab";
import { SkeletonUI } from "../TokenDetail/TokenAnalytics/styles";
import { getPoolEventList } from "../PoolLifecycle";
import { Headline } from "../TabularView/StakeTab/styles";
import CustomTooltip from "../commons/CustomTooltip";

interface ITab {
  icon: React.FC;
  label: React.ReactNode;
  key: TTabularTabKey | string;
  mappingKey: string;
  component: React.ReactNode;
}

export const ReportGeneratedPoolDetailContext = createContext({ reportName: "", poolId: "" });

const poolTabs: ITab[] = [
  {
    icon: RegistrationIcon,
    label: "Pool Registration",
    key: "registration",
    mappingKey: "registration",
    component: <PoolRegistrationTab />
  },
  {
    icon: PoolUpdateIcon,
    label: "Pool Update",
    key: "poolupdate",
    mappingKey: "pool_update",
    component: <ProtocolUpdateTab />
  },
  {
    icon: OperatorRewardIcon,
    label: "Operator Rewards",
    key: "reward",
    mappingKey: "reward",
    component: <RewardsDistributionTab />
  },
  {
    icon: DeredistrationIcon,
    label: "Deregistration",
    key: "deregistration",
    mappingKey: "deregistration",
    component: <DeregsitrationTab />
  }
];

const ReportGeneratedPoolDetailTabs = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const reportDetail = useFetch<IPoolReportList>(API.REPORT.POOL_REPORTED_DETAIL(reportId));

  const events = useMemo(() => {
    const { data } = reportDetail;
    if (!data) return [];

    return getPoolEventList(data);
  }, [reportDetail]);

  const displayedTabs = useMemo(() => {
    const tabs = [
      ...poolTabs,
      {
        icon: WalletIcon,
        label: "Pool size",
        key: "poolSize",
        mappingKey: "poolSize",
        component: <PoolSizeTab />
      }
    ];

    if (events.includes("all")) return tabs;
    return tabs.filter((tab) => events.includes(tab.mappingKey));
  }, [events]);

  const initTab = useMemo(() => (displayedTabs.length ? displayedTabs[0].key : undefined), [displayedTabs]);

  return (
    <ReportGeneratedPoolDetailContext.Provider
      value={{
        reportName: reportDetail.data?.reportHistory.reportName ?? "",
        poolId: reportDetail.data?.poolView ?? ""
      }}
    >
      {reportDetail.loading ? (
        <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
      ) : (
        <>
          <CustomTooltip title={`${reportDetail.data?.reportHistory.reportName}`.replaceAll("-", " ")}>
            <Headline collapsed={1}>{`${reportDetail.data?.reportHistory.reportName}`.replaceAll("-", " ")} </Headline>
          </CustomTooltip>
          <CustomTooltip title={`${reportDetail.data?.reportHistory.reportName}`.replaceAll("-", " ")}>
            <Headline>{`${reportDetail.data?.reportHistory.reportName}`.replaceAll("-", " ")} </Headline>
          </CustomTooltip>
          <StakeTab tabs={displayedTabs} initTab={initTab} />
        </>
      )}
    </ReportGeneratedPoolDetailContext.Provider>
  );
};

export default ReportGeneratedPoolDetailTabs;
