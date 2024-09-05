import React from "react";
import QueryString, { parse, stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, useTheme } from "@mui/material";

import {
  PoolDeresgistrationHistory,
  PoolDeresgistrationHistoryDark,
  PoolResgistrationHistory,
  PoolResgistrationHistoryDark,
  PoolUpdateHistory,
  PoolUpdateHistoryDark
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { DREP_ACTION_TYPE, POOL_ACTION_TYPE } from "src/commons/utils/constants";
import {
  formatADAFull,
  formatDateTimeLocal,
  getShortHash,
  numberWithCommas,
  removeDuplicate
} from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { StyledLink } from "./styles";

interface Query {
  tab: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined;
  page: number;
  size: number;
  voteId?: number | string;
  actionType?: string;
  actionStatus?: string;
  voteType?: string;
  voterType?: string;
  isRepeatVote?: boolean;
}

const DelegationEpochList = ({
  data,
  loading,
  total,
  initialized,
  error,
  statusError
}: {
  data: DelegationEpoch[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  error: string | null;
  statusError: number | undefined;
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
      title: <Box data-testid="delegationEpochList.epochTitle">{t("common.Epoch")}</Box>,
      key: "epoch",
      minWidth: "120px",
      render: (r) => (
        <StyledLink data-testid="delegationEpochList.epochValue" to={details.epoch(r.epoch)}>
          {r.epoch}
        </StyledLink>
      )
    },
    {
      title: <Box data-testid="delegationEpochList.blocksTitle">{t("blocks")}</Box>,
      key: "block",
      minWidth: "120px",
      render: (data) => <Box data-testid="delegationEpochList.blocksTitle">{numberWithCommas(data.block)}</Box>
    },
    {
      title: (
        <Box data-testid="delegationEpochList.stakeAmountTitle" component={"span"}>
          {t("stakeAmount")} (<ADAicon />)
        </Box>
      ),
      key: "stakeAmount",
      minWidth: "120px",

      render: (data) => (
        <Box data-testid="delegationEpochList.stakeAmountValue" component={"span"}>
          {formatADAFull(data.stakeAmount)}
        </Box>
      )
    },
    {
      title: (
        <Box data-testid="delegationEpochList.delegatorRewardsTitle" component={"span"}>
          {t("delegatorRewards")} (<ADAicon />)
        </Box>
      ),
      key: "delegatorReward",
      minWidth: "120px",
      render: (data) => (
        <Box data-testid="delegationEpochList.delegatorRewardsValue" component={"span"}>
          {typeof data.delegators === "number" ? formatADAFull(data.delegators) : t("common.N/A")}
        </Box>
      )
    },
    {
      title: (
        <Box data-testid="delegationEpochList.feesTitle" component={"span"}>
          {t("fees")} (<ADAicon />)
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (data) => (
        <Box data-testid="delegationEpochList.feesValue" component={"span"}>
          {typeof data.fee === "number" ? formatADAFull(data.fee) : t("common.N/A")}
        </Box>
      )
    }
  ];

  return (
    <Table
      data-testid="delegationEpochList.table"
      columns={columns}
      error={error}
      statusError={statusError}
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
  total,
  error,
  statusError
}: {
  data: StakingDelegators[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  error: string | null;
  statusError: number | undefined;
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
      title: <Box data-testid="stakingDelegators.noTitle">{t("no")}</Box>,
      key: "no",
      render: (r, idx) => <Box data-testid="stakingDelegators.noValue">{idx + 1}</Box>
    },
    {
      title: <Box data-testid="stakingDelegators.delegatorTitle">{t("delegator")}</Box>,
      key: "delegator",
      minWidth: "50px",
      render: (data) =>
        (data.view || data.stakeAddress) && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomTooltip title={data.view || data.stakeAddress || ""}>
              <StyledLink
                to={details.stake(data.view || data.stakeAddress)}
                data-testid="stakingDelegators.delegatorValue"
              >
                {getShortHash(data.view || data.stakeAddress || "")}
              </StyledLink>
            </CustomTooltip>
            <CopyButton text={data.view || data.stakeAddress || ""} />
          </div>
        )
    },
    {
      title: (
        <Box data-testid="stakingDelegators.totalValueTitle" component="span">
          {t("totalValue")} (<ADAicon />)
        </Box>
      ),
      key: "value",
      minWidth: "120px",
      render: (data) => (
        <Box data-testid="stakingDelegators.totalValue" component={"span"}>
          {data.totalStake != null ? formatADAFull(data.totalStake) : t("common.N/A")}
        </Box>
      )
    },
    {
      title: <Box data-testid="stakingDelegators.stakedTimeTitle">{t("stakedTime")}</Box>,
      key: "stakedTime",
      minWidth: "120px",
      render: (data) => (
        <DatetimeTypeTooltip data-testid="stakingDelegators.stakedTimeValue">
          {formatDateTimeLocal(data.time || data.createdAt || "")}
        </DatetimeTypeTooltip>
      )
    },
    {
      title: (
        <Box data-testid="stakingDelegators.feesTitle" component="span">
          {t("fees")} (<ADAicon />)
        </Box>
      ),
      key: "fees",
      minWidth: "120px",
      render: (data) => (
        <Box data-testid="stakingDelegators.feesValue" component={"span"}>
          {formatADAFull(data.fee)}
        </Box>
      )
    }
  ];

  return (
    <Table
      data-testid="stakingDelegators.table"
      columns={columns}
      data={data ? data : []}
      error={error}
      statusError={statusError}
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
        history.push(details.stake(r.view || r.stakeAddress));
      }}
    />
  );
};

const DelegationCertificatesHistory = ({
  data,
  initialized,
  loading,
  total,
  error,
  statusError
}: {
  data: CertificateHistory[] | null;
  loading: boolean;
  initialized: boolean;
  total: number;
  error: string | null;
  statusError: number | undefined;
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
        <CustomTooltip title={type === POOL_ACTION_TYPE.POOL_REGISTRATION ? "Pool Registration" : "Registration"}>
          {theme.isDark ? <PoolResgistrationHistoryDark /> : <PoolResgistrationHistory />}
        </CustomTooltip>
      );
    }
    if (type === POOL_ACTION_TYPE.POOL_UPDATE || type === DREP_ACTION_TYPE.UPDATE_DREP_CERT) {
      return (
        <CustomTooltip title={type === POOL_ACTION_TYPE.POOL_UPDATE ? "Pool Update" : "Delegation"}>
          {theme.isDark ? <PoolUpdateHistoryDark /> : <PoolUpdateHistory />}
        </CustomTooltip>
      );
    }
    if (type === POOL_ACTION_TYPE.POOL_DE_REGISTRATION || type === DREP_ACTION_TYPE.UNREG_DREP_CERT) {
      return (
        <CustomTooltip title={type === POOL_ACTION_TYPE.POOL_DE_REGISTRATION ? "Pool Deregistration" : "Retirement"}>
          {theme.isDark ? <PoolDeresgistrationHistoryDark /> : <PoolDeresgistrationHistory />}
        </CustomTooltip>
      );
    }
  };

  const columns: Column<CertificateHistory>[] = [
    {
      title: <Box data-testid="poolHistory.txHashTitle">{t("certificatesHistory.txHash")}</Box>,
      key: "txHash",
      minWidth: "180px",
      render: (data, idx) =>
        data.txHash && (
          <CustomTooltip title={data.txHash || ""}>
            <StyledLink
              data-testid={`poolHistory.txHashValue#${idx}`}
              to={details.transaction(data.txHash, "poolCertificates")}
            >
              {getShortHash(data.txHash || "")}
            </StyledLink>
          </CustomTooltip>
        )
    },
    {
      title: <Box data-testid="poolHistory.createdAtTitle">{t("common.createdAt")}</Box>,
      key: "createdAt",
      minWidth: "180px",
      render: (data, idx) => (
        <DatetimeTypeTooltip data-testid={`poolHistory.createdAtValue#${idx}`}>
          {formatDateTimeLocal(data.createdAt || "")}
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <Box data-testid="poolHistory.blockTitle">{t("certificatesHistory.block")}</Box>,
      key: "block",
      minWidth: "100px",
      render: (data, idx) => (
        <StyledLink data-testid={`poolHistory.blockValue#${idx}`} to={details.block(data.blockNo)}>
          {data.blockNo}
        </StyledLink>
      )
    },
    {
      title: <Box data-testid="poolHistory.epochTitle">{t("epoch")}</Box>,
      key: "value",
      minWidth: "80px",
      render: (data, idx) => (
        <StyledLink data-testid={`poolHistory.epochValue#${idx}`} to={details.epoch(data.epochNo)}>
          {data.epochNo}
        </StyledLink>
      )
    },
    {
      title: <Box data-testid="poolHistory.slotTitle">{t("common.slot")}</Box>,
      key: "slot",
      minWidth: "90px",
      render: (data, idx) => <Box data-testid={`poolHistory.slotValue#${idx}`}>{data.epochSlotNo || data.slotNo}</Box>
    },
    {
      title: <Box data-testid="poolHistory.absoluteSlotTitle">{t("certificatesHistory.absoluteSlot")}</Box>,
      key: "absoluteSlot",
      minWidth: "130px",
      render: (data, idx) => {
        return <Box data-testid={`poolHistory.absoluteSlotTitle#${idx}`}>{data.absoluteSlot || data.slotNo}</Box>;
      }
    },
    {
      title: <Box data-testid="poolHistory.actionTitle">{t("common.action")}</Box>,
      key: "fees",
      minWidth: "210px",
      render: (data, idx) => {
        return (
          <Box data-testid={`poolHistory.actionValue#${idx}`} display={"flex"} gap={2}>
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
      data-testid="poolHistory.table"
      columns={columns}
      error={error}
      statusError={statusError}
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

export { DelegationCertificatesHistory, DelegationEpochList, DelegationStakingDelegatorsList };
