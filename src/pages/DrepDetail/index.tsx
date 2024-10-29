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
  DropdownIcon,
  CCDetailVotingParticipation
} from "src/commons/resources";
import {
  DelegationCertificatesHistory,
  DelegationStakingDelegatorsList
} from "src/components/DelegationDetail/DelegationDetailList";
import FormNowMessage from "src/components/commons/FormNowMessage";
import { StyledAccordion } from "src/components/commons/CustomAccordion/styles";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { formatADA, formatADAFull, formatDateTimeLocal, formatPercent, getPageInfo } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import {
  BackButton,
  BackText,
  HeaderDetailContainer
} from "src/components/DelegationDetail/DelegationDetailInfo/styles";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { useScreen } from "src/commons/hooks/useScreen";
import { FF_GLOBAL_IS_CONWAY_ERA, VOTE_TYPE } from "src/commons/utils/constants";
import DelegationGovernanceVotes, { ActionMetadataModalConfirm } from "src/components/GovernanceVotes";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import NoRecord from "src/components/commons/NoRecord";
import FetchDataErr from "src/components/commons/FetchDataErr";

import { StyledContainer, StyledMenuItem, StyledSelect, TimeDuration, TitleCard, TitleTab, ValueCard } from "./styles";
import NotFound from "../NotFound";

export const voteOption = [
  { title: "Action Type", value: "Default" },
  { title: "All", value: "ALL" },
  { title: "Motion of No-Confidence", value: "NO_CONFIDENCE" },
  { title: "Constitutional Committee Updates", value: "UPDATE_COMMITTEE" },
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
  const { width, isMobile } = useScreen();

  const [typeVote, setTypeVote] = useState("Default");
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error, statusError } = useFetch<DrepOverview>(API.DREP_OVERVIEW.replace(":drepId", drepId));
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
      value: (
        <ValueCard>
          <Box>
            <DynamicEllipsisText
              value={data?.anchorHash || ""}
              sxFirstPart={{ maxWidth: width > 600 ? "calc(100% - 60px)" : "calc(100% - 70px)" }}
              postfix={5}
              isNoLimitPixel={true}
              isTooltip={(data?.anchorHash && !!data?.anchorHash.length) || undefined}
            />
          </Box>
          {data?.anchorUrl && (
            <Box
              position={"relative"}
              component={"span"}
              onClick={() => setOpenModal(true)}
              color={`${theme.palette.primary.main} !important`}
            >
              <DynamicEllipsisText
                value={data?.anchorUrl || ""}
                sxFirstPart={{
                  maxWidth: "calc(100% - 60px)",
                  minWidth: 16
                }}
                customTruncateFold={[4, 4]}
                postfix={5}
                sxLastPart={{ direction: "inherit" }}
                sx={{ cursor: "pointer" }}
                isTooltip
                whiteSpace="normal"
              />
            </Box>
          )}
          <ActionMetadataModalConfirm
            open={openModal}
            onClose={() => setOpenModal(false)}
            anchorUrl={
              data?.anchorUrl ? (data?.anchorUrl.includes("http") ? data?.anchorUrl : `//${data.anchorUrl}`) : ""
            }
          />
        </ValueCard>
      )
    },
    {
      icon: CreateDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("createdAt")}
        </TitleCard>
      ),
      value: (
        <DatetimeTypeTooltip>
          <ValueCard>{formatDateTimeLocal(data?.createdAt || "")}</ValueCard>
        </DatetimeTypeTooltip>
      )
    },
    {
      icon: ActiveVoteIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.activeVoteStake")}
        </TitleCard>
      ),
      value: (
        <ValueCard>
          {data?.activeVoteStake !== null ? `${formatADAFull(data?.activeVoteStake || 0)} ADA` : t("common.N/A")}{" "}
        </ValueCard>
      )
    },
    {
      icon: LiveStakeDrepIcon,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.liveStake")}
        </TitleCard>
      ),
      value: (
        <ValueCard>{data?.liveStake !== null ? `${formatADA(data?.liveStake || 0)} ADA` : t("common.N/A")} </ValueCard>
      )
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
      icon: CCDetailVotingParticipation,
      sizeIcon: 26,
      title: (
        <TitleCard display={"flex"} alignItems="center">
          {t("drep.votingParticipation")}
        </TitleCard>
      ),
      value: (
        <ValueCard>
          {data?.votingParticipation !== null ? `${formatPercent(data?.votingParticipation)}` : t("common.N/A")}
        </ValueCard>
      )
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
              width: "200px",
              [theme.breakpoints.down("sm")]: { width: "100%" }
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
  if (error && (statusError || 0) < 500) return <NoRecord />;
  if (error && (statusError || 0) >= 500) return <FetchDataErr />;
  if (!FF_GLOBAL_IS_CONWAY_ERA) {
    return <NotFound />;
  }
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
        title={
          <TruncateSubTitleContainer mr={isMobile ? 2 : 0}>
            <DynamicEllipsisText
              value={data?.drepId || ""}
              sxFirstPart={{ maxWidth: width > 600 ? "calc(100% - 130px)" : "calc(100% - 70px)" }}
              postfix={5}
              isNoLimitPixel={true}
              isTooltip
            />
          </TruncateSubTitleContainer>
        }
        loading={false}
        listItem={listOverview}
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
    tab === "certificatesHistory" ? API.DREP_CERTIFICATES_HISTORY.replace(":drepId", drepId) : "",
    { ...pageInfo },
    false,
    tab === "certificatesHistory" ? blockKey : undefined
  );

  const fetchDataDelegator = useFetchList<StakingDelegators>(
    tab === "delegators" ? API.DREP_DELEGATOR.replace(":drepId", drepId) : "",
    { ...pageInfo },
    false,
    tab === "delegators" ? blockKey : undefined
  );

  const tabs: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: React.ReactNode;
    key: TabDrepDetail;
    errorFetchData: boolean;
    component: React.ReactNode;
  }[] = [
    {
      icon: governanceVotesIcon,
      label: t("drep.governanceVotes"),
      key: "governanceVotes",
      errorFetchData: Boolean(null),
      component: (
        <div ref={tableRef}>
          <DelegationGovernanceVotes hash={drepId} type={VOTE_TYPE.DREP_KEY_HASH} />
        </div>
      )
    },
    {
      icon: StakingDelegators,
      label: t("stakingDelegators"),
      key: "delegators",
      errorFetchData: Boolean(fetchDataDelegator.error),
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
      errorFetchData: Boolean(fetchDataCertificatesHistory.error),
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
    <Box ref={tableRef} mt={"30px"} mb={2}>
      {tabs.map(({ key, icon: Icon, label, component, errorFetchData }, index) => (
        <StyledAccordion
          key={key}
          expanded={tab === key}
          customborderradius={needBorderRadius(key)}
          isdisplaybordertop={tab !== key && key !== tabs[0].key && index !== indexExpand + 1}
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
            {tab != "governanceVotes" && !errorFetchData && (
              <TimeDuration>
                <FormNowMessage
                  time={
                    tab === "certificatesHistory"
                      ? fetchDataCertificatesHistory.lastUpdated
                      : fetchDataDelegator.lastUpdated
                  }
                />
              </TimeDuration>
            )}
            {component}
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export const VoteRate = ({
  data,
  showDataTooltip = false,
  loading
}: {
  data: DrepOverviewChart | null;
  showDataTooltip?: boolean;
  loading: boolean;
}) => {
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
        showDataTooltip={showDataTooltip}
      />
      <VoteBar
        percentage={totalVote > 0 ? formatPercent((data?.numberOfAbstainVotes || 0) / totalVote) : 0}
        color={theme.palette.warning[700]}
        numberVote={data?.numberOfAbstainVotes || 0}
        icon={<VotesAbstainIcon />}
        label={t("common.abstain")}
        showDataTooltip={showDataTooltip}
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
        color={theme.isDark ? theme.palette.error[100] : theme.palette.error[700]}
        numberVote={data?.numberOfNoVotes || 0}
        icon={<VotesNoIcon />}
        label={t("common.no")}
        showDataTooltip={showDataTooltip}
      />
    </Box>
  );
};

const VoteBar = ({
  percentage,
  color,
  icon,
  label,
  numberVote,
  showDataTooltip
}: {
  percentage: string | number;
  numberVote: number;
  color: string;
  icon?: JSX.Element;
  label: string;
  showDataTooltip: boolean;
}) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Typography fontSize="10px" fontWeight={400}>
      {!percentage ? "0%" : percentage}
    </Typography>
    <LightTooltip
      title={
        <Box height="39px" display="flex" alignItems="center" gap="8px">
          {icon}
          <Typography fontSize="12px" fontWeight={600}>
            {showDataTooltip ? numberVote : t("common.na")} ({percentage})
          </Typography>
        </Box>
      }
      placement="top"
    >
      <Box
        sx={{ background: color, borderRadius: "4px" }}
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
    backgroundColor: theme.palette.primary[100],
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    border: `1px solid ${theme.palette.primary[200]}`
  }
}));
