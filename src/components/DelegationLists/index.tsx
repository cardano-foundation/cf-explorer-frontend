import { Link, useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";

import Table, { Column } from "../commons/Table";

import styles from "./index.module.scss";
import { formatADA } from "../../commons/utils/helper";

import sendImg from "../../commons/resources/images//summary-up.png";
import receiveImg from "../../commons/resources/images/summary-down.png";
import { Progress } from "antd";

interface DelegationListProps {
  data: Delegators[];
  total: number;
  loading: boolean;
}

const DelegationLists: React.FC<DelegationListProps> = ({ data, total, loading }) => {
  const { search } = useLocation();
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const query = parse(search.split("?")[1]);

  const columns: Column<Delegators>[] = [
    {
      title: "Pool",
      key: "Pool",
      minWidth: "40px",
      render: r => {
        return (
          <Link to={"#"} className={`${styles.fwBlod} ${styles.link}`}>
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
      render: r => <div>63.41m</div>,
    },
    {
      title: "Reward",
      key: "Reward",
      minWidth: "120px",
      // To do
      // render: r => <div>{r.reward}</div>,
      render: r => (
        <div>
          <img src={sendImg} alt="reward icon" /> <span className={styles.value}>+16,25%</span>
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
      render: r => <div>2.5% (500 A)</div>,
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
            percent={80}
            status='active'
          />
        </div>
      ),
    },
    {
      title: "",
      minWidth: "120px",
      key: "Saturation",
      render: r => <button className={styles.button}>Detail</button>,
    },
  ];
  return (
    <Table
      columns={columns}
      data={data}
      total={{ count: total, title: "Total Transactions" }}
      loading={loading}
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
