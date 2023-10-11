import React, { useMemo, createContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, styled, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

import { DeredistrationIcon, OperatorRewardIcon, PoolUpdateIcon, RegistrationIcon } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { ReactComponent as WalletIcon } from "src/commons/resources/icons/WalletOutline.svg";
import { IPoolReportList } from "src/types/report";

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
import NoRecord from "../commons/NoRecord";

interface ITab {
  icon: React.FC;
  label: React.ReactNode;
  key: TTabularTabKey | string;
  mappingKey: string;
  component: React.ReactNode;
}

export const ReportGeneratedPoolDetailContext = createContext({ reportName: "", poolId: "" });

const ReportGeneratedPoolDetailTabs = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { reportId } = useParams<{ reportId: string }>();
  const history = useHistory();
  const reportDetail = useFetch<IPoolReportList>(API.REPORT.POOL_REPORTED_DETAIL(reportId));
  const poolTabs: ITab[] = [
    {
      icon: RegistrationIcon,
      label: t("common.poolRegistration"),
      key: "registration",
      mappingKey: "registration",
      component: <PoolRegistrationTab />
    },
    {
      icon: PoolUpdateIcon,
      label: t("common.poolUpdate"),
      key: "poolupdate",
      mappingKey: "pool_update",
      component: <ProtocolUpdateTab />
    },
    {
      icon: OperatorRewardIcon,
      label: t("common.operatorRewards"),
      key: "reward",
      mappingKey: "reward",
      component: <RewardsDistributionTab />
    },
    {
      icon: DeredistrationIcon,
      label: t("slc.deregistration"),
      key: "deregistration",
      mappingKey: "deregistration",
      component: <DeregsitrationTab />
    }
  ];
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
        label: t("common.poolSize"),
        key: "poolSize",
        mappingKey: "poolSize",
        component: <PoolSizeTab />
      }
    ];

    if (events.includes("all")) return tabs;
    return tabs.filter((tab) => events.includes(tab.mappingKey));
  }, [events]);

  const initTab = useMemo(() => (displayedTabs.length ? displayedTabs[0].key : undefined), [displayedTabs]);

  if ((reportDetail.initialized && !reportDetail.data) || reportDetail.error) {
    return <NoRecord />;
  }

  return (
    <Box>
      <TopHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft color={theme.palette.secondary.light} />
          <BackText>Back</BackText>
        </BackButton>
      </TopHeader>
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
              <Headline data-testid="pool-report-name" collapsed={1}>
                {`${reportDetail.data?.reportHistory.reportName}`.replaceAll("-", " ")}{" "}
              </Headline>
            </CustomTooltip>
            <CustomTooltip title={`${reportDetail.data?.reportHistory.reportName}`.replaceAll("-", " ")}>
              <Headline data-testid="pool-report-name">
                {`${reportDetail.data?.reportHistory.reportName}`.replaceAll("-", " ")}{" "}
              </Headline>
            </CustomTooltip>
            <StakeTab tabs={displayedTabs} initTab={initTab} />
          </>
        )}
      </ReportGeneratedPoolDetailContext.Provider>
    </Box>
  );
};

export default ReportGeneratedPoolDetailTabs;

const TopHeader = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 30px;
    position: relative;
    top: 5px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-top: 0px;
  }
`;

const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;
