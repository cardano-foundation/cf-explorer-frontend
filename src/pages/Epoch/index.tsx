import { useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import styles from "./index.module.scss";

interface IDataEpoch {
  no: number;
  status: string;
  blkCount: number;
  endTime: string;
  startTime: string;
  outSum: number;
  txCount: number;
}

interface IEpoch {
  data: IDataEpoch[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

const columns: Column<IDataEpoch>[] = [
  {
    title: "#",
    key: "#",
    minWidth: "100px",
    render: (r) => {
      return <span className={styles.fwBlod}>{r.no}</span>;
    },
  },
  {
    title: "Status",
    key: "status",
    minWidth: "100px",
    render: (r) => {
      return <span className={styles.fwBlod}>{r.status}</span>;
    },
  },
  {
    title: "Start date",
    key: "startTime",
    minWidth: "100px",
    render: (r) => {
      return <span className={styles.fwBlod}>{r.startTime}</span>;
    },
  },
  {
    title: "End date",
    key: "endTime",
    minWidth: "100px",
    render: (r) => {
      return <span className={styles.fwBlod}>{r.endTime}</span>;
    },
  },
  {
    title: "Blocks",
    key: "blkCount",
    minWidth: "100px",
    render: (r) => {
      return <span className={styles.fwBlod}>{r.blkCount}</span>;
    },
  },
  {
    title: "Output",
    key: "outSum",
    minWidth: "100px",
    render: (r) => {
      return <span className={styles.fwBlod}>{r.outSum}</span>;
    },
  },
];

const Epoch = () => {
  const [limit] = useState(10);
  const { search } = useLocation();
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const page = useMemo(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    return Number(page);
  }, [search]);

  const { data, error, loading, refesh } = useFetch<IEpoch>(
    `epoch/list?page=${page}&size=${limit}`
  );
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (!data?.data) return null;

  const excuteScroll = () => ref.current?.scrollIntoView();

  return (
    <div className={styles.container} id="epoch" ref={ref}>
      <Card title={"Epoch"}>
        <Table
          className={styles.table}
          columns={columns}
          data={data?.data}
          pagination={{
            defaultCurrent: page,
            total: data.totalItems,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            size: "small",
            pageSizeOptions: [10, 20, 50],
            pageSize: limit,
            onChange(page, pageSize) {
              history.push(`?page=${page}`);
              excuteScroll()
              refesh();
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Epoch;
