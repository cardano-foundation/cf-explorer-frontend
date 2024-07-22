import { stringify } from "qs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { EPOCH_STATUS } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import Card from "src/components/commons/Card";
import DetailViewEpoch from "src/components/commons/DetailView/DetailViewEpoch";
import FirstEpoch from "src/components/commons/Epoch/FirstEpoch";
import SelectedIcon from "src/components/commons/SelectedIcon";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";
import { Capitalize } from "src/components/commons/CustomText/styles";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import NoRecord from "src/components/commons/NoRecord";

import { Blocks, BlueText, EpochNumber, Output, StatusTableRow, StyledBox, StyledContainer } from "./styles";

const Epoch: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const { pageInfo, setSort } = usePageInfo();

  const [key, setKey] = useState(0);
  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo }, false, epochNo);
  const fetchDataLatestEpoch = useFetchList<IDataEpoch>(API.EPOCH.LIST, { page: 0, size: 1 }, false, key);

  const { error } = fetchData;

  const EPOCH_STATUS_MAPPING = {
    [EPOCH_STATUS.FINISHED]: t("common.epoch.finished"),
    [EPOCH_STATUS.IN_PROGRESS]: t("common.epoch.inProgress"),
    [EPOCH_STATUS.REWARDING]: t("common.epoch.rewarding"),
    [EPOCH_STATUS.SYNCING]: t("common.epoch.cyncing")
  };

  const columns: Column<IDataEpoch>[] = [
    {
      title: <Capitalize data-testid="epoch.table.epochTitle">{t("glossary.epoch")}</Capitalize>,
      key: "epochNumber",
      minWidth: "50px",
      render: (r, idx) => (
        <EpochNumber data-testid={`epoch.epochValue#${idx}`}>
          <StyledBox>{r.no || 0}</StyledBox>
          <StatusTableRow status={r.status as keyof typeof EPOCH_STATUS}>
            {EPOCH_STATUS_MAPPING[EPOCH_STATUS[r.status]]}
          </StatusTableRow>
        </EpochNumber>
      )
    },
    {
      title: <Capitalize data-testid="epoch.table.startTimeTitle">{t("glossary.startTimestamp")}</Capitalize>,
      key: "startTime",
      minWidth: "100px",
      render: (r, idx) => (
        <DatetimeTypeTooltip>
          <BlueText data-testid={`epoch.table.startTimeValue#${idx}`}>
            {formatDateTimeLocal(r.startTime || "")}
          </BlueText>
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <Capitalize data-testid="epoch.table.endTimeTitle">{t("glossary.endTimestamp")}</Capitalize>,
      key: "endTime",
      minWidth: "100px",
      render: (r, idx) => (
        <DatetimeTypeTooltip>
          <BlueText data-testid={`epoch.table.endTimeValue#${idx}`}>
            {formatDateTimeLocal(r.endTime || "")}
            {selected === r.no && <SelectedIcon />}
          </BlueText>
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <Capitalize data-testid="epoch.table.blocksTitle">{t("filter.blocks")}</Capitalize>,
      key: "blkCount",
      minWidth: "100px",
      render: (r, idx) => <Blocks data-testid={`epoch.table.blocksValue#${idx}`}>{r.blkCount}</Blocks>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: <Capitalize data-testid="epoch.table.uniqueAccountsTitle">{t("glossary.uniqueAccounts")}</Capitalize>,
      key: "account",
      minWidth: "100px",
      render: (r, idx) => <Blocks data-testid={`epoch.epochValue#${idx}`}>{r.account}</Blocks>
    },
    {
      title: <Capitalize data-testid="epoch.table.transactionCountTitle">{t("glossary.transactionCount")}</Capitalize>,
      key: "transactionCount",
      minWidth: "100px",
      render: (r, idx) => <Blocks data-testid={`epoch.table.uniqueAccountsValue#${idx}`}>{r.txCount}</Blocks>
    },
    {
      title: (
        <Capitalize data-testid="epoch.table.rewardsDistributedTitle">{t("glossary.rewardsDistributed")}</Capitalize>
      ),
      key: "rDistributed",
      minWidth: "100px",
      render: (r, idx) => (
        <div data-testid={`epoch.table.rewardsDistributedValue#${idx}`}>
          {r.rewardsDistributed ? (
            <Output>
              {formatADAFull(r.rewardsDistributed)}
              <ADAicon />
            </Output>
          ) : (
            t("common.N/A")
          )}
        </div>
      )
    },
    {
      title: <Capitalize data-testid="epoch.table.totalOutputTitle">{t("glossary.totalOutput")}</Capitalize>,
      key: "outSum",
      minWidth: "100px",
      render: (r, idx) => (
        <Output data-testid={`epoch.table.totalOutputValue#${idx}`}>
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

  const openDetail = (_: IDataEpoch, r: IDataEpoch) => {
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

  if (error) return <NoRecord />;
  return (
    <StyledContainer>
      <Card data-testid="epoch.epochsTitle" title={t("glossary.epochs")}>
        {latestEpoch && <FirstEpoch data={latestEpoch} onClick={openDetail} />}
        <Table
          {...fetchData}
          data-testid="epoch.table"
          data={fetchData.currentPage === 0 ? [...fetchData.data.slice(1)] : fetchData.data}
          columns={columns}
          total={{ title: t("common.totalEpochs"), count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ ...pageInfo, page, size }) });
            },
            handleCloseDetailView: handleClose
          }}
          onClickRow={(_, r) => openDetail(r, r)}
          rowKey="no"
          selected={selected}
          showTabView
        />
      </Card>
      <DetailViewEpoch
        open={onDetailView}
        epochNo={selected || 0}
        handleClose={handleClose}
        callback={selected === latestEpoch?.no ? fetchDataLatestEpoch.update : fetchData.update}
      />
    </StyledContainer>
  );
};

export default Epoch;
