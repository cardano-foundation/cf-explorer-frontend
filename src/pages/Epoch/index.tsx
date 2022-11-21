import { parse, stringify } from "qs";
import { useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import AIcon from "../../commons/resources/images/AIcon.png";
import { routers } from "../../commons/routers";
import { checkStatus } from "../../commons/utils/helper";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import styles from "./index.module.scss";

const styleFont700 = {
  fontSize: "17px",
  fontWeight: 700,
  color: "#273253",
  display: "block",
  cursor: "pointer",
};

const styleFont400 = {
  fontSize: "17px",
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
        <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.no}`)}>
          <span style={checkStatus(r.status)}>{r.status}</span>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img style={{ marginRight: "8px" }} src={AIcon} alt="a icon" />
          <span style={styleFont700}>{r.blkCount}</span>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img style={{ marginRight: "8px" }} src={AIcon} alt="a icon" />
          <span style={styleFont700}>{r.outSum}</span>
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
