/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  useTheme
} from "@mui/material";
import QueryString, { parse, stringify } from "qs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { t } from "i18next";

import DetailHeader from "src/components/commons/DetailHeader";
import {
  DescriptonDrepIcon,
  CreateDrepIcon,
  ActiveVoteIcon,
  LiveStakeDrepIcon,
  DelegatorsDrepIcon,
  LifetimeVoteDrepIcon,
  StakingDelegators,
  TimelineIconComponent,
  governanceVotesIcon,
  VotesYesIcon,
  VotesAbstainIcon,
  VotesNoIcon,
  DropdownIcon
} from "src/commons/resources";
import {
  DelegationCertificatesHistory,
  DelegationStakingDelegatorsList
} from "src/components/DelegationDetail/DelegationDetailList";
import FormNowMessage from "src/components/commons/FormNowMessage";
import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { formatADA, formatDateTimeLocal, formatPercent, getPageInfo } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import {
  BackButton,
  BackText,
  HeaderDetailContainer
} from "src/components/DelegationDetail/DelegationDetailInfo/styles";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

import { StyledContainer, StyledMenuItem, StyledSelect, TimeDuration, TitleCard, TitleTab, ValueCard } from "./styles";

const voteOption = [
  { title: "Action Type", value: "Default" },
  { title: "All", value: "ALL" },
  { title: "Motion of No-Confidence", value: "NO_CONFIDENCE" },
  { title: "Constitutional Committe Updates", value: "UPDATE_COMMITTEE" },
  { title: "Update to the Constitution", value: "NEW_CONSTITUTION" },
  { title: "Hard-Fork Initiation", value: "HARD_FORK_INITIATION_ACTION" },
  { title: "Protocol Parameter Changes", value: "PARAMETER_CHANGE_ACTION" },
  { title: "Treasury Withdrawals", value: "TREASURY_WITHDRAWALS_ACTION" },
  { title: "Info", value: "INFO_ACTION" }
];

const DrepDetail = () => {
  const { drepId } = useParams<{ drepId: string }>();
  const theme = useTheme();
  const history = useHistory();

  const [typeVote, setTypeVote] = useState("Default");
  const { data, loading } = useFetch<DrepOverview>(API.DREP_OVERVIEW.replace(":drepId", drepId));
  const { data: dataChard, loading: loadingChard } = useFetch<DrepOverviewChart>(
    `${API.DREP_OVERVIEW_CHART.replace(":drepId", drepId)}?govActionType=${typeVote === "Default" ? "ALL" : typeVote}`
  );
  const listOverview = [
    {
      icon: DescriptonDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.des")}
        </TitleCard>
      ),
      value: <ValueCard>{data?.anchorUrl}</ValueCard>
    },
    {
      icon: CreateDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("createdAt")}
        </TitleCard>
      ),
      value: <ValueCard>{formatDateTimeLocal(data?.createdAt || "")}</ValueCard>
    },
    {
      icon: ActiveVoteIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.activeVoteStake")}
        </TitleCard>
      ),
      value: <ValueCard>{formatADA(data?.activeVoteStake || 0)} ADA</ValueCard>
    },
    {
      icon: LiveStakeDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.liveStake")}
        </TitleCard>
      ),
      value: <ValueCard>{formatADA(data?.liveStake || 0)} ADA</ValueCard>
    },
    {
      icon: DelegatorsDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("glossary.delegators")}
        </TitleCard>
      ),
      value: <ValueCard>{data?.delegators} </ValueCard>
    },
    {
      icon: CreateDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.votingParticipation")}
        </TitleCard>
      ),
      value: <ValueCard>{data?.votingParticipation}%</ValueCard>
    },
    {
      icon: LifetimeVoteDrepIcon,
      sizeIcon: 26,
      title: (
        <Box display={"flex"} alignItems={"center"} gap={2} justifyContent={"space-between"} flexWrap={"wrap"}>
          <TitleCard display={"flex"} alignItems="center">
            {t("drep.lifetimeVotes")}
          </TitleCard>
          <StyledSelect
            value={typeVote}
            onChange={(event) => {
              setTypeVote(event.target?.value as string);
            }}
            size="small"
            IconComponent={DropdownIcon}
            sx={{
              bgcolor: theme.palette.primary[100],
              maxWidth: "200px",
              [theme.breakpoints.down("sm")]: { maxWidth: 100 }
            }}
            MenuProps={{
              style: { zIndex: 1303 },
              MenuListProps: {
                sx: {
                  bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
                }
              },
              PaperProps: {
                sx: {
                  bgcolor: ({ palette }) => `${palette.secondary[0]} !important`,
                  "& .MuiMenuItem-root": {
                    "&.Mui-selected": {
                      backgroundColor: ({ palette }) => `${palette.secondary[0]} !important` // Màu nền cho option được chọn
                    }
                  }
                }
              }
            }}
          >
            {voteOption.map((voteType, idx) => {
              if (voteType.value === "Default") {
                return (
                  <Box
                    component={StyledMenuItem}
                    key={idx}
                    fontSize={12}
                    color={theme.palette.secondary.light}
                    value={voteType.value}
                    display={"none"}
                  >
                    {voteType.title}
                  </Box>
                );
              }

              return (
                <Box
                  component={StyledMenuItem}
                  key={idx}
                  fontSize={12}
                  color={theme.palette.secondary.light}
                  value={voteType.value}
                >
                  {voteType.title}
                </Box>
              );
            })}
          </StyledSelect>
        </Box>
      ),
      value: (
        <Box>
          <VoteRate data={dataChard} loading={loadingChard} />
        </Box>
      )
    }
  ];
  if (loading) {
    return (
      <StyledContainer>
        <HeaderDetailContainer>
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft color={theme.palette.secondary.light} />
            <BackText>{t("common.back")}</BackText>
          </BackButton>
          <Box borderRadius={4} overflow="hidden">
            <CommonSkeleton variant="rectangular" height={80} width="100%" />
          </Box>
          <Box mt={2} borderRadius={4} overflow="hidden">
            <CommonSkeleton variant="rectangular" height={250} width="100%" />
          </Box>
          <Box mt={4} borderRadius={4} overflow="hidden">
            <CommonSkeleton variant="rectangular" height={250} width="100%" />
          </Box>
        </HeaderDetailContainer>
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <DetailHeader
        type="DREP"
        title="Drep ID"
        loading={false}
        listItem={listOverview}
        bookmarkData={"1"}
        subTitle={`Type: ${data?.type || ""}`}
        stakeKeyStatus={data?.status}
      />
      <DrepAccordion />
    </StyledContainer>
  );
};

export default DrepDetail;

const TABS: TabDrepDetail[] = ["delegators", "certificatesHistory", "governanceVotes"];

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
}
const DrepAccordion = () => {
  const theme = useTheme();
  const { drepId } = useParams<{ drepId: string }>();
  const history = useHistory();
  const { search, state } = useLocation<{ fromPath?: SpecialPath }>();
  const pageInfo = getPageInfo(search);
  const tableRef = useRef<HTMLDivElement>(null);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const query = parse(search.split("?")[1]);
  const tab: TabDrepDetail = TABS.includes(query.tab as TabDrepDetail) ? (query.tab as TabDrepDetail) : "";

  useEffect(() => {
    if (Object.keys(query).length === 0) {
      setQuery({ tab: "governanceVotes", page: 1, size: 50 });
    }
  }, [Object.keys(query).length]);

  const scrollEffect = () => {
    tableRef !== null &&
      tableRef.current &&
      tableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  };

  const fetchDataCertificatesHistory = useFetchList<CertificateHistory>(
    API.DREP_CERTIFICATES_HISTORY.replace(":drepId", drepId),
    { ...pageInfo },
    false,
    tab === "certificatesHistory" ? blockKey : undefined
  );
  const fetchDataDelegator = useFetchList<StakingDelegators>(
    API.DREP_DELEGATOR.replace(":drepId", drepId),
    { ...pageInfo },
    false,
    tab === "delegators" ? blockKey : undefined
  );

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: TabDrepDetail;
    component: React.ReactNode;
  }[] = [
    {
      icon: governanceVotesIcon,
      label: t("drep.governanceVotes"),
      key: "governanceVotes",
      component: <div ref={tableRef}>Governance Votes</div>
    },
    {
      icon: StakingDelegators,
      label: t("stakingDelegators"),
      key: "delegators",
      component: (
        <div ref={tableRef}>
          <DelegationStakingDelegatorsList {...fetchDataDelegator} scrollEffect={scrollEffect} />
        </div>
      )
    },
    {
      icon: TimelineIconComponent,
      label: <Box data-testid="certificatesHistory">{t("drep.certificatesHistory")}</Box>,
      key: "certificatesHistory",
      component: (
        <div ref={tableRef}>
          <DelegationCertificatesHistory {...fetchDataCertificatesHistory} scrollEffect={scrollEffect} />
        </div>
      )
    }
  ];

  const indexExpand = tabs.findIndex((item) => item.key === tab);

  const needBorderRadius = (currentKey: string) => {
    if (!tab) return "0";
    const indexCurrent = tabs.findIndex((item) => item.key === currentKey);
    if (indexExpand - 1 >= 0 && indexExpand - 1 === indexCurrent) return "0 0 12px 12px";
    if (indexExpand + 1 < tabs.length && indexExpand + 1 === indexCurrent) return "12px 12px 0 0";
    return "0";
  };

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, state);
  };

  const handleChangeTab = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    const handleTransitionEnd = () => {
      if (newExpanded) {
        setTimeout(() => {
          tableRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
        // Remove the event listener after the scroll
        tableRef?.current?.removeEventListener("transitionend", handleTransitionEnd);
      }
    };

    // Attach the transitionend event listener to wait for the expansion animation
    tableRef?.current?.addEventListener("transitionend", handleTransitionEnd);
    setQuery({ tab: newExpanded ? panel : "", page: 1, size: 50 });
  };

  return (
    <Box ref={tableRef} mt={"30px"}>
      {tabs.map(({ key, icon: Icon, label, component }, index) => (
        <StyledAccordion
          key={key}
          expanded={tab === key}
          customBorderRadius={needBorderRadius(key)}
          isDisplayBorderTop={tab !== key && key !== tabs[0].key && index !== indexExpand + 1}
          onChange={handleChangeTab(key)}
        >
          <AccordionSummary
            expandIcon={
              <IoIosArrowDown
                style={{
                  width: "21px",
                  height: "21px"
                }}
                color={key === tab ? theme.palette.primary.main : theme.palette.secondary.light}
              />
            }
            sx={{
              paddingX: theme.spacing(3),
              paddingY: theme.spacing(1)
            }}
          >
            <Icon fill={key === tab ? theme.palette.primary.main : theme.palette.secondary.light} />
            <TitleTab pl={1} active={+(key === tab)}>
              {label}
            </TitleTab>
          </AccordionSummary>
          <AccordionDetails>
            <TimeDuration>
              <FormNowMessage time={fetchDataCertificatesHistory.lastUpdated} />
            </TimeDuration>
            {component}
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

const VoteRate = ({ data, loading }: { data: DrepOverviewChart | null; loading: boolean }) => {
  const theme = useTheme();
  const totalVote = useMemo(() => {
    if (data) {
      return (data?.numberOfAbstainVotes || 0) + (data?.numberOfNoVotes || 0) + (data?.numberOfYesVote || 0);
    }
    return 0;
  }, [JSON.stringify(data)]);

  if (loading) {
    return (
      <Box borderRadius={4} overflow="hidden" height={150}>
        <CommonSkeleton variant="rectangular" height={250} width="100%" />
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="end" justifyContent="space-between" flexWrap={"wrap"} width="100%" minHeight={150}>
      <VoteBar
        percentage={totalVote > 0 ? formatPercent((data?.numberOfYesVote || 0) / totalVote) : 0}
        color={theme.palette.success[700]}
        numberVote={data?.numberOfYesVote || 0}
        icon={<VotesYesIcon />}
        label={t("common.yes")}
      />
      <VoteBar
        percentage={totalVote > 0 ? formatPercent((data?.numberOfAbstainVotes || 0) / totalVote) : 0}
        color={theme.palette.warning[700]}
        numberVote={data?.numberOfAbstainVotes || 0}
        icon={<VotesAbstainIcon />}
        label={t("common.abstain")}
      />
      <VoteBar
        percentage={
          totalVote > 0
            ? formatPercent(
                (100 -
                  (+formatPercent((data?.numberOfYesVote || 0) / totalVote).split("%")[0] +
                    +formatPercent((data?.numberOfAbstainVotes || 0) / totalVote).split("%")[0])) /
                  100
              )
            : 0
        }
        color={theme.palette.error[700]}
        numberVote={data?.numberOfNoVotes || 0}
        icon={<VotesNoIcon />}
        label={t("common.no")}
      />
    </Box>
  );
};

const VoteBar = ({
  percentage,
  color,
  icon,
  label,
  numberVote
}: {
  percentage: string | number;
  numberVote: number;
  color: string;
  icon?: JSX.Element;
  label: string;
}) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Typography fontSize="10px" fontWeight={400}>
      {percentage}
    </Typography>
    <LightTooltip
      title={
        <Box height="39px" display="flex" alignItems="center" gap="8px">
          {icon}
          <Typography fontSize="12px" fontWeight={600}>
            {numberVote} ({percentage})
          </Typography>
        </Box>
      }
      placement="right"
    >
      <Box
        sx={{ background: color }}
        height={`${
          +(percentage.toString()?.split("%")[0] || 0) === 0 ? 0.5 : +percentage.toString().split("%")[0] + 1
        }px`}
        width="36px"
      />
    </LightTooltip>
    <Typography fontSize="14px" fontWeight={400} pt="4px" textTransform="uppercase">
      {label}
    </Typography>
  </Box>
);

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary[200],
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11
  }
}));
