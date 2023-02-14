import { Box } from "@mui/material";
import { parse, stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { details } from "../../../commons/routers";
import {
  formatADAFull,
  formatDateTimeLocal,
  formatPercent,
  getShortWallet,
  numberWithCommas,
} from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { StyledLink } from "./styles";

const DelegationEpochList = ({
  data,
  loading,
  total,
  initialized,
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
    history.push({ search: stringify(query) });
  };
  const columns: Column<DelegationEpoch>[] = [
    {
      title: "Epoch",
      key: "epoch",
      minWidth: "120px",
      render: r => <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>,
    },
    {
      title: "Blocks",
      key: "block",
      minWidth: "120px",
      render: data => <StyledLink to={details.block(data.block)}>{numberWithCommas(data.block || 0)}</StyledLink>,
    },
    {
      title: "Stake Amount (A)",
      key: "stakeAmount",
      minWidth: "120px",

      render: data => (
        <CustomTooltip title={formatADAFull(data.stakeAmount)}>
          <Box component={"span"}>{formatADAFull(data.stakeAmount)}</Box>
        </CustomTooltip>
      ),
    },
    {
      title: "Delegator Rewards (A)",
      key: "delegatorReward",
      minWidth: "120px",
      render: data => (
        <CustomTooltip title={formatADAFull(data.delegators)}>
          <Box component={"span"}>{formatADAFull(data.delegators)}</Box>
        </CustomTooltip>
      ),
    },
    {
      title: "Fees (A)",
      key: "fees",
      minWidth: "120px",

      render: data => (
        <CustomTooltip title={formatADAFull(data.fee)}>
          <Box component={"span"}>{formatADAFull(data.fee)}</Box>
        </CustomTooltip>
      ),
    },
    {
      title: "ROS",
      key: "ros",
      minWidth: "120px",
      render: data => formatPercent(data.ros || 0),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data || []}
      onClickRow={(_, r) => history.push(details.epoch(r.epoch))}
      total={{ count: total, title: "Total Token List" }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ tab: query.tab, page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total,
      }}
    />
  );
};

const DelegationStakingDelegatorsList = ({
  data,
  initialized,
  loading,
  total,
  scrollEffect,
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
    history.push({ search: stringify(query) });
  };
  const columns: Column<StakingDelegators>[] = [
    {
      title: "No",
      key: "no",
      render: (r, idx) => idx + 1,
    },
    {
      title: "Delegator",
      key: "delegator",
      minWidth: "50px",
      render: data =>
        data.address && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomTooltip title={data.address || ""}>
              <StyledLink to={details.address(data.view)}>{getShortWallet(data.address || "")}</StyledLink>
            </CustomTooltip>
            <CopyButton text={data.address || ""} />
          </div>
        ),
    },
    {
      title: "Total Value (A)",
      key: "value",
      minWidth: "120px",
      render: data => (
        <CustomTooltip title={formatADAFull(data.totalStake)}>
          <Box component={"span"}>{formatADAFull(data.totalStake || 0)}</Box>
        </CustomTooltip>
      ),
    },
    {
      title: "Staked Time",
      key: "stakedTime",
      minWidth: "120px",
      render: data => formatDateTimeLocal(data.time || ""),
    },
    {
      title: "Fees (A)",
      key: "fees",
      minWidth: "120px",
      render: data => (
        <CustomTooltip title={formatADAFull(data.fee)}>
          <Box component={"span"}>{formatADAFull(data.fee || 0)}</Box>
        </CustomTooltip>
      ),
    },
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
        total: total,
      }}
      onClickRow={(e, r) => history.push(details.address(r.address))}
    />
  );
};

export { DelegationEpochList, DelegationStakingDelegatorsList };
