import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, Typography, useTheme } from "@mui/material";
import QueryString, { parse, stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { POOL_ACTION_TYPE } from "src/commons/utils/constants";
import { details } from "src/commons/routers";
import {
  PoolResgistrationHistory,
  PoolDeresgistrationHistory,
  PoolUpdateHistory,
  PoolResgistrationHistoryDark,
  PoolUpdateHistoryDark,
  PoolDeresgistrationHistoryDark,
  ArrowLeftWhiteIcon
} from "src/commons/resources";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  numberWithCommas,
  removeDuplicate
} from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column, FooterTable } from "src/components/commons/Table";
import ADAicon from "src/components/commons/ADAIcon";
import CardGovernanceVotes from "src/components/commons/CardGovernanceVotes";

import { StyledLink, Tab } from "./styles";

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
  voteId?: number | string;
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

  const [tab, setTab] = useState<string>("pool");

  const setQuery = (query: Query) => {
    history.replace({ search: stringify(query) }, history.location.state);
  };

  return (
    <>
      {query.voteId ? (
        <>
          <Box display="flex" alignItems="center">
            <Button variant="text" onClick={() => setQuery({ tab: "governanceVotes", page: 1, size: 50 })}>
              <ArrowLeftWhiteIcon />
            </Button>
            <Typography m="auto" fontSize="32px" fontWeight={600} lineHeight="28px">
              Governance Action Voting Name
            </Typography>
          </Box>
          <Box textAlign="center">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Tab sx={{ background: tab ? theme.palette.primary[200] : "" }} onClick={() => setTab("")}>
                Pool Name
              </Tab>
              <Tab sx={{ background: !tab ? theme.palette.primary[200] : "" }} onClick={() => setTab("")}>
                Overall Vote
              </Tab>
            </ButtonGroup>
          </Box>
        </>
      ) : (
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
      )}
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
  DelegationEpochList,
  DelegationStakingDelegatorsList,
  DelegationCertificatesHistory,
  DelegationGovernanceVotes
};
