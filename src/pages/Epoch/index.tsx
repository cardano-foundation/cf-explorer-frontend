import { stringify } from "qs";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { AIcon } from "../../commons/resources";
import { EPOCH_STATUS } from "../../commons/utils/constants";
import { formatADAFull, formatDateTimeLocal, getPageInfo, numberWithCommas } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import { Blocks, StyledContainer, Output, Status, StyledColorBlueDard, Index } from "./styles";
import { setOnDetailView } from "../../stores/user";
import DetailViewEpoch from "../../components/commons/DetailView/DetailViewEpoch";
import { useWindowSize } from "react-use";
import { useTheme } from "@mui/material";
import { API } from "../../commons/utils/api";
import SelectedIcon from "../../components/commons/SelectedIcon";
import Link from "../../components/commons/Link";
import ADAicon from "../../components/commons/ADAIcon";

const Epoch: React.FC = () => {
  const [epoch, setEpoch] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo, sort });

  const columns: Column<IDataEpoch>[] = [
    {
      title: "Epoch Number",
      key: "epochNumber",
      minWidth: "50px",
      render: r => <Link to={details.epoch(r.no || 0)}>{numberWithCommas(r.no)}</Link>,
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
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Transaction Count",
      key: "transactionCount",
      minWidth: "100px",
      render: r => <Blocks>{r.txCount}</Blocks>,
    },
    {
      title: "Rewards Distributed",
      key: "rDistributed",
      minWidth: "100px",
      render: r => (
        <>
          {r.rewardsDistributed ? (
            <Output>
              {formatADAFull(r.rewardsDistributed)}
              <ADAicon />
            </Output>
          ) : (
            "Not available"
          )}
        </>
      ),
    },
    {
      title: "Total Output",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <Output>
          {formatADAFull(r.outSum)}
          <ADAicon />
        </Output>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Start Timestamp",
      key: "startTime",
      minWidth: "100px",
      render: r => <StyledColorBlueDard>{formatDateTimeLocal(r.startTime || "")}</StyledColorBlueDard>,
    },
    {
      title: "End Timestamp",
      key: "endTime",
      minWidth: "100px",
      render: r => (
        <StyledColorBlueDard>
          {formatDateTimeLocal(r.endTime || "")}
          {epoch === r.no && <SelectedIcon />}
        </StyledColorBlueDard>
      ),
    },
  ];

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Epochs List | Cardano Explorer`;
  }, []);

  const openDetail = (_: any, r: IDataEpoch, index: number) => {
    if (width >= theme.breakpoints.values.md) {
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
            handleCloseDetailView: handleClose,
          }}
          onClickRow={openDetail}
          selected={selected}
          showTabView
        />
      </Card>
      {epoch !== null && <DetailViewEpoch epochNo={epoch} handleClose={handleClose} callback={fetchData.update} />}
    </StyledContainer>
  );
};

export default Epoch;
