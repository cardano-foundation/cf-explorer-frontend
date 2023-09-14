import { stringify } from "qs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
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
import { Capitalize } from "src/components/commons/CustomText/styles";

import { Blocks, BlueText, EpochNumber, Output, StatusTableRow, StyledBox, StyledContainer } from "./styles";

const Epoch: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const { search } = useLocation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");
  const [key, setKey] = useState(0);
  const EPOCH_STATUS_MAPPING = {
    [EPOCH_STATUS.FINISHED]: t("common.epoch.finished"),
    [EPOCH_STATUS.IN_PROGRESS]: t("common.epoch.inProgress"),
    [EPOCH_STATUS.REWARDING]: t("common.epoch.rewarding"),
    [EPOCH_STATUS.SYNCING]: t("common.epoch.cyncing")
  };
  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo, sort }, false, epochNo);
  const fetchDataLatestEpoch = useFetchList<IDataEpoch>(API.EPOCH.LIST, { page: 0, size: 1 }, false, key);

  const mainRef = useRef(document.querySelector("#main"));
  const columns: Column<IDataEpoch>[] = [
    {
      title: <Capitalize>{t("glossary.epoch")}</Capitalize>,
      key: "epochNumber",
      minWidth: "50px",
      render: (r) => (
        <EpochNumber>
          <StyledBox>{r.no || 0}</StyledBox>
          <StatusTableRow status={r.status as keyof typeof EPOCH_STATUS}>
            {EPOCH_STATUS_MAPPING[EPOCH_STATUS[r.status]]}
          </StatusTableRow>
        </EpochNumber>
      )
    },
    {
      title: <Capitalize>{t("glossary.startTimestamp")}</Capitalize>,
      key: "startTime",
      minWidth: "100px",
      render: (r) => <BlueText>{formatDateTimeLocal(r.startTime || "")}</BlueText>
    },
    {
      title: <Capitalize>{t("glossary.endTimestamp")}</Capitalize>,
      key: "endTime",
      minWidth: "100px",
      render: (r) => (
        <BlueText>
          {formatDateTimeLocal(r.endTime || "")}
          {selected === r.no && <SelectedIcon />}
        </BlueText>
      )
    },
    {
      title: <Capitalize>{t("filter.blocks")}</Capitalize>,
      key: "blkCount",
      minWidth: "100px",
      render: (r) => <Blocks>{r.blkCount}</Blocks>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: <Capitalize>{t("glossary.uniqueAccounts")}</Capitalize>,
      key: "account",
      minWidth: "100px",
      render: (r) => <Blocks>{r.account}</Blocks>
    },
    {
      title: <Capitalize>{t("glossary.transactionCount")}</Capitalize>,
      key: "transactionCount",
      minWidth: "100px",
      render: (r) => <Blocks>{r.txCount}</Blocks>
    },
    {
      title: <Capitalize>{t("glossary.rewardsDistributed")}</Capitalize>,
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
            t("common.notAvailable")
          )}
        </>
      )
    },
    {
      title: <Capitalize>{t("glossary.totalOutput")}</Capitalize>,
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
    document.title = t("head.page.epochsList");
  }, [t]);

  const openDetail = (_: any, r: IDataEpoch) => {
    setOnDetailView(true);
    setSelected(r.no);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setSelected(null);
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  const latestEpoch = fetchDataLatestEpoch.data[0];

  useEffect(() => {
    // Update key when new epoch for api callback
    if (epochNo !== undefined && latestEpoch?.no !== undefined && epochNo !== latestEpoch.no) setKey(epochNo);
  }, [epochNo, latestEpoch?.no]);

  return (
    <StyledContainer>
      <Card title={t("glossary.epochs")}>
        {latestEpoch && <FirstEpoch data={latestEpoch} onClick={openDetail} />}
        <Table
          {...fetchData}
          data={fetchData.currentPage === 0 ? [...fetchData.data.slice(1)] : fetchData.data}
          columns={columns}
          total={{ title: t("common.totalEpochs"), count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            },
            handleCloseDetailView: handleClose
          }}
          onClickRow={openDetail}
          rowKey="no"
          selected={selected}
          showTabView
        />
      </Card>
      {selected !== null && onDetailView && (
        <DetailViewEpoch
          epochNo={selected}
          handleClose={handleClose}
          callback={selected === latestEpoch?.no ? fetchDataLatestEpoch.update : fetchData.update}
        />
      )}
    </StyledContainer>
  );
};

export default Epoch;
