import React, { useEffect, useState } from "react";
import { ParsedQs, parse, stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Table as TableMui,
  TableRow,
  Typography,
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
  CurrentStatusIcon,
  ExpiryIcon,
  FilterIcon,
  GovernanceIdIcon,
  RepeatVotesIcon,
  ResetIcon,
  VoteIcon
} from "src/commons/resources";
import { API } from "src/commons/utils/api";
import { POOLS_ACTION_TYPE, VOTE_TYPE, STATUS_VOTE } from "src/commons/utils/constants";
import CardGovernanceVotes, { VoteStatus, actionTypeListDrep } from "src/components/commons/CardGovernanceVotes";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomModal from "src/components/commons/CustomModal";
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
import DateRangeModal, { DATETIME_PARTTEN, DateRange } from "src/components/commons/CustomFilter/DateRangeModal";
import FormNowMessage from "src/components/commons/FormNowMessage";
import useFetch from "src/commons/hooks/useFetch";
import { useScreen } from "src/commons/hooks/useScreen";

import { TimeDuration } from "../TransactionLists/styles";
import NoRecord from "../commons/NoRecord";
import DynamicEllipsisText from "../DynamicEllipsisText";
import { ViewJson } from "../ScriptModal/styles";
import { AntSwitch, HashName, StyledArea } from "./styles";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";
import OverviewVote from "./OverviewVote";
import OverallVote from "./OverallVote";
import FetchDataErr from "../commons/FetchDataErr";

const DelegationGovernanceVotes: React.FC<DelegationGovernanceVotesProps> = ({ hash, type }) => {
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [params, setParams] = useState({});
  const [index, setIndex] = useState<number | undefined>();
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

  const { data, total, lastUpdated, loading, initialized, error, statusError } = useFetchList<GovernanceVote>(
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
        <GovernanceVotesDetail hash={hash} voteId={(query?.voteId as string) || ""} index={index} type={type} />
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
        {((data && data.length === 0 && initialized && !error) || (error && statusError !== 500)) && (
          <NoRecord m="170px 0px" padding={`0 !important`} />
        )}
        {error && statusError === 500 && <FetchDataErr m="170px 0px" padding={`0 !important`} />}
        {data?.map((value, index) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={index}
            onClick={() => {
              setIndex(value.index);
              history.push(
                {
                  search: stringify({
                    tab: query.tab,
                    voteId: value.txHash,
                    page: Number(query.page),
                    voteSize: Number(query.size)
                  })
                },
                history.location.state
              );
            }}
          >
            <CardGovernanceVotes data-testid="governance.card" data={value} />
          </Grid>
        ))}
      </Box>
    );
  };

  return (
    <>
      {!error && (
        <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <FilterGovernanceVotes setQuery={setQuery} query={query} voterType={type} />
        </Box>
      )}
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
  index?: number;
}> = ({ hash, voteId, type, index }) => {
  const theme = useTheme();

  const { t } = useTranslation();
  const { isGalaxyFoldSmall } = useScreen();
  const { drepId, poolId } = useParams<{ drepId: string; poolId: string }>();

  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const { data, loading, initialized } = useFetch<GovernanceVoteDetail>(
    `${API.POOL_CERTIFICATE.POOL_DETAIL(hash || "")}?${stringify({
      txHash: voteId,
      index: index || 0,
      voterType: type
    })}`
  );

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
          fontWeight: 600,
          "&:hover": {
            background: theme.palette.primary[200]
          }
        }}
        onClick={() => handleTabChange(tabName)}
      >
        <>{title}</>
        <>{children}</>
      </Box>
    );
  };

  if (loading || !initialized) {
    return <Box component={Skeleton} variant="rectangular" height={"400px"} borderRadius={2} />;
  }

  return (
    <Box>
      <Box display="block" alignItems="baseline">
        <Box m="auto">
          <Box position="relative">
            <Box
              data-testid="governance.back"
              sx={{ position: "absolute", top: isGalaxyFoldSmall ? -2 : -9, minHeight: "unset", cursor: "pointer" }}
              onClick={() => {
                history.goBack();
                setTab("pool");
              }}
            >
              <ArrowLeftWhiteIcon width={isGalaxyFoldSmall ? 30 : 44} height={isGalaxyFoldSmall ? 30 : 44} />
            </Box>
            <HashName data-testid="governance.hashName">
              {actionTypeListDrep.find((action) => action.value === data?.govActionType)?.text} #{data?.index}
            </HashName>
          </Box>
          <Box textAlign="center">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <TabButton data-testid="governance.poolTab" tabName="pool">
                <Box width={85}>
                  {data?.poolName && data.poolName.length < 10 ? (
                    data.poolName
                  ) : (
                    <DynamicEllipsisText
                      sx={{ textTransform: data?.poolName ? "unset" : "lowercase" }}
                      postfix={3}
                      sxLastPart={{ textTransform: "none", direction: "ltr" }}
                      sxFirstPart={{ textTransform: "none" }}
                      isNoLimitPixel={true}
                      isTooltip
                      value={data?.poolName || poolId || drepId || ""}
                    />
                  )}
                </Box>
              </TabButton>
              <TabButton data-testid="governance.overallTab" tabName="overall" title={t("common.overall")} />
            </ButtonGroup>
            <Box display="flex" justifyContent="center">
              <Typography
                data-testid="governance.descriptionTab"
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
      {tab === "pool" && <OverviewVote data={data} />}
      {tab === "overall" && <OverallVote data={data} voteId={voteId} index={index} />}
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
  allowedVoteByCC: boolean;
  allowedVoteBySPO: boolean;
  expiryDate: string;
  historyVotes: {
    no: number | null;
    vote: string;
    timestamp: string;
  }[];
}

export const VoteHistoryModal: React.FC<VoteHistoryProps> = ({ onClose, open, data }) => {
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
          data-testid="governance.voteModal.currentVoteTitle"
          fontSize="24px"
          color={{ color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light }}
        >
          {t("pool.currentVote")}:
        </Typography>{" "}
        <VoteStatus data-testid="governance.voteModal.currentVoteValue" status={(data && data[0].vote) || ""} />
      </Box>
      <TableContainer sx={{ p: "0px 10px", background: theme.isDark ? "" : theme.palette.secondary[0], width: "auto" }}>
        <TableMui aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                data-testid="governance.voteModal.noTitle"
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
                data-testid="governance.voteModal.voteTitle"
                sx={{
                  fontWeight: 700,
                  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                }}
                padding="none"
              >
                {t("pool.vote")}
              </TableCell>
              <TableCell
                data-testid="governance.voteModal.timestampTitle"
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
                  data-testid="governance.voteModal.index"
                  sx={{
                    padding: "11px",
                    color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                  }}
                  padding="none"
                >
                  {index + 1}
                </TableCell>
                <TableCell data-testid="governance.voteModal.voteStatus" padding="none">
                  <Box width="fit-content" mt="8px">
                    <VoteStatus status={row.vote} />
                  </Box>
                </TableCell>
                <TableCell
                  data-testid="governance.voteModal.datetime"
                  sx={{ color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light }}
                  padding="none"
                >
                  <DatetimeTypeTooltip>{formatDateTimeLocal(row.timestamp)}</DatetimeTypeTooltip>
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

export const ActionMetadataModal: React.FC<ActionMetadataProps> = ({
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
        <Typography data-testid="governance.metadataModal.anchor" color={theme.palette.secondary.main}>
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
          <Typography
            data-testid="governance.metadataModal.anchorHash"
            fontSize="16px"
            color={theme.palette.secondary.light}
          >
            {anchorHash}
          </Typography>
          <Box>
            <Box
              data-testid="governance.metadataModal.anchorUrl"
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
          </Box>
        </Box>
      </Box>
      <Box display="block">
        <Typography data-testid="governance.metadataModal.metadata" color={theme.palette.secondary.main}>
          {t("pool.metadata")}:
        </Typography>{" "}
        <Box
          data-testid="governance.metadataModal.viewJson"
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
              style={{ wordBreak: "break-word", width: "98%" }}
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
        <Box data-testid="governance.actionMetadataModal.disclaimer" fontSize={16} color={theme.palette.secondary.main}>
          {t("drep.disclaimer.des1")}
        </Box>
        <Box
          data-testid="governance.actionMetadataModal.disclaimerDes"
          fontSize={16}
          color={theme.palette.secondary.main}
          my={2}
        >
          {t("drep.disclaimer.des2")}
        </Box>
        <Box
          data-testid="governance.actionMetadataModal.externalLink"
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
  actionStatus?: string;
  voteType?: string;
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

  const [params, setParams] = useState<FilterParams | null>(query || filterValue || {});
  const [paramsFilter, setParamsFilter] = useState<FilterParams | null>(filterValue || {});
  const [dateRange, setDateRange] = useState<DateRange>({ fromDate: "", toDate: "" });

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleReset = () => {
    setExpanded(false);
    setOpen(false);
    setParams(filterValue);
    setParamsFilter(filterValue);
    setDateRange({ fromDate: "", toDate: "" });
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
    setParamsFilter(params);
    setQuery({
      tab: query.tab,
      isRepeatVote: params?.isRepeatVote ? params?.isRepeatVote : undefined,
      page: 1,
      size: 6,
      governanceActionTxHash: params?.governanceActionTxHash,
      anchorText: params?.anchorText,
      actionType: params?.actionType,
      actionStatus: params?.actionStatus,
      voterType: VOTE_TYPE.STAKING_POOL_KEY_HASH,
      voteType: params?.voteType,
      ...(dateRange?.fromDate && { fromDate: dateRange.fromDate || "" }),
      ...(dateRange?.toDate && { toDate: dateRange.toDate || "" })
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
    { value: POOLS_ACTION_TYPE.ALL, text: t("common.all") },
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
          data-testid="governance.filter"
          component={Button}
          variant="text"
          px={2}
          textTransform={"capitalize"}
          bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary[100] : palette.primary[200])}
          border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
          onClick={() => setOpen((pre) => !pre)}
          sx={{
            ":hover": {
              bgcolor: theme.mode === "dark" ? theme.palette.secondary[100] : theme.palette.secondary[100]
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
              <Box data-testid="governance.filter.repeatVotes" component={ButtonSort} p="0px 16px" height="48px">
                <Box display={"flex"} alignItems={"center"} justifyContent="space-between" width="100%">
                  <Box display="flex">
                    <CustomIcon icon={RepeatVotesIcon} fill={theme.palette.secondary.light} width={16} height={24} />
                    <Typography
                      data-testid="governance.filter.repeatTitle"
                      ml={1}
                      color={({ palette }) => palette.secondary.main}
                    >
                      {t("pool.repeatVotes")}
                    </Typography>
                  </Box>
                  <AntSwitch
                    data-testid="governance.filter.repeatValue"
                    checked={params?.isRepeatVote}
                    onChange={(e) => setParams({ ...params, isRepeatVote: e.target.checked })}
                  />
                </Box>
              </Box>
              <AccordionContainer expanded={expanded === "action-id"} onChange={handleChange("action-id")}>
                <AccordionSummary data-testid="governance.filter.actionId">
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={GovernanceIdIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box
                        data-testid="governance.filter.actionIdTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
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
                    data-testid="governance.filter.actionIdValue"
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
                <AccordionSummary data-testid="governance.filter.metadataSearch">
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={AnchorTextIcon} fill={theme.palette.secondary.light} height={18} />
                      <Box
                        data-testid="governance.filter.metadataSearchTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
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
                  <Box>
                    <StyledArea
                      data-testid="governance.filter.metadataSearchValue"
                      multiline
                      rows={3}
                      sx={{
                        p: "0px 12px",
                        width: "100% !important",
                        color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                      }}
                      placeholder={t("pool.searchMetadata")}
                      value={params?.anchorText}
                      onChange={({ target: { value } }) => setParams({ ...params, anchorText: value })}
                      onKeyPress={handleKeyPress}
                    />
                  </Box>
                </AccordionDetailsFilter>
              </AccordionContainer>
              <AccordionContainer expanded={expanded === "action-type"} onChange={handleChange("action-type")}>
                <AccordionSummary data-testid="governance.filter.actionType">
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={ActionTypeIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box
                        data-testid="governance.filter.actionTypeTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
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
                    data-testid="governance.filter.actionTypeValue"
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
                        checked={
                          params?.actionType ? i.value === params?.actionType : POOLS_ACTION_TYPE.ALL === i.value
                        }
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
                <AccordionSummary data-testid="governance.filter.currentStatus">
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={CurrentStatusIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box
                        data-testid="governance.filter.currentStatusTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
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
                <AccordionDetailsFilter
                  sx={{ maxHeight: "170px", display: "block", overflowX: "hidden", overflowY: "auto" }}
                >
                  <RadioGroup
                    ata-testid="governance.filter.currentStatusValue"
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{ p: "0px 16px" }}
                    value={params?.actionStatus}
                    onChange={(e) => setParams({ ...params, actionStatus: e.target.value })}
                  >
                    {currentStatusList.map((i) => (
                      <FormControlLabel
                        key={i.value}
                        value={i.value}
                        checked={params?.actionStatus ? i.value === params?.actionStatus : STATUS_VOTE.ANY === i.value}
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
                <AccordionSummary data-testid="governance.filter.vote">
                  <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <CustomIcon icon={VoteIcon} fill={theme.palette.secondary.main} height={18} />
                      <Box
                        data-testid="governance.filter.voteTitle"
                        ml={1}
                        color={({ palette }) => palette.secondary.main}
                      >
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
                <AccordionDetailsFilter
                  sx={{ maxHeight: "170px", display: "block", overflowX: "hidden", overflowY: "auto" }}
                >
                  <RadioGroup
                    data-testid="governance.filter.voteValue"
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    sx={{ p: "0px 16px" }}
                    value={params?.voteType}
                    onChange={(e) => setParams({ ...params, voteType: e.target.value })}
                  >
                    {voteList.map((i) => (
                      <FormControlLabel
                        key={i.value}
                        value={i.value}
                        checked={params?.voteType ? i.value === params?.voteType : STATUS_VOTE.ANY === i.value}
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
              <AccordionSummary data-testid="governance.filter.dateRange">
                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <CustomIcon icon={ExpiryIcon} fill={theme.palette.secondary.main} height={18} />
                    <Box
                      data-testid="governance.filter.dateRangeTitle"
                      ml={1}
                      color={({ palette }) => palette.secondary.main}
                      onClick={() => setOpenDateRange(true)}
                    >
                      {t("pool.dateRange")}
                    </Box>
                  </Box>
                  {!isEmpty(dateRange?.fromDate) && (
                    <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />
                  )}
                </Box>
                <DateRangeModal
                  data-testid="governance.filter.dateRangeValue"
                  open={openDateRange}
                  value={{
                    fromDate: dateRange?.fromDate,
                    toDate: dateRange?.toDate
                  }}
                  onDateRangeChange={({ fromDate, toDate }) => {
                    setDateRange({
                      fromDate: moment(fromDate, DATETIME_PARTTEN).startOf("d").utc().format(DATETIME_PARTTEN),
                      toDate: moment(toDate, DATETIME_PARTTEN).endOf("d").utc().format(DATETIME_PARTTEN)
                    });
                  }}
                  onClose={() => setOpenDateRange(false)}
                  onClearValue={() => setDateRange({ fromDate: "", toDate: "" })}
                />
              </AccordionSummary>
              <Box my={1} p="0px 16px">
                <ApplyFilterButton
                  data-testid="governance.applyFilters"
                  onClick={() => {
                    handleFilter();
                  }}
                  disabled={
                    JSON.stringify(filterValue) === JSON.stringify(paramsFilter) &&
                    JSON.stringify(filterValue) === JSON.stringify(params) &&
                    JSON.stringify(filterValue.fromDate) === JSON.stringify(dateRange.fromDate) &&
                    JSON.stringify(filterValue.toDate) === JSON.stringify(dateRange.toDate)
                  }
                >
                  {t("common.applyFilters")}
                </ApplyFilterButton>
              </Box>
              <Box
                data-testid="governance.filter.reset"
                component={Button}
                width={"100%"}
                textTransform={"capitalize"}
                display={"flex"}
                alignItems={"center"}
                color={({ palette }) => `${palette.primary.main} !important`}
                onClick={handleReset}
              >
                <Box data-testid="governance.resetTitle" mr={1}>
                  {t("common.reset")}
                </Box>
                <CustomIcon icon={ResetIcon} fill={theme.palette.primary.main} width={18} />
              </Box>
            </Box>
          )}
        </FilterContainer>
      </FilterWrapper>
    </ClickAwayListener>
  );
};
