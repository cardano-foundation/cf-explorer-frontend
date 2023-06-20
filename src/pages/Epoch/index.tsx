import { stringify } from "qs";
import { useEffect, useState, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Box, useTheme } from "@mui/material";

import useFetchList from "src/commons/hooks/useFetchList";
import { EPOCH_STATUS, MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal, getEpochSlotNo, getPageInfo } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import Card from "src/components/commons/Card";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";
import DetailViewEpoch from "src/components/commons/DetailView/DetailViewEpoch";
import { API } from "src/commons/utils/api";
import SelectedIcon from "src/components/commons/SelectedIcon";
import ADAicon from "src/components/commons/ADAIcon";
import ProgressCircle from "src/components/commons/ProgressCircle";
import FirstEpoch from "src/components/commons/Epoch/FirstEpoch";

import { Blocks, StyledContainer, Output, BlueText, Status } from "./styles";

const Epoch: React.FC = () => {
  const [epoch, setEpoch] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { search } = useLocation();
  const history = useHistory();
  const theme = useTheme();
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
            <Box width={41} margin="auto">
              <ProgressCircle
                size={41}
                pathWidth={5}
                trailWidth={5}
                strokeColor={theme.palette.green[600]}
                percent={(getEpochSlotNo(r) / MAX_SLOT_EPOCH) * 100}
              >
                <div>{r.no || 0}</div>
              </ProgressCircle>
            </Box>
            <Status status={r.status.toLowerCase()}>{EPOCH_STATUS[r.status]}</Status>
          </Box>
        </Link>
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
      {epoch !== null && (
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
