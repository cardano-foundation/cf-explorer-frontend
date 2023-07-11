import { Box } from "@mui/material";
import { stringify } from "qs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { EPOCH_STATUS } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal, getPageInfo } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import Card from "src/components/commons/Card";
import DetailViewEpoch from "src/components/commons/DetailView/DetailViewEpoch";
import FirstEpoch from "src/components/commons/Epoch/FirstEpoch";
import SelectedIcon from "src/components/commons/SelectedIcon";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";

import { Blocks, BlueText, Output, Status, StyledBox, StyledContainer } from "./styles";

const Epoch: React.FC = () => {
  const [epoch, setEpoch] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { search } = useLocation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");
  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo, sort });
  const fetchDataLatestEpoch = useFetchList<IDataEpoch>(API.EPOCH.LIST, { page: 0, size: 1 });

  const mainRef = useRef(document.querySelector("#main"));
  const columns: Column<IDataEpoch>[] = [
    {
      title: "Epoch Number",
      key: "epochNumber",
      minWidth: "50px",
      render: (r) => (
        <Link to={details.epoch(r.no || 0)}>
          <Box textAlign="center">
            <StyledBox>{r.no || 0}</StyledBox>
            <Status status={r.status as keyof typeof EPOCH_STATUS}>{EPOCH_STATUS[r.status]}</Status>
          </Box>
        </Link>
      )
    },
    {
      title: "Start Timestamp",
      key: "startTime",
      minWidth: "100px",
      render: (r) => <BlueText>{formatDateTimeLocal(r.startTime || "")}</BlueText>
    },
    {
      title: "End Timestamp",
      key: "endTime",
      minWidth: "100px",
      render: (r) => (
        <BlueText>
          {formatDateTimeLocal(r.endTime || "")}
          {epoch === r.no && <SelectedIcon />}
        </BlueText>
      )
    },
    {
      title: "Blocks",
      key: "blkCount",
      minWidth: "100px",
      render: (r) => <Blocks>{r.blkCount}</Blocks>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Transaction Count",
      key: "transactionCount",
      minWidth: "100px",
      render: (r) => <Blocks>{r.txCount}</Blocks>
    },
    {
      title: "Rewards Distributed",
      key: "rDistributed",
      minWidth: "100px",
      render: (r) => (
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
      )
    },
    {
      title: "Total Output",
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <Output>
          {formatADAFull(r.outSum)}
          <ADAicon />
        </Output>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Epochs List | Cardano Explorer`;
  }, []);

  const openDetail = (_: any, r: IDataEpoch, index: number) => {
    setOnDetailView(true);
    setEpoch(r.no);
    setSelected(index);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setEpoch(null);
    setSelected(null);
  };

  const latestEpoch = fetchDataLatestEpoch.data[0];

  return (
    <StyledContainer>
      <Card title={"Epochs"}>
        {latestEpoch && <FirstEpoch data={latestEpoch} onClick={openDetail} />}
        <Table
          {...fetchData}
          data={fetchData.currentPage === 0 ? [...fetchData.data.slice(1)] : fetchData.data}
          columns={columns}
          total={{ title: "Total Epochs", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo(0, 0);
            },
            handleCloseDetailView: handleClose
          }}
          onClickRow={openDetail}
          selected={selected}
          showTabView
        />
      </Card>
      {epoch !== null && onDetailView && (
        <DetailViewEpoch
          epochNo={epoch}
          handleClose={handleClose}
          callback={epoch === latestEpoch?.no ? fetchDataLatestEpoch.update : fetchData.update}
        />
      )}
    </StyledContainer>
  );
};

export default Epoch;
