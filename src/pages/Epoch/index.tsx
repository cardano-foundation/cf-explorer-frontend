import { parse, stringify } from "qs";
import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../commons/hooks/useFetchList";
import { AIcon } from "../../commons/resources";
import { EPOCH_STATUS } from "../../commons/utils/constants";
import { formatADA } from "../../commons/utils/helper";
import { routers } from "../../commons/routers";

import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";

import { Blocks, StyledContainer, Output, Status, StyledColorBlueDard, Index } from "./styles";
import { setOnDetailView } from "../../stores/user";
import DetailViewEpoch from "../../components/commons/DetailView/DetailViewEpoch";
import { useWindowSize } from "react-use";

const columns: Column<IDataEpoch>[] = [
  {
    title: "#",
    key: "#",
    minWidth: "50px",
    render: r => <Index>{r.no}</Index>,
  },
  {
    title: "Status",
    key: "status",
    minWidth: "100px",
    render: r => <Status status={r.status.toLowerCase()}>{EPOCH_STATUS[r.status]}</Status>,
  },
  {
    title: "Blocks",
    key: "blkCount",
    minWidth: "100px",
    render: r => <Blocks>{r.blkCount}</Blocks>,
  },
  {
    title: "Output",
    key: "outSum",
    minWidth: "100px",
    render: r => (
      <Output>
        {formatADA(r.outSum)}
        <img src={AIcon} alt="ADA Icon" />
      </Output>
    ),
  },
  {
    title: "Start date",
    key: "startTime",
    minWidth: "100px",
    render: r => <StyledColorBlueDard>{r.startTime}</StyledColorBlueDard>,
  },
  {
    title: "End date",
    key: "endTime",
    minWidth: "100px",
    render: r => <StyledColorBlueDard>{r.endTime}</StyledColorBlueDard>,
  },
];

const Epoch: React.FC = () => {
  const [detailView, setDetailView] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const excuteScroll = () => ref.current?.scrollIntoView();

  const { data, total, currentPage, loading, initialized } = useFetchList<IDataEpoch>(`epoch/list`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  if (!data) return null;

  const openDetail = (_: any, r: IDataEpoch) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r.no);
    } else history.push(routers.EPOCH_DETAIL.replace(":epochId", `${r.no}`));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };
  const selected = data?.findIndex(item => item.no === detailView);
  return (
    <StyledContainer>
      <Card title={"Epochs"}>
        <Table
          loading={loading}
          initialized={initialized}
          columns={columns}
          data={data}
          onClickRow={openDetail}
          total={{ count: total, title: "Total Epochs" }}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
              excuteScroll();
            },
            page: currentPage || 0,
            total: total,
          }}
          selected={selected}
          selectedProps={{ style: { backgroundColor: "#ECECEC" } }}
        />
      </Card>
      {detailView && <DetailViewEpoch epochNo={detailView} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Epoch;
