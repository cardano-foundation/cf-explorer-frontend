import { stringify } from "qs";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import useFetchList from "../../commons/hooks/useFetchList";
import { AIcon } from "../../commons/resources";
import { EPOCH_STATUS } from "../../commons/utils/constants";
import { formatADA, getPageInfo } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
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
    render: r => <StyledColorBlueDard>{moment(r.startTime).format("MM/DD/YYYY HH:mm:ss")}</StyledColorBlueDard>,
  },
  {
    title: "End date",
    key: "endTime",
    minWidth: "100px",
    render: r => <StyledColorBlueDard>{moment(r.endTime).format("MM/DD/YYYY HH:mm:ss")}</StyledColorBlueDard>,
  },
];

const Epoch: React.FC = () => {
  const [epoch, setEpoch] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<IDataEpoch>(`epoch/list`, pageInfo);

  const openDetail = (_: any, r: IDataEpoch, index: number) => {
    if (width > 1023) {
      setOnDetailView(true);
      setEpoch(r.no);
      setSelected(index);
    } else history.push(details.epoch(r.no));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setEpoch(null);
    setSelected(null);
  };
  return (
    <StyledContainer>
      <Card title={"Epochs"}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Epochs", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
          onClickRow={openDetail}
          selected={selected}
        />
      </Card>
      {epoch && <DetailViewEpoch epochNo={epoch} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Epoch;
