import { Progress, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { Link } from "react-router-dom";
import { DownRedIcon, UpGreenIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatPrice } from "../../../commons/utils/helper";
import styles from "./index.module.scss";

interface Props {}

const ABBREVIATIONS = ["", "k", "m", "b", "t", "q", "Q", "s", "S"];

const data: DelegationPool[] = [
  {
    id: "1",
    name: "[NORTH] #2 Nordic Pool",
    size: 63.41 * 10 ** 6,
    reward: 16.24,
    fee: 2.5,
    feeA: 500,
    declaredPledge: 1 * 10 ** 6,
    saturation: 80,
  },
  {
    id: "2",
    name: "[NORTH] #2 Nordic Pool",
    size: 63.41 * 10 ** 6,
    reward: -10.24,
    fee: 2.5,
    feeA: 500,
    declaredPledge: 1 * 10 ** 6,
    saturation: 80,
  },
  {
    id: "3",
    name: "[NORTH] #2 Nordic Pool",
    size: 63.41 * 10 ** 6,
    reward: 16.24,
    fee: 2.5,
    feeA: 500,
    declaredPledge: 1 * 10 ** 6,
    saturation: 80,
  },
];
const TopDelegationPools: React.FC<Props> = () => {
  const columns: ColumnType<DelegationPool>[] = [
    {
      title: "Pool",
      key: "name",
      render: r => (
        <Link to={`/delegation-pool/${r.id}`} className={styles.poolName}>
          <span>{r.name}</span>
        </Link>
      ),
    },
    {
      title: "Pool size (A)",
      key: "size",
      render: r => <span>{formatPrice(r.size, ABBREVIATIONS)}</span>,
    },
    {
      title: "Reward",
      key: "reward",
      render: r => (
        <span className={styles.priceRate}>
          <img src={r.reward > 0 ? UpGreenIcon : DownRedIcon} alt="price rate" />
          <span className={r.reward > 0 ? styles.priceUp : styles.priceDown}>
            {r.reward > 0 ? "+" : ""}
            {r.reward.toString().replace(".", ",")} %
          </span>
        </span>
      ),
    },
    {
      title: "Fee (A)",
      key: "fee",
      render: r => (
        <span>
          {r.fee}% ({r.feeA} A)
        </span>
      ),
    },
    {
      title: "Declared Pledge (A)",
      key: "declaredPledge",
      render: r => <span>{formatPrice(r.declaredPledge, ABBREVIATIONS)}</span>,
    },
    {
      title: "Saturation",
      key: "output",
      render: r => (
        <div className={styles.progress}>
          <span>{r.saturation}%</span>
          <Progress
            className={styles.progressBar}
            gapPosition="top"
            percent={r.saturation}
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
        <Link to={routers.POOL_LIST.replace(":poolId", `${r.blockNo}`)} className={styles.actionDetail}>
          <small>Detail</small>
        </Link>
      ),
    },
  ];
  return (
    <div className={styles.topDelegation}>
      <h3>Top Delegation Pools</h3>
      <Table className={styles.table} columns={columns} pagination={false} dataSource={data} />
    </div>
  );
};

export default TopDelegationPools;
