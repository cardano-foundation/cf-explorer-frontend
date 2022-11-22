import { parse, stringify } from "qs";
import { useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import AIcon from "../../commons/resources/images/AIcon.png";
import { routers } from "../../commons/routers";
import { EPOCH_STATUS } from "../../commons/utils/constants";
import { formatADA } from "../../commons/utils/helper";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import styles from "./index.module.scss";

export const checkStatus = (status: string) => {
  switch (status) {
    case EPOCH_STATUS.FINISH:
      return styles.finished;
    case EPOCH_STATUS.REWARD:
      return styles.reward;
    case EPOCH_STATUS.INPROGRESS:
      return styles.inprogress;
    default:
      return styles.finished;
  }
};
const styleFont400 = {
  fontSize: "16px",
  fontWeight: 400,
  color: "#273253",
  display: "block",
  cursor: "pointer",
};

const columns: Column<IDataEpoch>[] = [
  {
    title: "#",
    key: "#",
    minWidth: "100px",
    render: r => {
      return (
        <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.no}`)}>
          <span style={styleFont400}>{r.no}</span>
        </Link>
      );
    },
  },
  {
    title: "Status",
    key: "status",
    minWidth: "100px",
    render: r => {
      return (
        <Link to={`/epoch/${r.no}`} className={styles.link}>
          <span className={checkStatus(r.status)}>{r.status}</span>
        </Link>
      );
    },
  },
  {
    title: "Start date",
    key: "startTime",
    minWidth: "100px",
    render: r => {
      return <span style={styleFont400}>{r.startTime}</span>;
    },
  },
  {
    title: "End date",
    key: "endTime",
    minWidth: "100px",
    render: r => {
      return <span style={styleFont400}>{r.endTime}</span>;
    },
  },
  {
    title: "Blocks",
    key: "blkCount",
    minWidth: "100px",
    render: r => {
      return (
        <div className={styles.blockRow}>
          <span>{r.blkCount}</span>
        </div>
      );
    },
  },
  {
    title: "Output",
    key: "outSum",
    minWidth: "100px",
    render: r => {
      return (
        <div className={styles.blockRow}>
          <img src={AIcon} alt="a icon" />
          <span>{formatADA(r.outSum)}</span>
        </div>
      );
    },
  },
];

const Epoch: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const query = parse(search.split("?")[1]);
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const { data, total, currentPage, loading } = useFetchList<IEpoch>(`epoch/list`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });
  if (!data) return null;
  const excuteScroll = () => ref.current?.scrollIntoView();

  return (
    <div className={styles.container} ref={ref}>
      <Card title={"Epoch"}>
        <Table
          className={styles.table}
          loading={loading}
          columns={columns}
          data={data}
          total={{ count: total, title: "Total Transactions" }}
          pagination={{
            current: currentPage + 1 || 1,
            total: total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            size: "small",
            pageSizeOptions: [10, 20, 50],
            onChange(page, pageSize) {
              setQuery({ page, size: pageSize });
              excuteScroll();
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Epoch;
