import { Progress } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { DownRedIcon, UpGreenIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatPrice } from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";
import styles from "./index.module.scss";

interface Props {}

const ABBREVIATIONS = ["", "k", "m", "b", "t", "q", "Q", "s", "S"];

const TopDelegationPools: React.FC<Props> = () => {
  const { data, loading, initialized } = useFetchList<DelegationPool>(`delegation/pool-list?search=`, {
    page: 1,
    size: 4,
  });
  const history = useHistory();
  data.forEach(item => {
    if (!item.poolSize) {
      item.poolSize = Math.floor(Math.random() * 10 ** 13);
      item.feePercent = Number((Math.floor(Math.random() * 2 * 10) / 10).toFixed(1)) + 1;
      item.feeAmount = (item.poolSize * item.feePercent) / 100;
      item.reward = Math.floor((Math.random() * 20 * 100) / 100) + 10;
      item.saturation = Math.floor(Math.random() * 60) + 30;
    }
  });
  const columns: Column<DelegationPool>[] = [
    {
      title: "Pool",
      key: "name",
      render: r => (
        <Link to={`/delegation-pool/${r.poolId}`} className={styles.poolName}>
          <span>{r.poolName}</span>
        </Link>
      ),
    },
    {
      title: "Pool size (A)",
      key: "size",
      render: r => <span>{formatPrice(r.poolSize / 10 ** 6, ABBREVIATIONS)}</span>,
    },
    {
      title: "Reward",
      key: "reward",
      render: r => (
        <span className={styles.priceRate}>
          <img src={r.reward > 0 ? UpGreenIcon : DownRedIcon} alt="price rate" />
          <span className={r.reward > 0 ? styles.priceUp : styles.priceDown}>
            {r.reward > 0 ? "+" : ""}
            {r.reward?.toString().replace(".", ",") || 0} %
          </span>
        </span>
      ),
    },
    {
      title: "Fee (A)",
      key: "fee",
      render: r => (
        <span>
          {r.feePercent}% ({formatPrice(r.feeAmount / 10 ** 6, ABBREVIATIONS)} A)
        </span>
      ),
    },
    {
      title: "Declared Pledge (A)",
      key: "declaredPledge",
      render: r => <span>{formatPrice(r.pledge / 10 ** 6, ABBREVIATIONS)}</span>,
    },
    {
      title: "Saturation",
      key: "output",
      render: r => (
        <div className={styles.progress}>
          <span>{r.saturation || 80}%</span>
          <Progress
            className={styles.progressBar}
            gapPosition="top"
            percent={r.saturation || 80}
            status="active"
            strokeColor={"var(--linear-gradient-green)"}
            trailColor={"var(--border-color)"}
            width={150}
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: r => (
        <Link to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`)} className={styles.actionDetail}>
          <small>Detail</small>
        </Link>
      ),
    },
  ];
  return (
    <div className={styles.topDelegation}>
      <div className={styles.title}>
        <h3>Top Delegation Pools</h3>
        <Link to={routers.DELEGATION_POOLS} className={styles.seemoreDesktop}>
          <small>See All</small>
        </Link>
      </div>
      <Table
        className={styles.table}
        loading={loading}
        initialized={initialized}
        columns={columns}
        data={data}
        onClickRow={(_, r: DelegationPool) =>
          history.push(routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`))
        }
      />
      <Link to={routers.DELEGATION_POOLS} className={styles.seemoreMobile}>
        <small>See All</small>
      </Link>
    </div>
  );
};

export default TopDelegationPools;
