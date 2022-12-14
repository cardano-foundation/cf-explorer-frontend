import { Tooltip } from "@mui/material";
import { parse, stringify } from "qs";
import { Link, useHistory, useLocation } from "react-router-dom";

import { routers } from "../../commons/routers";
import { formatADA, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import Table, { Column } from "../commons/Table";
import styles from "./index.module.scss";

const DelegationEpochList = ({
  data,
  loading,
  total,
  initialized,
  scrollEffect,
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
      render: r => (
        <Link className={`${styles.col} ${styles.link}`} to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epoch}`)}>
          {r.epoch}
        </Link>
      ),
    },
    {
      title: "Blocks",
      key: "block",
      minWidth: "120px",
      render: data => (
        <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${data.block}`)} className={`${styles.col} ${styles.link}`}>
          {numberWithCommas(data.block || 0)}
        </Link>
      ),
    },
    {
      title: "Stake Amount(A)",
      key: "stakeAmount",
      minWidth: "120px",
      render: data => <div className={styles.col}> {formatADA(data.stakeAmount)}</div>,
    },
    {
      title: "Delegator Reward(A)",
      key: "delegatorReward",
      minWidth: "120px",
      render: data => <div className={styles.col}>{formatADA(data.delegatorReward)}</div>,
    },
    {
      title: "Fees(A)",
      key: "fees",
      minWidth: "120px",
      render: data => <div className={styles.col}>{formatADA(data.fees)}</div>,
    },
    {
      title: "ROS",
      key: "ros",
      minWidth: "120px",
      render: data => <div className={styles.col}>{data.ros ? `${data.ros}%` : ""}</div>,
    },
  ];

  return (
    <Table
      columns={columns}
      data={data || []}
      onClickRow={(_, r) => history.push(routers.EPOCH_DETAIL.replace(":epochId", `${r.epoch}`))}
      total={{ count: total, title: "Total" }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ page, size });
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
      render: (r, idx) => <div className={styles.col}> {idx + 1}</div>,
    },
    {
      title: "Delegator",
      key: "delegator",
      minWidth: "50px",
      render: data =>
        data.address && (
          <Tooltip placement="bottom" title={data.address || ""}>
            <Link to={"#"} className={`${styles.col} ${styles.link}`}>
              {getShortWallet(data.address || "")}
            </Link>
          </Tooltip>
        ),
    },
    {
      title: "Total Value(A)",
      key: "value",
      minWidth: "120px",
      render: data => <div className={styles.col}> {formatADA(data.totalStake || 0)}</div>,
    },
    {
      title: "Staked Time",
      key: "stakedTime",
      minWidth: "120px",
      render: data => <div className={styles.col}>{data.time}</div>,
    },
    {
      title: "Fees(A)",
      key: "fees",
      minWidth: "120px",
      render: data => <div className={styles.col}>{formatADA(data.fee || 0)}</div>,
    },
  ];

  return (
    <Table
      columns={columns}
      data={data ? data : []}
      total={{ count: total, title: "Total" }}
      loading={loading}
      initialized={initialized}
      pagination={{
        onChange: (page, size) => {
          setQuery({ page, size });
        },
        page: query.page ? +query.page - 1 : 0,
        total: total,
      }}
    />
  );
};

export { DelegationEpochList, DelegationStakingDelegatorsList };
