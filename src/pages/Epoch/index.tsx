import { stringify } from "qs";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { AIcon } from "../../commons/resources";
import { EPOCH_STATUS } from "../../commons/utils/constants";
import {
  formatADA,
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  numberWithCommas,
} from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import { Blocks, StyledContainer, Output, Status, StyledColorBlueDard, Index } from "./styles";
import { setOnDetailView } from "../../stores/user";
import DetailViewEpoch from "../../components/commons/DetailView/DetailViewEpoch";
import { useWindowSize } from "react-use";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Box } from "@mui/material";
import { API } from "../../commons/utils/api";

const Epoch: React.FC = () => {
  const [epoch, setEpoch] = useState<IDataEpoch | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, pageInfo);

  const columns: Column<IDataEpoch>[] = [
    {
      title: "#",
      key: "#",
      minWidth: "50px",
      render: r => <Index>{numberWithCommas(r.no)}</Index>,
    },
    {
      title: "Status",
      key: "status",
      minWidth: "150px",
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
        <CustomTooltip title={formatADAFull(r.outSum)}>
          <Output>
            {formatADA(r.outSum)}
            <img src={AIcon} alt="ADA Icon" />
          </Output>
        </CustomTooltip>
      ),
    },
    {
      title: "Start date",
      key: "startTime",
      minWidth: "100px",
      render: r => <StyledColorBlueDard>{formatDateTimeLocal(r.startTime || "")}</StyledColorBlueDard>,
    },
    {
      title: "End date",
      key: "endTime",
      minWidth: "100px",
      render: r => (
        <StyledColorBlueDard>
          {formatDateTimeLocal(r.endTime || "")}
          {epoch?.no === r.no && (
            <Box position={"absolute"} right="10px" top={"50%"} style={{ transform: "translateY(-50%)" }}>
              <MdOutlineKeyboardArrowRight fontSize={30} />
            </Box>
          )}
        </StyledColorBlueDard>
      ),
    },
  ];

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Epochs List | Cardano Explorer`;
  }, []);

  const openDetail = (_: any, r: IDataEpoch, index: number) => {
    if (width > 1023) {
      setOnDetailView(true);
      setEpoch(r);
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
            handleCloseDetailView: handleClose,
          }}
          onClickRow={openDetail}
          selected={selected}
        />
      </Card>
      {epoch !== null && <DetailViewEpoch data={epoch} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Epoch;
