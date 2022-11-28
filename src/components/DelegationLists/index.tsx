import { Link, useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";

import Table, { Column } from "../commons/Table";

import styles from "./index.module.scss";
import { formatADA } from "../../commons/utils/helper";

import sendImg from "../../commons/resources/images//summary-up.png";
import { Progress } from "antd";
import { routers } from "../../commons/routers";

interface DelegationListProps {
  data: Delegators[];
  total: number;
  loading: boolean;
  initialized: boolean;
}

const DelegationLists: React.FC<DelegationListProps> = ({ data, total, loading, initialized }) => {
  const { search } = useLocation();
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const query = parse(search.split("?")[1]);

  const columns: Column<Delegators & { adaFake: number; feeFake: number }>[] = [
    {
      title: "Pool",
      key: "Pool",
      minWidth: "40px",
      render: r => {
        return (
          <Link
            to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`).replace(":tab", `epoch`)}
            className={`${styles.fwBlod} ${styles.link}`}
          >
            {r.poolName}
          </Link>
        );
      },
    },
    {
      title: "Pool size (A)",
      key: "PoolsizeA",
      minWidth: "120px",
      // To do
      // render: r => <div>{r.poolSize}</div>,
      render: r => <div>{r.adaFake}m</div>,
    },
    {
      title: "Reward",
      key: "Reward",
      minWidth: "120px",
      // To do
      // render: r => <div>{r.reward}</div>,
      render: r => (
        <div>
          <img src={sendImg} alt="reward icon" />{" "}
          <span className={styles.value}>+{Math.round((Math.random() * 4 + 2) * 100) / 100}%</span>
        </div>
      ),
    },
    {
      title: "Fee (A) ",
      key: "fee",
      minWidth: "120px",
      // To do
      // render: r => (
      //   <div>
      //     {r.feePercent}-{r.feeAmount}{" "}
      //   </div>
      // ),
      render: r => (
        <div>
          {r.feeFake}% ({formatADA((r.adaFake * 100000000 * r.feeFake) / 100)} A)
        </div>
      ),
    },
    {
      title: "Declared Pledge (A)",
      key: "Declared",
      minWidth: "120px",
      render: r => <div>{formatADA(r.pledge)} </div>,
    },
    {
      title: "Saturation",
      minWidth: "200px",
      key: "Saturation",
      // To do
      // render: r => <div>{r.saturation} </div>,
      render: r => (
        <div>
          <Progress
            strokeColor={{
              "0%": "#184C78",
              "100%": "#5A9C56",
            }}
            strokeWidth={8}
            percent={Math.round(Math.random() * 100)}
            status="active"
          />
        </div>
      ),
    },
    {
      title: "",
      minWidth: "120px",
      key: "Saturation",
      render: r => (
        <Link to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`)} className={styles.button}>
          Detail
        </Link>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      // To do
      data={data.map(item => {
        return {
          ...item,
          adaFake: Math.round(Math.random() * 10000) / 100,
          feeFake: Math.round((Math.random() + 2) * 100) / 100,
        };
      })}
      total={{ count: total, title: "Total Transactions" }}
      loading={loading}
      initialized={initialized}
      pagination={{
        current: query.page ? +query.page : 1,
        total: total,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        size: "small",
        pageSizeOptions: [10, 20, 50],
        onChange(page, pageSize) {
          setQuery({ searchPools: query.searchPools ? (query.searchPools as string) : "", page, size: pageSize });
        },
      }}
    />
  );
};

export default DelegationLists;
