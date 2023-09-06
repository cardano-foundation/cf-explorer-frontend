import React, { useMemo, createContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, styled } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";

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
import NoRecord from "../commons/NoRecord";

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
  const history = useHistory();
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

  if ((reportDetail.initialized && !reportDetail.data) || reportDetail.error) {
    return <NoRecord />;
  }

  return (
    <Box>
      <TopHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
      </TopHeader>
      <StakingDetailContext.Provider
        value={{ stakeKey: reportDetail.data?.stakeKey ?? "", reportName: reportDetail.data?.reportName ?? "" }}
      >
        {reportDetail.loading ? (
          <SkeletonUI variant="rectangular" style={{ height: "400px" }} />
        ) : (
          <>
            <CustomTooltip title={`${reportDetail.data?.reportName}`.replaceAll("-", " ")}>
              <Headline data-tesid="staking-report-name" collapsed={1}>
                {`${reportDetail.data?.reportName}`.replaceAll("-", " ")}
              </Headline>
            </CustomTooltip>
            <CustomTooltip title={`${reportDetail.data?.reportName}`.replaceAll("-", " ")}>
              <Headline data-tesid="staking-report-name">
                {`${reportDetail.data?.reportName}`.replaceAll("-", " ")}{" "}
              </Headline>
            </CustomTooltip>
            <StakeTab tabs={displayedTabs} initTab={initTab} />
          </>
        )}
      </StakingDetailContext.Provider>
    </Box>
  );
};

export default ReportGeneratedStakingDetailTabs;

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
