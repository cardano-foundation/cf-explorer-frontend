import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Tooltip,
  Typography,
  tooltipClasses,
  useTheme,
  Chip,
  TooltipProps
} from "@mui/material";
import QueryString, { parse, stringify } from "qs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

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
import { POOL_ACTION_TYPE } from "src/commons/utils/constants";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  numberWithCommas,
  removeDuplicate
} from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CardGovernanceVotes, { GovernanceStatus, VoteStatus } from "src/components/commons/CardGovernanceVotes";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column, FooterTable } from "src/components/commons/Table";
import CustomIcon from "src/components/commons/CustomIcon";

import { DataContainer, InfoTitle, InfoValue, Item, StyledGrid, StyledTitle } from "../DelegationDetailInfo/styles";
import { StyledLink, Tab } from "./styles";

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
  voteId?: number | string;
}

interface TabButtonProps {
  tabName: string;
  children: React.ReactNode;
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

  const renderAction = (type: POOL_ACTION_TYPE) => {
    if (type === POOL_ACTION_TYPE.POOL_REGISTRATION) {
      return (
        <CustomTooltip title="Pool Registration">
          {theme.isDark ? <PoolResgistrationHistoryDark /> : <PoolResgistrationHistory />}
        </CustomTooltip>
      );
    }
    if (type === POOL_ACTION_TYPE.POOL_UPDATE) {
      return (
        <CustomTooltip title="Pool Update">
          {theme.isDark ? <PoolUpdateHistoryDark /> : <PoolUpdateHistory />}
        </CustomTooltip>
      );
    }
    if (type === POOL_ACTION_TYPE.POOL_DE_REGISTRATION) {
      return (
        <CustomTooltip title="Pool Deregistration">
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
      render: (data) => <>{data.epochSlotNo}</>
    },
    {
      title: t("certificatesHistory.absoluteSlot"),
      key: "absoluteSlot",
      minWidth: "130px",
      render: (data) => <>{data.slotNo}</>
    },
    {
      title: t("common.action"),
      key: "fees",
      minWidth: "210px",
      render: (data) => {
        return (
          <Box display={"flex"} gap={2}>
            {data.actions &&
              removeDuplicate(data.actions).map((action: POOL_ACTION_TYPE, idx) => (
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

const governanceVotesData = [
  { vote: "yes", status: "enacted" },
  { vote: "no", status: "ballot" },
  { vote: "abstain", status: "ratified" },
  { vote: "none", status: "enacted" }
];

const DelegationGovernanceVotes = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory();
  const pageInfo = getPageInfo<{ isMultiSig?: string; openTimeLocked?: string }>(search);
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
        border: `1px solid ${tab === tabName ? theme.palette.primary.main : theme.palette.primary[200]} !important`
      }}
      onClick={() => handleTabChange(tabName)}
    >
      {children}
    </Tab>
  );

  if (query.voteId) {
    return (
      <>
        <Box display="flex" alignItems="center">
          <Button
            variant="text"
            onClick={() => {
              setQuery({ tab: "governanceVotes", page: 1, size: 50 });
              setTab("pool");
            }}
          >
            <ArrowLeftWhiteIcon />
          </Button>
          <Typography m="auto" fontSize="32px" fontWeight={600} lineHeight="28px">
            Governance Action Voting Name
          </Typography>
        </Box>
        <Box textAlign="center">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <TabButton tabName="pool">{t("common.poolName")}</TabButton>
            <TabButton tabName="overall">{t("common.overall")}</TabButton>
          </ButtonGroup>
          <Box display="flex" justifyContent="center">
            <Typography fontSize="14px" fontWeight={400} lineHeight="16.41px" pt="16px" width="400px">
              {tab === "pool"
                ? "The vote cast on the blockchain by Pool Name."
                : "Votes cast on the blockchain by Delegated Representatives (DReps), Stake Pool Operators (SPOs), and members of the Constitutional Committee."}
            </Typography>
          </Box>
        </Box>
        <GovernanceVotesDetail tab={tab} />
      </>
    );
  }

  return (
    <>
      <Grid container spacing={"20px"} pt="23px">
        {governanceVotesData.map((value, index) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={index}
            onClick={() => {
              setQuery({
                tab: query.tab,
                voteId: "1",
                page: 1,
                size: 50
              });
            }}
          >
            <CardGovernanceVotes data={value} />
          </Grid>
        ))}
      </Grid>

      <FooterTable
        pagination={{
          ...pageInfo,
          size: 3,
          total: 12 || 0
        }}
        total={{ count: 12 || 0, title: "" }}
        loading={false}
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

const GovernanceVotesDetail: React.FC<{ tab: string }> = ({ tab }) => {
  const theme = useTheme();
  const { t } = useTranslation();

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
            <Chip
              sx={{
                background: theme.palette.primary[100],
                border: `1px solid ${theme.palette.secondary[600]}`
              }}
              label="1231..2312"
              icon={<BlackCircleIcon />}
            />
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
          <InfoValue>{t("pool.treasury")}</InfoValue>
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
                <Chip
                  sx={{
                    background: theme.palette.primary[100],
                    border: `1px solid ${theme.palette.secondary[600]}`
                  }}
                  label="SPOs"
                />
                <Chip
                  sx={{
                    background: theme.palette.primary[100],
                    border: `1px solid ${theme.palette.secondary[600]}`
                  }}
                  label="x"
                />
              </Box>
            )}
          </InfoTitle>
          <InfoValue width={`${tab === "pool" ? "fit-content" : "100%"}`}>
            {tab === "pool" ? <VoteStatus status={"yes"} /> : <VoteRate />}
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
                <GovernanceStatus status={"enacted"} />
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
          <InfoValue sx={{ wordBreak: "break-word" }}>1,893,565.321 ADA</InfoValue>
        </Item>
        <Item item xs={6} md={3}>
          <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
          <InfoTitle paddingBottom="3px">
            <StyledTitle>{t("pool.submission")}</StyledTitle>
          </InfoTitle>
          <InfoValue>08/25/2024 13:39:41</InfoValue>
        </Item>
        <Item item xs={6} md={3}>
          <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
          <InfoTitle paddingBottom="3px">
            <StyledTitle>{t("pool.expiryDate")}</StyledTitle>
          </InfoTitle>
          <InfoValue>4th Feb 2024</InfoValue>
        </Item>
        <Item item xs={6} md={3}>
          <CustomIcon fill={theme.palette.secondary.light} height={25} icon={AnchorTextIcon} />
          <InfoTitle paddingBottom="3px">
            <StyledTitle>{t("pool.anchorText")}</StyledTitle>
          </InfoTitle>
          <InfoValue>Whatever the anchor text string is for this action</InfoValue>
        </Item>
      </StyledGrid>
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
}) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Typography fontSize="10px" fontWeight={400}>
      {percentage}%
    </Typography>
    <LightTooltip
      title={
        <Box height="39px" display="flex" alignItems="center" gap="8px">
          {icon}
          <Typography fontSize="12px" fontWeight={600}>
            3,443,875.343 ADA (94%)
          </Typography>
        </Box>
      }
      placement="right"
    >
      <Box sx={{ background: color }} height={`${percentage === 0 ? 0.5 : percentage}px`} width="36px" />
    </LightTooltip>
    <Typography fontSize="14px" fontWeight={400} pt="4px" textTransform="uppercase">
      {label}
    </Typography>
  </Box>
);

const VoteRate = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="end" justifyContent="space-between" width="100%">
      <VoteBar percentage={93} color={theme.palette.success[700]} icon={<VotesYesIcon />} label={t("common.yes")} />
      <VoteBar
        percentage={7}
        color={theme.palette.warning[700]}
        icon={<VotesAbstainIcon />}
        label={t("common.abstain")}
      />
      <VoteBar percentage={0} color={theme.palette.error[700]} icon={<VotesNoIcon />} label={t("common.no")} />
    </Box>
  );
};
