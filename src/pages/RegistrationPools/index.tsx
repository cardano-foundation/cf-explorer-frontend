import { Tooltip } from "antd";
import moment from "moment";
import { parse, stringify } from "qs";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { routers } from "../../commons/routers";
import { formatADA, getShortHash, getShortWallet } from "../../commons/utils/helper";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import styles from "./index.module.scss";

const RegistrationPools = () => {
  const history = useHistory();
  const { search } = useLocation();
  const [selectedPool, setSelectedPool] = useState<"registration" | "deregistration">("registration");
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data, total, loading, initialized } = useFetchList<Registration>(
    `/delegation/${selectedPool === "registration" ? "pool-registration" : "pool-de-registration"}?page=${
      query.page || 1
    }&size=${query.size || 10}`
  );

  const columns: Column<Registration>[] = [
    {
      title: "Trx Hash",
      key: "trxHash",
      render: r => {
        return (
          <>
            <Tooltip title={r.txHash} placement="bottom">
              <Link to={"#"} className={styles.link}>
                {getShortHash(r.txHash || "")}
              </Link>
            </Tooltip>
            <div>{moment(r.txTime).format("MM/DD/YYYY HH:mm:ss")}</div>
          </>
        );
      },
    },
    {
      title: "Block",
      key: "block",
      render: r => (
        <>
          <Link className={styles.link} to={routers.BLOCK_DETAIL.replace(":blockId", `${r.block}`)}>
            {r.block}
          </Link>
          <div>
            <Link className={styles.link} to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epoch}`)}>
              {r.epoch}
            </Link>
            /{r.slotNo}
          </div>
        </>
      ),
    },
    {
      title: "Pool",
      key: "pool",
      render: r => (
        <Link to={"#"} className={styles.link}>
          {r.poolName}
        </Link>
      ),
    },
    {
      title: "Pledge(A)",
      key: "pledge",
      render: r => <div className={styles.text}>{formatADA(r.pledge)}</div>,
    },
    {
      title: "Cost(A)",
      key: "cost",
      render: r => <div className={styles.text}>{formatADA(r.cost)}</div>,
    },
    {
      title: "Margin",
      key: "margin",
      render: r => <div className={styles.text}>{r.margin ? `${r.margin}%` : ""}</div>,
    },
    {
      title: "Stake Key",
      key: "stakeKey",
      render: r => (
        <Tooltip title={r.stakeKey} placement="bottom">
          <Link className={styles.link} to={"#"}>
            {r.stakeKey ? getShortWallet(r.stakeKey) : ""}
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.header}>
          <button
            className={`${styles.btn} ${styles.left} ${selectedPool === "registration" ? styles.active : ""}`}
            onClick={() => {
              setQuery({ page: 1, size: 10 });
              setSelectedPool("registration");
            }}
          >
            Registration
          </button>
          <button
            className={`${styles.btn}  ${selectedPool === "deregistration" ? styles.active : ""}`}
            onClick={() => {
              setQuery({ page: 1, size: 10 });
              setSelectedPool("deregistration");
            }}
          >
            Deregistration
          </button>
        </div>
        <Table
          columns={columns}
          data={data || []}
          loading={loading}
          initialized={initialized}
          total={{ title: "Total Transactions", count: total }}
          pagination={{
            current: query.page ? +query.page : 1,
            total: total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            size: "small",
            pageSizeOptions: [10, 20, 50],
            onChange(page, pageSize) {
              setQuery({ page, size: pageSize });
            },
          }}
        />
      </Card>
    </div>
  );
};

export default RegistrationPools;
