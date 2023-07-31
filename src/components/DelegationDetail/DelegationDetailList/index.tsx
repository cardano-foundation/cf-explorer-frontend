import { Box } from "@mui/material";
import { parse, stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";

import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";

import { StyledLink } from "./styles";

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
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) });
  };
  const columns: Column<DelegationEpoch>[] = [
    {
      title: "Epoch",
      key: "epoch",
      minWidth: "120px",
      render: (r) => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>
    },
    {
      title: "Blocks",
      key: "block",
      minWidth: "120px",
      render: (data) => numberWithCommas(data.block)
    },
    {
      title: "Stake Amount (A)",
      key: "stakeAmount",
      minWidth: "120px",

      render: (data) => <Box component={"span"}>{formatADAFull(data.stakeAmount)}</Box>
    },
    {
      title: "Delegator Rewards (A)",
      key: "delegatorReward",
      minWidth: "120px",
      render: (data) => <Box component={"span"}>{formatADAFull(data.delegators)}</Box>
    },
    {
      title: "Fees (A)",
      key: "fees",
      minWidth: "120px",

      render: (data) => <Box component={"span"}>{formatADAFull(data.fee)}</Box>
    }
  ];

  return (
    <Table
      columns={columns}
      data={data || []}
      total={{ count: total, title: "Total Token List" }}
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
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory();
  const setQuery = (query: any) => {
    history.replace({ search: stringify(query) });
  };
  const columns: Column<StakingDelegators>[] = [
    {
      title: "No",
      key: "no",
      render: (r, idx) => idx + 1
    },
    {
      title: "Delegator",
      key: "delegator",
      minWidth: "50px",
      render: (data) =>
        data.view && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomTooltip title={data.view || ""}>
              <StyledLink to={details.stake(data.view)}>{getShortWallet(data.view || "")}</StyledLink>
            </CustomTooltip>
            <CopyButton text={data.view || ""} />
          </div>
        )
    },
    {
      title: "Total Value (A)",
      key: "value",
      minWidth: "120px",
      render: (data) => <Box component={"span"}>{formatADAFull(data.totalStake)}</Box>
    },
    {
      title: "Staked Time",
      key: "stakedTime",
      minWidth: "120px",
      render: (data) => formatDateTimeLocal(data.time || "")
    },
    {
      title: "Fees (A)",
      key: "fees",
      minWidth: "120px",
      render: (data) => <Box component={"span"}>{formatADAFull(data.fee)}</Box>
    }
  ];

  return (
    <Table
      columns={columns}
      data={data ? data : []}
      total={{ count: total, title: "Total Token List" }}
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

export { DelegationEpochList, DelegationStakingDelegatorsList };
