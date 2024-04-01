import React, { useEffect, useState } from "react";
import { ParsedQs, parse, stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Table as TableMui,
  TableRow,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  useTheme,
  ClickAwayListener,
  Link
} from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import moment from "moment";
import { isEmpty, isUndefined, omitBy } from "lodash";
import { JsonViewer } from "@textea/json-viewer";
import { BsFillCheckCircleFill } from "react-icons/bs";

import {
  ActionTypeIcon,
  AnchorTextIcon,
  ArrowLeftWhiteIcon,
  BlackCircleIcon,
  BlackWarningIcon,
  CurrentStatusIcon,
  DisclaimerIcon,
  ExpiryIcon,
  FilterIcon,
  GovernanceIdIcon,
  RepeatVotesIcon,
  ResetIcon,
  SubmissionDateIcon,
  VoteIcon,
  VotesAbstainIcon,
  VotesNoIcon,
  VotesYesIcon,
  VotingPowerIcon,
  historyIcon
} from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { POOLS_ACTION_TYPE, VOTE_TYPE, STATUS_VOTE } from "src/commons/utils/constants";
import CardGovernanceVotes, {
  GovernanceStatus,
  VoteStatus,
  actionTypeListDrep
} from "src/components/commons/CardGovernanceVotes";
import { formatDateTime, getShortHash, getShortNumber } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { FooterTable } from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import {
  AccordionContainer,
  AccordionDetailsFilter,
  ApplyFilterButton,
  ButtonSort,
  FilterContainer,
  FilterWrapper
} from "src/pages/NativeScriptsAndSC/styles";
import { StyledInput } from "src/components/share/styled";
import { TextareaAutosize } from "src/pages/DelegationDetail/styles";
import DateRangeModal, { DATETIME_PARTTEN } from "src/components/commons/CustomFilter/DateRangeModal";
import { ChipContainer } from "src/pages/NativeScriptsAndSC/Card";
import FormNowMessage from "src/components/commons/FormNowMessage";
import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";

import {
  DataContainer,
  InfoTitle,
  InfoValue,
  Item,
  StyledGrid,
  StyledTitle
} from "../DelegationDetail/DelegationDetailInfo/styles";
import { TimeDuration } from "../TransactionLists/styles";
import NoRecord from "../commons/NoRecord";
import DynamicEllipsisText from "../DynamicEllipsisText";
import { ViewJson } from "../ScriptModal/styles";
import { HashName } from "./styles";

interface DelegationGovernanceVotesProps {
  hash: string;
  type: VOTE_TYPE.DREP_KEY_HASH | VOTE_TYPE.STAKING_POOL_KEY_HASH;
}

interface GovernanceVoteChart {
  txHash: string | null;
  index: number | null;
  numberOfYesVote: number;
  numberOfNoVotes: number;
  numberOfAbstainVotes: number;
  votingChartsList: VotingChart[];
}

interface VotingChart {
  voterType: string;
  numberOfYesVote: number;
  numberOfNoVotes: number;
  numberOfAbstainVotes: number;
}

const DelegationGovernanceVotes: React.FC<DelegationGovernanceVotesProps> = ({ hash, type }) => {
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [params, setParams] = useState({});
  useEffect(() => {
    setParams({
      page: query?.page && +query?.page >= 1 ? +query?.page - 1 : 0,
      size: +(query?.voteSize || "") || 6,
      actionType: (query.actionType as string) || "ALL",
      actionStatus: (query.actionStatus as string) || "ANY",
      voteType: (query.voteType as string) || "ANY",
      isRepeatVote: query?.isRepeatVote === "true" ? (query.isRepeatVote as string) : undefined,
      governanceActionTxHash: (query.governanceActionTxHash as string) || undefined,
      anchorText: (query.anchorText as string) || undefined,
      fromDate: (query.fromDate as string) || undefined,
      toDate: (query.toDate as string) || undefined,
      voterType: type
    });
  }, [JSON.stringify(query)]);

  const { data, total, lastUpdated, loading, initialized } = useFetchList<GovernanceVote>(
    `${API.POOL_CERTIFICATE.POOL}/${hash}`,
    omitBy(params, isUndefined),
    false
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };

  if (query.voteId) {
    return (
      <>
        <GovernanceVotesDetail hash={hash} voteId={(query?.voteId as string) || ""} type={type} />
      </>
    );
  }

  const renderCard = () => {
    if (loading) {
      return (
        <Box component={Grid} container spacing={2}>
          {[...new Array(+(query?.voteSize || "") || 6).fill(0)].map((_, idx) => (
            <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
              <Box component={Skeleton} variant="rectangular" height={"190px"} borderRadius={2} />
            </Grid>
          ))}
        </Box>
      );
    }
    return (
      <Box component={Grid} container spacing={2}>
        {data && data.length === 0 && initialized && <NoRecord padding={`0 !important`} />}
        {data?.map((value, index) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={index}
            onClick={() => {
              setQuery({
                tab: query.tab,
                voteId: value.txHash,
                page: Number(query.page),
                voteSize: Number(query.size)
              });
            }}
          >
            <CardGovernanceVotes data={value} />
          </Grid>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <FilterGovernanceVotes setQuery={setQuery} query={query} voterType={type} />
      </Box>
      <Box mt={3}>{renderCard()}</Box>
      <FooterTable
        pagination={{
          size: Number(query.voteSize || 6),
          page: query.page ? Number(query.page || 1) - 1 : 0,
          total,
          onChange: (page, size) => history.replace({ search: stringify({ ...query, page, voteSize: size }) })
        }}
        total={{ count: total || 0, title: "" }}
        loading={false}
        optionList={[6, 9, 12]}
      />
    </>
  );
};

export default DelegationGovernanceVotes;

const GovernanceVotesDetail: React.FC<{
  hash: string;
  voteId: string;
  type: string;
}> = ({ hash, voteId, type }) => {
  const theme = useTheme();
  const [openHistoryVoteModal, setOpenHistoryVoteModal] = useState<boolean>(false);
  const [openActionMetadataModal, setOpenActionMetadataModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();
  const { isGalaxyFoldSmall, isMobile } = useScreen();
  const { drepId, poolId } = useParams<{ drepId: string; poolId: string }>();

  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };

  const [selectVote, setSelectVote] = useState<string>("");
  const { data, loading, initialized } = useFetch<GovernanceVoteDetail>(
    `${API.POOL_CERTIFICATE.POOL_DETAIL(hash || "")}?${stringify({
      txHash: voteId,
      index: 0,
      voterType: type
    })}`
  );

  const { data: dataChart } = useFetch<GovernanceVoteChart>(
    `${API.POOL_CERTIFICATE.POOL_CHART}?${stringify({
      txHash: voteId,
      index: 0
    })}`
  );

  const filterDataChart = (selectVote: string) => {
    switch (selectVote) {
      case "SPOs":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "STAKING_POOL_KEY_HASH")[0];
      case "DReps":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "DREP_KEY_HASH")[0];
      case "CC":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH")[0];

      default:
        return dataChart;
    }
  };

  const [tab, setTab] = useState<string>("pool");
  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };
  const TabButton: React.FC<TabButtonProps> = ({ tabName, title, children }) => {
    return (
      <Box
        component={Button}
        textTransform={"capitalize"}
        p={2.5}
        py={1.5}
        mr={"1px"}
        sx={{
          borderRadius: tabName === "pool" ? "8px 0px 0px 8px !important" : "0px 8px 8px 0px !important",
          background: tab === tabName ? theme.palette.primary[200] : "",
          border: `1px solid ${tab === tabName ? theme.palette.primary.main : theme.palette.primary[200]} !important`,
          color: `${tab === tabName ? theme.palette.primary.main : theme.palette.secondary.light} !important`,
          fontWeight: 600
        }}
        onClick={() => handleTabChange(tabName)}
      >
        <>{title}</>
        <>{children}</>
      </Box>
    );
  };

  const listVotes = ["SPOs", "DReps", "CC"];

  if (loading || !initialized) {
    return <Box component={Skeleton} variant="rectangular" height={"400px"} borderRadius={2} />;
  }

  return (
    <Box>
      <Box display="block" alignItems="baseline">
        <Box m="auto">
          <Box position="relative">
            <Button
              sx={{ position: "absolute", bottom: 1 }}
              variant="text"
              onClick={() => {
                setQuery({
                  tab: "governanceVotes",
                  page: 1,
                  size: 6,
                  governanceActionTxHash: "",
                  actionType: STATUS_VOTE.ALL,
                  actionStatus: STATUS_VOTE.ANY,
                  voteType: STATUS_VOTE.ANY,
                  voterType: VOTE_TYPE.STAKING_POOL_KEY_HASH,
                  isRepeatVote: false
                });
                setTab("pool");
              }}
            >
              <ArrowLeftWhiteIcon />
            </Button>
            <HashName>
              {actionTypeListDrep.find((action) => action.value === data?.govActionType)?.text} #{data?.index}
            </HashName>
          </Box>
          <Box textAlign="center">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <TabButton tabName="pool">
                <Box width={85}>
                  {data?.poolName && data.poolName.length < 10 ? (
                    data.poolName
                  ) : (
                    <DynamicEllipsisText
                      sx={{ textTransform: data?.poolName ? "unset" : "lowercase" }}
                      postfix={4}
                      sxLastPart={{ textTransform: "none" }}
                      sxFirstPart={{ textTransform: "none" }}
                      isNoLimitPixel={true}
                      isTooltip
                      value={data?.poolName || poolId || drepId || ""}
                    />
                  )}
                </Box>
              </TabButton>
              <TabButton tabName="overall" title={t("common.overall")} />
            </ButtonGroup>
            <Box display="flex" justifyContent="center">
              <Typography
                fontSize="14px"
                fontWeight={400}
                lineHeight="16.41px"
                pt="16px"
                width="400px"
                color={theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light}
              >
                {tab === "pool"
                  ? type === VOTE_TYPE.DREP_KEY_HASH
                    ? t("pool.tabPoolDrep")
                    : t("pool.tabPool")
                  : t("pool.overall")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <DataContainer sx={{ boxShadow: "unset" }}>
        <StyledGrid container>
          <Item item xs={6} md={3} top={1}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon fill={theme.palette.secondary.light} icon={GovernanceIdIcon} height={22} marginTop="15px" />
              <BlackWarningIcon />
            </Box>
            <InfoTitle paddingTop="2px" paddingBottom="3px">
              <StyledTitle>{t("pool.actionId")}</StyledTitle>
            </InfoTitle>
            <InfoValue>
              <Box
                display="flex"
                alignItems="center"
                gap="8px"
                borderRadius="20px"
                sx={{
                  background: theme.isDark ? theme.palette.primary[500] : theme.palette.primary[100],
                  border: `1px solid ${theme.palette.secondary[600]}`,
                  width: "fit-content",
                  p: "3px 2px 3px 12px"
                }}
              >
                <CustomTooltip title={data?.txHash}>
                  <Typography
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="14.52px"
                    color={theme.isDark ? theme.palette.secondary.light : theme.palette.secondary[600]}
                  >
                    {isGalaxyFoldSmall
                      ? getShortHash(data?.txHash, 1, 1)
                      : isMobile
                      ? getShortHash(data?.txHash, 5, 4)
                      : getShortHash(data?.txHash)}
                    #{data?.index}
                  </Typography>
                </CustomTooltip>
                <CopyButton
                  text={data?.txHash}
                  customIcon={BlackCircleIcon}
                  data-testid="copy-button"
                  height={23}
                  fill="theme.palette.secondary.light"
                />
              </Box>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon fill={theme.palette.secondary.light} icon={ActionTypeIcon} height={22.27} marginTop="15px" />
              <BlackWarningIcon />
            </Box>
            <InfoTitle paddingTop="2px" paddingBottom="3px">
              <StyledTitle>{t("pool.actionType")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{actionTypeListDrep.find((action) => action.value === data?.govActionType)?.text}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon fill={theme.palette.secondary.light} icon={VoteIcon} height={27} marginTop="15px" />
              <BlackWarningIcon />
            </Box>
            <InfoTitle
              paddingTop="2px"
              paddingBottom="3px"
              display="flex"
              justifyContent="space-between"
              alignItems="center !important"
            >
              <StyledTitle>{tab === "pool" ? t("pool.vote") : t("pool.votes")}</StyledTitle>
              {tab !== "pool" && (
                <Box display="flex" gap="8px" flexWrap="inherit">
                  {(selectVote ? listVotes.slice(0, 1) : listVotes).map((i) => (
                    <Chip
                      key={i}
                      sx={{
                        fontWeight: 500,
                        fontSize: "12px",
                        background: selectVote
                          ? theme.palette.primary[200]
                          : theme.isDark
                          ? theme.palette.primary[500]
                          : theme.palette.primary[100],
                        border: `1px solid ${selectVote ? theme.palette.primary.main : theme.palette.secondary[600]}`,
                        color: selectVote
                          ? theme.palette.secondary.main
                          : theme.isDark
                          ? theme.palette.secondary.main
                          : theme.palette.secondary[600]
                      }}
                      label={selectVote || i}
                      onClick={() => setSelectVote(selectVote ? "" : i)}
                    />
                  ))}
                  {selectVote && (
                    <Chip
                      sx={{
                        background: theme.isDark ? theme.palette.primary[500] : theme.palette.primary[100],
                        border: `1px solid ${theme.palette.secondary[600]}`,
                        color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary[600]
                      }}
                      onClick={() => setSelectVote("")}
                      label="x"
                    />
                  )}
                </Box>
              )}
            </InfoTitle>
            <InfoValue width={`${tab === "pool" ? "fit-content" : "100%"}`}>
              {tab === "pool" ? (
                <Box display={"flex"} alignItems={"center"} gap={1} flexWrap={"wrap"}>
                  <Box>
                    <VoteStatus status={data?.voteType || ""} />
                  </Box>
                  {data?.historyVotes && data?.historyVotes.length > 1 && (
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpenHistoryVoteModal(true);
                      }}
                    >
                      <ChipContainer
                        Icon={historyIcon}
                        message={
                          <Box component={Typography} textTransform="uppercase" fontSize="12px" fontWeight={500}>
                            History
                          </Box>
                        }
                        variant={"gray"}
                      />
                    </Box>
                  )}
                </Box>
              ) : (
                <Box pr="2px">
                  <VoteRate data={filterDataChart(selectVote)} />
                </Box>
              )}
            </InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }} width={"100%"}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon fill={theme.palette.secondary.light} icon={CurrentStatusIcon} height={28} marginTop="15px" />
              <BlackWarningIcon />
            </Box>
            <InfoTitle>
              <Box width={"100%"}>
                <StyledTitle>{t("pool.currentStatus")}</StyledTitle>

                <InfoValue width="fit-content" mt={"8px"}>
                  <GovernanceStatus status={data?.status || ""} />
                </InfoValue>
              </Box>
            </InfoTitle>
          </Item>
          <Item item xs={6} md={3}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon
                fill={theme.palette.secondary.light}
                height={27}
                icon={VotingPowerIcon}
                style={{ marginTop: "5px" }}
              />
              <BlackWarningIcon />
            </Box>
            <InfoTitle paddingBottom="3px">
              <StyledTitle>{t("pool.votingPowerADA")}</StyledTitle>
            </InfoTitle>

            <InfoValue sx={{ wordBreak: "break-word" }}>
              {data?.votingPower ? `${data?.votingPower} ADA` : "N/A"}{" "}
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
              <BlackWarningIcon />
            </Box>
            <InfoTitle paddingBottom="3px">
              <StyledTitle>{t("pool.submission")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{formatDateTime(data?.submissionDate || "")}</InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
              <BlackWarningIcon />
            </Box>
            <InfoTitle paddingBottom="3px">
              <StyledTitle>{t("pool.expiryDate")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{formatDateTime(data?.expiryDate || "")}</InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <Box display="flex" justifyContent="space-between" pr={isMobile ? "5px" : ""}>
              <CustomIcon fill={theme.palette.secondary.light} height={25} icon={AnchorTextIcon} />
              <BlackWarningIcon />
            </Box>
            <InfoTitle paddingBottom="3px">
              <StyledTitle>{t("pool.actionMetadata")}</StyledTitle>
            </InfoTitle>
            <InfoValue>
              <Button
                onClick={() => {
                  setOpenActionMetadataModal(true);
                }}
                fullWidth
                sx={{
                  height: "51px",
                  borderRadius: "8px",
                  border: `2px solid ${theme.palette.primary[200]}`,
                  textTransform: "capitalize",
                  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light,
                  fontWeight: 500,
                  fontSize: `${isMobile ? "12px" : "16px"}`
                }}
                variant="outlined"
              >
                {t("common.viewDetails")}
              </Button>
            </InfoValue>
          </Item>
        </StyledGrid>
        <VoteHistoryModal
          data={data?.historyVotes}
          open={openHistoryVoteModal}
          onClose={() => setOpenHistoryVoteModal(false)}
        />
        <ActionMetadataModal
          data={data?.details}
          anchorHash={data?.anchorHash}
          anchorUrl={data?.anchorUrl}
          open={openActionMetadataModal}
          setOpenModal={setOpenModal}
          onClose={() => setOpenActionMetadataModal(false)}
        />
        <ActionMetadataModalConfirm open={openModal} anchorUrl={data?.anchorUrl} onClose={() => setOpenModal(false)} />
      </DataContainer>
    </Box>
  );
};

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary[200],
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11
  }
}));

const VoteBar = ({
  percentage,
  color,
  icon,
  label
}: {
  percentage: number;
  color: string;
  icon: JSX.Element;
  label: string;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isGalaxyFoldSmall } = useScreen();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography fontSize="10px" fontWeight={400}>
        {!percentage ? "0" : percentage}%
      </Typography>
      <LightTooltip
        title={
          <Box height="39px" display="flex" alignItems="center" gap="8px">
            {icon}
            <Typography
              fontSize="12px"
              fontWeight={600}
              color={theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light}
            >
              {t("common.N/A")} ({percentage})%
            </Typography>
          </Box>
        }
        placement="top"
      >
        <Box
          sx={{ background: color, borderRadius: "8px" }}
          height={`${!percentage ? 0.5 : percentage}px`}
          width={isGalaxyFoldSmall ? "24px" : "36px"}
        />
      </LightTooltip>
      <Typography
        fontSize={`${isGalaxyFoldSmall ? "12px" : "14px"}`}
        fontWeight={400}
        pt="4px"
        textTransform="uppercase"
      >
        {label}
      </Typography>
    </Box>
  );
};

const VoteRate = ({ data }: { data?: GovernanceVoteChart | VotingChart | null }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const totalVotes = Number(
    (data?.numberOfYesVote || 0) + (data?.numberOfNoVotes || 0) + (data?.numberOfAbstainVotes || 0)
  );
  const yesPercentage = ((data?.numberOfYesVote || 0) / totalVotes) * 100;
  const noPercentage = ((data?.numberOfNoVotes || 0) / totalVotes) * 100;
  const abstainPercentage = ((data?.numberOfAbstainVotes || 0) / totalVotes) * 100;

  return (
    <Box display="flex" alignItems="end" justifyContent="space-between" flexWrap={"wrap"} width="100%">
      <VoteBar
        percentage={getShortNumber(yesPercentage)}
        color={theme.palette.success[700]}
        icon={<VotesYesIcon />}
        label={t("common.yes")}
      />
      <VoteBar
        percentage={getShortNumber(abstainPercentage)}
        color={theme.palette.warning[700]}
        icon={<VotesAbstainIcon />}
        label={t("common.abstain")}
      />
      <VoteBar
        percentage={getShortNumber(noPercentage)}
        color={theme.palette.error[700]}
        icon={<VotesNoIcon />}
        label={t("common.no")}
      />
    </Box>
  );
};

export interface VoteHistoryProps {
  onClose?: () => void;
  open: boolean;
  data?: { no: number | null; vote: string; timestamp: string }[];
}

export interface GovernanceVote {
  index: number;
  status: string;
  txHash: string;
  type: string;
  vote: string;
  votingPower: string;
  isRepeatVote: boolean;
}

export interface GovernanceVoteDetail {
  txHash: string;
  index: number;
  govActionType: string;
  anchorHash: string;
  anchorUrl: string;
  voterType?: string;
  details: {
    type: string;
    govActionId: string | null;
    quorumThreshold: number;
    membersForRemoval: string[];
    newMembersAndTerms: Record<string, number>;
  };
  voteType: string;
  voterHash: string | null;
  status: string | null;
  votingPower: number | null;
  submissionDate: string;
  poolName: string | null;
  expiryDate: string;
  historyVotes: {
    no: number | null;
    vote: string;
    timestamp: string;
  }[];
}

const VoteHistoryModal: React.FC<VoteHistoryProps> = ({ onClose, open, data }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CustomModal
      open={open}
      onClose={() => onClose?.()}
      title={t("pool.votingHistory")}
      width={500}
      sx={{ overflow: "hidden" }}
    >
      <Box display="flex" alignItems="center" gap="12px" pb="25.5px">
        <Typography
          fontSize="24px"
          color={{ color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light }}
        >
          {t("pool.currentVote")}:
        </Typography>{" "}
        <VoteStatus status={(data && data[0].vote) || ""} />
      </Box>
      <TableContainer sx={{ p: "0px 10px", background: theme.isDark ? "" : theme.palette.secondary[0], width: "auto" }}>
        <TableMui aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  padding: "9px",
                  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                }}
                padding="none"
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                }}
                padding="none"
              >
                {t("pool.vote")}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                }}
                padding="none"
              >
                {t("common.timestamp")}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row, index) => (
              <TableRow key={row.no} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  sx={{
                    padding: "11px",
                    color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                  }}
                  padding="none"
                >
                  {index + 1}
                </TableCell>
                <TableCell padding="none">
                  <Box width="fit-content" mt="8px">
                    <VoteStatus status={row.vote} />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light }}
                  padding="none"
                >
                  {formatDateTime(row.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableMui>
        {!data && <NoRecord padding={`0 !important`} />}
      </TableContainer>
    </CustomModal>
  );
};

interface ActionMetadataProps {
  onClose?: () => void;
  setOpenModal: (open: boolean) => void;
  open: boolean;
  anchorHash?: string;
  anchorUrl?: string;
  data?: {
    type: string;
    govActionId: string | null;
    quorumThreshold: number;
    membersForRemoval: string[];
    newMembersAndTerms: Record<string, number>;
  };
}

const ActionMetadataModal: React.FC<ActionMetadataProps> = ({
  onClose,
  open,
  data,
  anchorHash,
  anchorUrl,
  setOpenModal
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CustomModal
      open={open}
      onClose={() => onClose?.()}
      title={t("pool.actionMetadata")}
      width={500}
      sx={{ maxHeight: "70vh" }}
    >
      <Box display="block" pb="15px">
        <Typography fontSize="16px" color={theme.palette.secondary.main}>
          {t("pool.anchor")}:
        </Typography>{" "}
        <Box
          display="flex"
          flexDirection="column"
          gap="24px"
          mt="20px"
          p="24px"
          borderRadius={"10px"}
          sx={{
            background: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
            wordWrap: "break-word"
          }}
        >
          <Typography fontSize="16px" color={theme.palette.secondary.light}>
            {anchorHash}
          </Typography>
          <Box>
            <Box
              display={"inline"}
              component={Typography}
              fontSize="16px"
              color={`${theme.palette.primary.main} !important`}
              fontWeight="700"
              onClick={() => {
                setOpenModal(true);
                onClose?.();
              }}
              sx={{ cursor: "pointer" }}
            >
              {anchorUrl}
            </Box>
            <Box
              ml={1}
              sx={{ transform: "translateY(3px)" }}
              component={CustomTooltip}
              title={
                <Box textAlign={"left"}>
                  <Box fontWeight={"bold"} component={"span"}>
                    Disclaimer:{" "}
                  </Box>
                  {t("drep.disclaimer")}
                </Box>
              }
            >
              <DisclaimerIcon fill={theme.palette.primary.main} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="block">
        <Typography fontSize="16px" color={theme.palette.secondary.main}>
          {t("pool.metadata")}:
        </Typography>{" "}
        <Box
          display="flex"
          flexDirection="column"
          mt={2}
          sx={{ background: theme.isDark ? "" : theme.palette.secondary[0] }}
        >
          <ViewJson maxHeight={"70vh"}>
            <JsonViewer
              value={data}
              displayObjectSize={false}
              displayDataTypes={false}
              enableClipboard={false}
              collapseStringsAfterLength={false}
              rootName={false}
              theme={theme.isDark ? "dark" : "light"}
              // keyRenderer={keyRenderer}
              style={{ wordBreak: "break-word", width: "98%", pointerEvents: "none" }}
            />
          </ViewJson>
        </Box>
      </Box>
    </CustomModal>
  );
};

export const ActionMetadataModalConfirm: React.FC<{
  onClose: () => void;
  open: boolean;
  anchorUrl?: string;
}> = ({ anchorUrl, open, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CustomModal onClose={onClose} open={open} title={t("Disclaimer")} width={500} sx={{ maxHeight: "70vh" }}>
      <Box display="block" pb="15px">
        <Box fontSize={16} color={theme.palette.secondary.main}>
          {t("drep.disclaimer.des1")}
        </Box>
        <Box fontSize={16} color={theme.palette.secondary.main} my={2}>
          {t("drep.disclaimer.des2")}
        </Box>
        <Box
          component={Link}
          sx={{ textDecoration: "underline !important" }}
          fontSize="16px"
          color={`${theme.palette.primary.main} !important`}
          fontWeight="700"
          target="_blank"
          rel="noopener noreferrer"
          href={anchorUrl || "/"}
        >
          Proceed to External Link
        </Box>
      </Box>
    </CustomModal>
  );
};

interface TabButtonProps {
  tabName: string;
  title?: string;
  children?: React.ReactNode;
}
interface FilterGovernanceVotes {
  query: ParsedQs;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQuery: (query: any) => void;
  voterType: string;
}
export interface FilterParams {
  sort?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
  governanceActionTxHash?: string;
  isRepeatVote?: boolean;
  actionType?: string;
  anchorText?: string;
  currentStatus?: string;
  vote?: string;
}
const FilterGovernanceVotes: React.FC<FilterGovernanceVotes> = ({ query, setQuery, voterType }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const history = useHistory();
  const [expanded, setExpanded] = useState<string | false>("");
  const [openDateRange, setOpenDateRange] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const filterValue = {
    sort: "ASC",
    governanceActionTxHash: "",
    anchorText: "",
    isRepeatVote: false,
    actionType: STATUS_VOTE.ALL,
    currentStatus: STATUS_VOTE.ANY,
    vote: STATUS_VOTE.ANY,
    fromDate: "",
    toDate: ""
  };

  const [params, setParams] = useState<FilterParams | null>(filterValue || {});

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleReset = () => {
    setExpanded(false);
    setOpen(false);
    setParams(filterValue);
    history.replace({
      search: stringify({
        page: 1,
        size: 6,
        tab: "governanceVotes",
        governanceActionTxHash: "",
        actionType: STATUS_VOTE.ALL,
        actionStatus: STATUS_VOTE.ANY,
        voteType: STATUS_VOTE.ANY,
        voterType: voterType
      })
    });
  };

  const handleFilter = () => {
    setExpanded(false);
    setOpen(false);
    setQuery({
      tab: query.tab,
      isRepeatVote: params?.isRepeatVote,
      page: 1,
      size: 6,
      governanceActionTxHash: params?.governanceActionTxHash,
      anchorText: params?.anchorText,
      actionType: params?.actionType,
      actionStatus: params?.currentStatus,
      voterType: VOTE_TYPE.STAKING_POOL_KEY_HASH,
      voteType: params?.vote,
      ...(params?.fromDate && { fromDate: params.fromDate || "" }),
      ...(params?.toDate && { toDate: params.toDate || "" })
    });
  };

  const currentStatusList = [
    { value: STATUS_VOTE.ANY, text: t("pool.any") },
    { value: STATUS_VOTE.OPEN_BALLOT, text: t("pool.open") },
    { value: STATUS_VOTE.RATIFIED, text: t("pool.ratified") },
    { value: STATUS_VOTE.EXPIRED, text: t("common.expired") },
    { value: STATUS_VOTE.ENACTED, text: t("pool.enacted") }
  ];

  const voteList = [
    { value: STATUS_VOTE.ANY, text: t("pool.any") },
    { value: STATUS_VOTE.YES, text: t("pool.yes") },
    { value: STATUS_VOTE.NO, text: t("pool.no") },
    { value: STATUS_VOTE.ABSTAIN, text: t("pool.abstain") },
    { value: STATUS_VOTE.NONE, text: t("pool.none") }
  ];

  const actionTypeListDrep = [
    { value: POOLS_ACTION_TYPE.ALL, text: t("pool.any") },
    { value: POOLS_ACTION_TYPE.NO_CONFIDENCE, text: t("pool.typeMotion") },
    { value: POOLS_ACTION_TYPE.UPDATE_COMMITTEE, text: t("pool.typeConstitutional") },
    { value: POOLS_ACTION_TYPE.NEW_CONSTITUTION, text: t("drep.updateConstitution") },
    { value: POOLS_ACTION_TYPE.HARD_FORK_INITIATION_ACTION, text: t("pool.typeHardFork") },
    { value: POOLS_ACTION_TYPE.PARAMETER_CHANGE_ACTION, text: t("drep.protocolChange") },
    { value: POOLS_ACTION_TYPE.TREASURY_WITHDRAWALS_ACTION, text: t("drep.treasuryWithdrawals") },
    { value: POOLS_ACTION_TYPE.INFO_ACTION, text: t("pool.typeInfo") }
  ];

  const actionTypeListPools = [
    { value: POOLS_ACTION_TYPE.ALL, text: t("pool.any") },
    { value: POOLS_ACTION_TYPE.NO_CONFIDENCE, text: t("pool.typeMotion") },
    { value: POOLS_ACTION_TYPE.UPDATE_COMMITTEE, text: t("pool.typeConstitutional") },
    { value: POOLS_ACTION_TYPE.NEW_CONSTITUTION, text: t("drep.updateConstitution") },
    { value: POOLS_ACTION_TYPE.HARD_FORK_INITIATION_ACTION, text: t("pool.typeHardFork") },
    { value: POOLS_ACTION_TYPE.PARAMETER_CHANGE_ACTION, text: t("drep.protocolChange") },
    { value: POOLS_ACTION_TYPE.TREASURY_WITHDRAWALS_ACTION, text: t("drep.treasuryWithdrawals") },
    { value: POOLS_ACTION_TYPE.INFO_ACTION, text: t("pool.typeInfo") }
  ];

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <FilterWrapper>
        <Box
          component={Button}
          variant="text"
          px={2}
          textTransform={"capitalize"}
          bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary[100] : palette.primary[200])}
          border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
          onClick={() => setOpen((pre) => !pre)}
          sx={{
            ":hover": {
              bgcolor: theme.mode === "dark" ? theme.palette.secondary[100] : theme.palette.primary[200]
            }
          }}
        >
          <CustomIcon
            icon={FilterIcon}
            fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
            height={18}
          />
          <Box
            ml={1}
            position={"relative"}
            whiteSpace={"nowrap"}
            fontWeight={"bold"}
            color={({ palette, mode }) => (mode === "dark" ? palette.primary.main : palette.secondary.light)}
          >
            {t("common.filter")}
          </Box>
        </Box>
        <FilterContainer>
          {open && (
            <Box display={"flex"} flexDirection={"column"}>
              <Box component={ButtonSort} p="0px 16px" height="48px">
                <Box display={"flex"} alignItems={"center"} justifyContent="space-between" width="100%">
                  <Box display="flex">
                    <CustomIcon icon={RepeatVotesIcon} fill={theme.palette.secondary.light} width={16} height={24} />
                    <Typography fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                      {t("pool.repeatVotes")}
                    </Typography>
                  </Box>
                  <Switch
                    defaultChecked
                    checked={params?.isRepeatVote}
                    onChange={(e) => setParams({ ...params, isRepeatVote: e.target.checked })}
                  />
                </Box>
              </Box>
              <AccordionContainer expanded={expanded === "action-id"} onChange={handleChange("action-id")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={GovernanceIdIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.actionId")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "action-id" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <StyledInput
                    sx={{
                      p: "0px 12px",
                      width: "100% !important",
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                    }}
                    placeholder={"Search ID"}
                    value={params?.governanceActionTxHash}
                    onChange={({ target: { value } }) => setParams({ ...params, governanceActionTxHash: value })}
                    onKeyPress={handleKeyPress}
                  />
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "anchor-text"} onChange={handleChange("anchor-text")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={AnchorTextIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.metadataSearch")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "anchor-text" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter sx={{ background: "unset" }}>
                  <Box sx={{ p: "0px 12px" }}>
                    <TextareaAutosize
                      value={params?.anchorText}
                      onChange={(e) => setParams({ ...params, anchorText: e.target.value })}
                      placeholder={t("pool.searchMetadata")}
                      onKeyPress={handleKeyPress}
                    />
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "action-type"} onChange={handleChange("action-type")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={ActionTypeIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.actionType")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "action-type" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter
                  sx={{ maxHeight: "170px", display: "block", overflowX: "hidden", overflowY: "auto" }}
                >
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{ p: "0px 16px" }}
                    value={params?.actionType}
                    onChange={(e) => setParams({ ...params, actionType: e.target.value })}
                  >
                    {(voterType === VOTE_TYPE.DREP_KEY_HASH ? actionTypeListDrep : actionTypeListPools).map((i) => (
                      <FormControlLabel
                        key={i.value}
                        value={i.value}
                        checked={i.value === params?.actionType}
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={
                          <Typography
                            fontSize="16px"
                            fontWeight={400}
                            lineHeight={1}
                            noWrap
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="15rem"
                          >
                            {i.text}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "current-status"} onChange={handleChange("current-status")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={CurrentStatusIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.currentStatus")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "current-status" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{ p: "0px 16px" }}
                    value={params?.currentStatus}
                    onChange={(e) => setParams({ ...params, currentStatus: e.target.value })}
                  >
                    {currentStatusList.map((i) => (
                      <FormControlLabel
                        key={i.value}
                        value={i.value}
                        checked={i.value === params?.currentStatus}
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={
                          <Typography
                            fontSize="16px"
                            fontWeight={400}
                            lineHeight={1}
                            noWrap
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="15rem"
                          >
                            {i.text}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "vote"} onChange={handleChange("vote")}>
                <AccordionSummary>
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={VoteIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box fontSize="16px" ml={1} color={({ palette }) => palette.secondary.main}>
                        {t("pool.vote")}
                      </Box>
                    </Box>
                    <Box>
                      {expanded === "vote" ? (
                        <IoIosArrowUp color={theme.palette.secondary.main} />
                      ) : (
                        <IoIosArrowDown color={theme.palette.secondary.main} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetailsFilter>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{ p: "0px 16px" }}
                    value={params?.vote}
                    onChange={(e) => setParams({ ...params, vote: e.target.value })}
                  >
                    {voteList.map((i) => (
                      <FormControlLabel
                        key={i.value}
                        value={i.value}
                        checked={i.value === params?.vote}
                        control={
                          <Radio
                            sx={{
                              color: theme.palette.secondary.light
                            }}
                          />
                        }
                        label={
                          <Typography
                            fontSize="16px"
                            fontWeight={400}
                            lineHeight={1}
                            noWrap
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="15rem"
                          >
                            {i.text}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionSummary>
                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <CustomIcon icon={ExpiryIcon} fill={theme.palette.secondary.main} height={18} />
                    <Box
                      fontSize="16px"
                      ml={1}
                      color={({ palette }) => palette.secondary.main}
                      onClick={() => setOpenDateRange(true)}
                    >
                      {t("pool.dateRange")}
                    </Box>
                  </Box>
                  {!isEmpty(params?.fromDate) && <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />}
                </Box>
                <DateRangeModal
                  open={openDateRange}
                  value={{ fromDate: filterValue?.fromDate, toDate: filterValue?.toDate }}
                  onDateRangeChange={({ fromDate, toDate }) => {
                    setParams?.({
                      ...params,
                      fromDate: moment(fromDate, DATETIME_PARTTEN).startOf("d").utc().format(DATETIME_PARTTEN),
                      toDate: moment(toDate, DATETIME_PARTTEN).endOf("d").utc().format(DATETIME_PARTTEN)
                    });
                  }}
                  onClose={() => setOpenDateRange(false)}
                />
              </AccordionSummary>
              <Box my={1} p="0px 16px">
                <ApplyFilterButton
                  data-testid="apply-filters"
                  onClick={() => {
                    handleFilter();
                  }}
                  disabled={JSON.stringify(filterValue) === JSON.stringify(params)}
                >
                  {t("common.applyFilters")}
                </ApplyFilterButton>
              </Box>
              <Box
                component={Button}
                width={"100%"}
                textTransform={"capitalize"}
                display={"flex"}
                alignItems={"center"}
                color={({ palette }) => `${palette.primary.main} !important`}
                onClick={handleReset}
              >
                <Box mr={1}>{t("common.reset")}</Box>
                <CustomIcon icon={ResetIcon} fill={theme.palette.primary.main} width={18} />
              </Box>
            </Box>
          )}
        </FilterContainer>
      </FilterWrapper>
    </ClickAwayListener>
  );
};
