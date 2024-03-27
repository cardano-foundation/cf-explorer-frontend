import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Grid,
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
  Link
} from "@mui/material";
import QueryString, { parse, stringify } from "qs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { JsonViewer } from "@textea/json-viewer";

import {
  ActionTypeIcon,
  AnchorTextIcon,
  ArrowLeftWhiteIcon,
  BlackCircleIcon,
  BlackWarningIcon,
  CurrentStatusIcon,
  GovernanceIdIcon,
  PoolDeresgistrationHistory,
  PoolDeresgistrationHistoryDark,
  PoolResgistrationHistory,
  PoolResgistrationHistoryDark,
  PoolUpdateHistory,
  PoolUpdateHistoryDark,
  SubmissionDateIcon,
  VoteIcon,
  VotesAbstainIcon,
  VotesNoIcon,
  VotesYesIcon,
  VotingPowerIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import {
  DREP_ACTION_TYPE,
  POOLS_ACTION_TYPE,
  POOLS_VOTE_TYPE,
  POOL_ACTION_TYPE,
  STATUS_VOTE
} from "src/commons/utils/constants";
import {
  formatADAFull,
  formatDateTimeLocal,
  getShortHash,
  getShortNumber,
  numberWithCommas,
  removeDuplicate
} from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CardGovernanceVotes, { GovernanceStatus, VoteStatus } from "src/components/commons/CardGovernanceVotes";
import CopyButton from "src/components/commons/CopyButton";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column, FooterTable } from "src/components/commons/Table";
import useFetch from "src/commons/hooks/useFetch";
import { ViewJson } from "src/components/ScriptModal/styles";

import { DataContainer, InfoTitle, InfoValue, Item, StyledGrid, StyledTitle } from "../DelegationDetailInfo/styles";
import { StyledLink, Tab } from "./styles";

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
  voteId?: number | string;
  governanceActionTxHash?: string;
  actionType?: string;
  actionStatus?: string;
  voteType?: string;
  voterType?: string;
  isRepeatVote?: boolean;
}

interface TabButtonProps {
  tabName: string;
  children: React.ReactNode;
}

export interface GovernanceVote {
  index: number;
  status: string;
  txHash: string;
  type: string;
  vote: string;
  votingPower: string;
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
  expiryDate: string;
  historyVotes: {
    no: number | null;
    vote: string;
    timestamp: string;
  }[];
}

const DelegationEpochList = ({
  data,
  loading,
  total,
  initialized
}: {
  data: DelegationEpoch[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  scrollEffect: () => void;
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };
  const columns: Column<DelegationEpoch>[] = [
    {
      title: t("common.Epoch"),
      key: "epoch",
      minWidth: "120px",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    },
    {
      title: t("blocks"),
      key: "block",
      minWidth: "120px",
      render: (data) => numberWithCommas(data.block)
    },
    {
      title: (
        <Box component={"span"}>
          {t("stakeAmount")} (<ADAicon />)
        </Box>
      ),
      key: "stakeAmount",
      minWidth: "120px",

      render: (data) => <Box component={"span"}>{formatADAFull(data.stakeAmount)}</Box>
    },
    {
      title: (
        <Box component={"span"}>
          {t("delegatorRewards")} (<ADAicon />)
        </Box>
      ),
      key: "delegatorReward",
      minWidth: "120px",
      render: (data) => (
        <Box component={"span"}>
          {typeof data.delegators === "number" ? formatADAFull(data.delegators) : t("common.N/A")}
        </Box>
      )
    },
    {
      title: (
        <Box component={"span"}>
          {t("fees")} (<ADAicon />)
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (data) => (
        <Box component={"span"}>{typeof data.fee === "number" ? formatADAFull(data.fee) : t("common.N/A")}</Box>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={data}
      total={{ count: total, title: t("glossary.totalTokenList") }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ tab: query.tab, page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total
      }}
    />
  );
};

const DelegationStakingDelegatorsList = ({
  data,
  initialized,
  loading,
  total
}: {
  data: StakingDelegators[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  scrollEffect: () => void;
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory();
  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };
  const columns: Column<StakingDelegators>[] = [
    {
      title: t("no"),
      key: "no",
      render: (r, idx) => idx + 1
    },
    {
      title: t("delegator"),
      key: "delegator",
      minWidth: "50px",
      render: (data) =>
        data.view && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomTooltip title={data.view || ""}>
              <StyledLink to={details.stake(data.view)}>{getShortHash(data.view || "")}</StyledLink>
            </CustomTooltip>
            <CopyButton text={data.view || ""} />
          </div>
        )
    },
    {
      title: (
        <Box component="span">
          {t("totalValue")} (<ADAicon />)
        </Box>
      ),
      key: "value",
      minWidth: "120px",
      render: (data) => (
        <Box component={"span"}>{data.totalStake != null ? formatADAFull(data.totalStake) : t("common.N/A")}</Box>
      )
    },
    {
      title: t("stakedTime"),
      key: "stakedTime",
      minWidth: "120px",
      render: (data) => formatDateTimeLocal(data.time || "")
    },
    {
      title: (
        <Box component="span">
          {t("fees")} (<ADAicon />)
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (data) => <Box component={"span"}>{formatADAFull(data.fee)}</Box>
    }
  ];

  return (
    <Table
      columns={columns}
      data={data ? data : []}
      total={{ count: total, title: t("glossary.totalTokenList") }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ tab: query.tab, page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total
      }}
      onClickRow={(e, r) => {
        history.push(details.stake(r.view));
      }}
    />
  );
};

const DelegationCertificatesHistory = ({
  data,
  initialized,
  loading,
  total
}: {
  data: CertificateHistory[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  scrollEffect: () => void;
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory();
  const theme = useTheme();

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };

  const renderAction = (type: POOL_ACTION_TYPE | DREP_ACTION_TYPE) => {
    if (type === POOL_ACTION_TYPE.POOL_REGISTRATION || type === DREP_ACTION_TYPE.REG_DREP_CERT) {
      return (
        <CustomTooltip title={type === POOL_ACTION_TYPE.POOL_REGISTRATION ? "Pool Registration" : "Drep Registration"}>
          {theme.isDark ? <PoolResgistrationHistoryDark /> : <PoolResgistrationHistory />}
        </CustomTooltip>
      );
    }
    if (type === POOL_ACTION_TYPE.POOL_UPDATE || type === DREP_ACTION_TYPE.UPDATE_DREP_CERT) {
      return (
        <CustomTooltip title={type === POOL_ACTION_TYPE.POOL_UPDATE ? "Pool Update" : "Drep Update"}>
          {theme.isDark ? <PoolUpdateHistoryDark /> : <PoolUpdateHistory />}
        </CustomTooltip>
      );
    }
    if (type === POOL_ACTION_TYPE.POOL_DE_REGISTRATION || type === DREP_ACTION_TYPE.UNREG_DREP_CERT) {
      return (
        <CustomTooltip
          title={type === POOL_ACTION_TYPE.POOL_DE_REGISTRATION ? "Pool Deregistration" : "Drep Deregistration"}
        >
          {theme.isDark ? <PoolDeresgistrationHistoryDark /> : <PoolDeresgistrationHistory />}
        </CustomTooltip>
      );
    }
  };

  const columns: Column<CertificateHistory>[] = [
    {
      title: t("certificatesHistory.txHash"),
      key: "txHash",
      minWidth: "180px",
      render: (data) =>
        data.txHash && (
          <CustomTooltip title={data.txHash || ""}>
            <StyledLink to={details.transaction(data.txHash, "poolCertificates")}>
              {getShortHash(data.txHash || "")}
            </StyledLink>
          </CustomTooltip>
        )
    },
    {
      title: t("common.createdAt"),
      key: "createdAt",
      minWidth: "180px",
      render: (data) => formatDateTimeLocal(data.createdAt || "")
    },
    {
      title: t("certificatesHistory.block"),
      key: "block",
      minWidth: "100px",
      render: (data) => <StyledLink to={details.block(data.blockNo)}>{data.blockNo}</StyledLink>
    },
    {
      title: t("epoch"),
      key: "value",
      minWidth: "80px",
      render: (data) => <StyledLink to={details.epoch(data.epochNo)}>{data.epochNo}</StyledLink>
    },
    {
      title: t("common.slot"),
      key: "slot",
      minWidth: "90px",
      render: (data) => <>{data.epochSlotNo || data.slotNo}</>
    },
    {
      title: t("certificatesHistory.absoluteSlot"),
      key: "absoluteSlot",
      minWidth: "130px",
      render: (data) => {
        return <>{data.slotNo}</>;
      }
    },
    {
      title: t("common.action"),
      key: "fees",
      minWidth: "210px",
      render: (data) => {
        return (
          <Box display={"flex"} gap={2}>
            {(data.actions || data.actionTypes) &&
              removeDuplicate(data.actions || data.actionTypes).map((action: POOL_ACTION_TYPE, idx) => (
                <React.Fragment key={"poolAction" + data.txHash + idx}>{renderAction(action)}</React.Fragment>
              ))}
          </Box>
        );
      }
    }
  ];

  return (
    <Table
      columns={columns}
      data={data ? data : []}
      total={{ count: total, title: t("glossary.totalTokenList") }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ tab: query.tab, page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total
      }}
    />
  );
};

interface DelegationGovernanceVotesProps {
  data: GovernanceVote[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  poolHash?: string;
}

const DelegationGovernanceVotes: React.FC<DelegationGovernanceVotesProps> = ({ data, total, poolHash }) => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  // const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const history = useHistory();
  const theme = useTheme();
  const { t } = useTranslation();

  const [tab, setTab] = useState<string>("pool");

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };

  const TabButton: React.FC<TabButtonProps> = ({ tabName, children }) => (
    <Tab
      sx={{
        borderRadius: tabName === "pool" ? "8px 0px 0px 8px !important" : "0px 8px 8px 0px !important",
        background: tab === tabName ? theme.palette.primary[200] : "",
        border: `1px solid ${tab === tabName ? theme.palette.primary.main : theme.palette.primary[200]} !important`,
        color: `${tab === tabName ? theme.palette.primary.main : theme.palette.secondary.light} !important`,
        fontWeight: 600
      }}
      onClick={() => handleTabChange(tabName)}
    >
      {children}
    </Tab>
  );

  const fetchDataGovernanceVotesDetail = useFetch<GovernanceVoteDetail>(
    `${API.POOL_CERTIFICATE.POOL_DETAIL(poolHash || "")}?${stringify({
      txHash: query.voteId,
      index: 0,
      voterType: POOLS_VOTE_TYPE.STAKING_POOL_KEY_HASH
    })}`
  );

  const fetchDataGovernanceChart = useFetch<GovernanceVoteChart>(
    `${API.POOL_CERTIFICATE.POOL_CHART}?${stringify({
      txHash: query.voteId,
      index: 0
    })}`
  );

  if (query.voteId) {
    const actionType = (type: string) => {
      switch (type) {
        case POOLS_ACTION_TYPE.UPDATE_COMMITTEE:
          return t("pool.normalState");
        case POOLS_ACTION_TYPE.HARD_FORK_INITIATION_ACTION:
          return t("pool.harkFork");
        case POOLS_ACTION_TYPE.NO_CONFIDENCE:
          return t("pool.typeMotion");
        case POOLS_ACTION_TYPE.INFO_ACTION:
          return t("pool.Infor");

        default:
          break;
      }
    };
    return (
      <>
        <Box display="flex" alignItems="center">
          <Button
            variant="text"
            onClick={() => {
              setQuery({
                tab: "governanceVotes",
                page: 0,
                size: 6,
                governanceActionTxHash: "",
                actionType: STATUS_VOTE.ALL,
                actionStatus: STATUS_VOTE.ANY,
                voteType: STATUS_VOTE.ANY,
                voterType: POOLS_VOTE_TYPE.STAKING_POOL_KEY_HASH,
                isRepeatVote: false
              });
              setTab("pool");
            }}
          >
            <ArrowLeftWhiteIcon />
          </Button>
          <Typography
            m="auto"
            fontSize="32px"
            fontWeight={600}
            lineHeight="28px"
            color={theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light}
          >
            {actionType(fetchDataGovernanceVotesDetail.data?.govActionType || "")} #
            {fetchDataGovernanceVotesDetail.data?.index}
          </Typography>
        </Box>
        <Box textAlign="center">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <TabButton tabName="pool">{t("common.poolName")}</TabButton>
            <TabButton tabName="overall">{t("common.overall")}</TabButton>
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
              {tab === "pool" ? t("pool.tabPool") : t("pool.overall")}
            </Typography>
          </Box>
        </Box>
        <GovernanceVotesDetail
          tab={tab}
          data={fetchDataGovernanceVotesDetail.data}
          dataChart={fetchDataGovernanceChart.data}
        />
      </>
    );
  }

  return (
    <>
      <Grid container spacing={"20px"} pt="23px">
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
                size: Number(query.size)
              });
            }}
          >
            <CardGovernanceVotes data={value} />
          </Grid>
        ))}
      </Grid>
      <FooterTable
        pagination={{
          size: Number(query.size),
          total,
          onChange: (page, size) => history.replace({ search: stringify({ ...query, page, size }) })
        }}
        loading={false}
        optionList={[6, 9, 12]}
      />
    </>
  );
};

export {
  DelegationCertificatesHistory,
  DelegationEpochList,
  DelegationGovernanceVotes,
  DelegationStakingDelegatorsList
};

const GovernanceVotesDetail: React.FC<{
  tab: string;
  data: GovernanceVoteDetail | null;
  dataChart: GovernanceVoteChart | null;
}> = ({ tab, data, dataChart }) => {
  const theme = useTheme();
  const [openHistoryVoteModal, setOpenHistoryVoteModal] = useState<boolean>(false);
  const [openActionMetadataModal, setOpenActionMetadataModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const [selectVote, setSelectVote] = useState<string>("");
  const listVotes = ["SPOs", "DRops", "CC"];

  const filterDataChart = (selectVote: string) => {
    switch (selectVote) {
      case "SPOs":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "STAKING_POOL_KEY_HASH")[0];
      case "DRops":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "DREP_KEY_HASH")[0];
      case "CC":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH")[0];

      default:
        return dataChart;
    }
  };

  const actionType = (type: string) => {
    switch (type) {
      case POOLS_ACTION_TYPE.UPDATE_COMMITTEE:
        return t("pool.normalState");
      case POOLS_ACTION_TYPE.HARD_FORK_INITIATION_ACTION:
        return t("pool.harkFork");
      case POOLS_ACTION_TYPE.NO_CONFIDENCE:
        return t("pool.typeMotion");
      case POOLS_ACTION_TYPE.INFO_ACTION:
        return t("pool.Infor");

      default:
        break;
    }
  };

  return (
    <DataContainer sx={{ boxShadow: "unset" }}>
      <StyledGrid container>
        <Item item xs={6} md={3} top={1}>
          <Box display="flex" justifyContent="space-between">
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
                background: theme.palette.primary[100],
                border: `1px solid ${theme.palette.secondary[600]}`,
                width: "fit-content",
                p: "3px 2px 3px 12px"
              }}
            >
              <CustomTooltip title={data?.txHash}>
                <Typography fontSize="12px" fontWeight="500" lineHeight="14.52px" color={theme.palette.secondary[600]}>
                  {getShortHash(data?.txHash)}
                </Typography>
              </CustomTooltip>
              <CopyButton
                text={data?.txHash}
                customIcon={BlackCircleIcon}
                data-testid="copy-button"
                height={24}
                fill={theme.palette.secondary[0]}
              />
            </Box>
          </InfoValue>
        </Item>
        <Item item xs={6} md={3} top={1}>
          <Box display="flex" justifyContent="space-between">
            <CustomIcon fill={theme.palette.secondary.light} icon={ActionTypeIcon} height={22.27} marginTop="15px" />
            <BlackWarningIcon />
          </Box>
          <InfoTitle paddingTop="2px" paddingBottom="3px">
            <StyledTitle>{t("pool.actionType")}</StyledTitle>
          </InfoTitle>
          <InfoValue>{actionType(data?.govActionType || "")}</InfoValue>
        </Item>
        <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
          <Box display="flex" justifyContent="space-between">
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
              <Box display="flex" gap="8px">
                {(selectVote ? listVotes.slice(0, 1) : listVotes).map((i) => (
                  <Chip
                    key={i}
                    sx={{
                      background: theme.palette.primary[100],
                      border: `1px solid ${theme.palette.secondary[600]}`,
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
                    }}
                    label={selectVote || i}
                    onClick={() => setSelectVote(selectVote ? "" : i)}
                  />
                ))}
                {selectVote && (
                  <Chip
                    sx={{
                      background: theme.palette.primary[100],
                      border: `1px solid ${theme.palette.secondary[600]}`,
                      color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light
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
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenHistoryVoteModal(true);
                }}
              >
                <VoteStatus status={data?.voteType || ""} />
              </Box>
            ) : (
              <VoteRate data={filterDataChart(selectVote)} />
            )}
          </InfoValue>
        </Item>
        <Item item xs={6} md={3} top={1} sx={{ position: "relative" }} width={"100%"}>
          <Box display="flex" justifyContent="space-between">
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
          <CustomIcon
            fill={theme.palette.secondary.light}
            height={27}
            icon={VotingPowerIcon}
            style={{ marginTop: "5px" }}
          />
          <InfoTitle paddingBottom="3px">
            <StyledTitle>{t("pool.votingPowerADA")}</StyledTitle>
          </InfoTitle>
          <InfoValue sx={{ wordBreak: "break-word" }}>
            {data?.votingPower ? `${data?.votingPower} ADA` : "N/A"}{" "}
          </InfoValue>
        </Item>
        <Item item xs={6} md={3}>
          <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
          <InfoTitle paddingBottom="3px">
            <StyledTitle>{t("pool.submission")}</StyledTitle>
          </InfoTitle>
          <InfoValue>{moment(data?.submissionDate).format("MM/DD/YYYY HH:mm:ss")}</InfoValue>
        </Item>
        <Item item xs={6} md={3}>
          <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
          <InfoTitle paddingBottom="3px">
            <StyledTitle>{t("pool.expiryDate")}</StyledTitle>
          </InfoTitle>
          <InfoValue>{moment(data?.expiryDate).format("DD/MM/YYYY")}</InfoValue>
        </Item>
        <Item item xs={6} md={3}>
          <CustomIcon fill={theme.palette.secondary.light} height={25} icon={AnchorTextIcon} />
          <InfoTitle paddingBottom="3px">
            <StyledTitle>{t("pool.anchorText")}</StyledTitle>
          </InfoTitle>
          <InfoValue>
            <Button
              onClick={() => {
                setOpenActionMetadataModal(true);
              }}
              fullWidth
              sx={{ height: "51px" }}
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
        onClose={() => setOpenActionMetadataModal(false)}
      />
    </DataContainer>
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
              3,443,875.343 ADA (94%)
            </Typography>
          </Box>
        }
        placement="top"
      >
        <Box sx={{ background: color }} height={`${!percentage ? 0.5 : percentage}px`} width="36px" />
      </LightTooltip>
      <Typography fontSize="14px" fontWeight={400} pt="4px" textTransform="uppercase">
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
    <Box display="flex" alignItems="end" justifyContent="space-between" width="100%">
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

const VoteHistoryModal: React.FC<VoteHistoryProps> = ({ onClose, open, data }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CustomModal open={open} onClose={() => onClose?.()} title={t("pool.votingHistory")} width={500}>
      <Box display="flex" alignItems="center" gap="12px" pb="25.5px">
        <Typography
          fontSize="24px"
          color={{ color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light }}
        >
          {t("pool.currentVote")}:
        </Typography>{" "}
        <VoteStatus status={(data && data[0].vote) || ""} />
      </Box>
      <TableContainer sx={{ p: "0px 10px", background: theme.isDark ? "" : theme.palette.secondary[0] }}>
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
                  {row.timestamp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableMui>
      </TableContainer>
    </CustomModal>
  );
};

interface ActionMetadataProps {
  onClose?: () => void;
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

const ActionMetadataModal: React.FC<ActionMetadataProps> = ({ onClose, open, data, anchorHash, anchorUrl }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CustomModal
      open={open}
      onClose={() => onClose?.()}
      title={t("pool.actionMetadata")}
      width={500}
      sx={{ position: "relative", height: "70vh" }}
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
          sx={{ background: theme.isDark ? "" : theme.palette.secondary[0], wordWrap: "break-word" }}
        >
          <Typography fontSize="16px" color={theme.palette.secondary.light}>
            {anchorHash}
          </Typography>
          <Typography
            component={Link}
            fontSize="16px"
            color="#0033AD !important"
            fontWeight="700"
            target="_blank"
            rel="noopener noreferrer"
            href={anchorUrl || "/"}
          >
            {anchorUrl}
          </Typography>
        </Box>
      </Box>
      <Box display="block" pb="25.5px">
        <Typography fontSize="16px">{t("pool.metadata")}:</Typography>{" "}
        <Box
          display="flex"
          flexDirection="column"
          gap="24px"
          mt="20px"
          p="24px"
          sx={{ background: theme.isDark ? "" : theme.palette.secondary[0], position: "absolute" }}
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
