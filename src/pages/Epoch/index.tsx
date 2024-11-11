import { stringify } from "qs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { EPOCH_STATUS } from "src/commons/utils/constants";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import FirstEpoch from "src/components/commons/Epoch/FirstEpoch";
import Table, { Column } from "src/components/commons/Table";
import { Capitalize } from "src/components/commons/CustomText/styles";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import NoRecord from "src/components/commons/NoRecord";
import FetchDataErr from "src/components/commons/FetchDataErr";
import { details } from "src/commons/routers";

import { Blocks, BlueText, EpochNumber, StatusTableRow, StyledContainer, StyledLink } from "./styles";

const Epoch: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<(number | string | null)[]>([]);
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const { pageInfo, setSort } = usePageInfo();

  const [key, setKey] = useState(0);
  const fetchData = useFetchList<IDataEpoch>(API.EPOCH.LIST, { ...pageInfo }, false, epochNo);
  const fetchDataLatestEpoch = useFetchList<IDataEpoch>(API.EPOCH.LIST, { page: 0, size: 1 }, false, key);

  const { error, statusError } = fetchData;

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
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <StyledLink to={details.epoch(r.no)} data-testid={`blocks.table.value.epoch#${idx}`}>
              {r.no}
            </StyledLink>
            <StatusTableRow status={r.status as keyof typeof EPOCH_STATUS}>
              {EPOCH_STATUS_MAPPING[EPOCH_STATUS[r.status]]}
            </StatusTableRow>
          </Box>
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
          <BlueText data-testid={`epoch.table.endTimeValue#${idx}`}>{formatDateTimeLocal(r.endTime || "")}</BlueText>
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
    }
  ];

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = t("head.page.epochsList");
  }, [t]);

  const handleOpenDetail = (_: React.MouseEvent, r: IDataEpoch) => {
    history.push(details.epoch(r.no));
  };

  const handleExpandedRow = (data: IDataEpoch) => {
    setSelected((prev) => {
      const isSelected = prev.includes(Number(data.no));

      if (isSelected) {
        return prev.filter((no) => no !== Number(data.no));
      } else {
        return [...prev, Number(data.no)];
      }
    });
  };

  const handleClose = () => {
    setSelected([]);
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  const latestEpoch = fetchDataLatestEpoch.data[0];

  useEffect(() => {
    // Update key when new epoch for api callback
    if (epochNo !== undefined && latestEpoch?.no !== undefined && epochNo !== latestEpoch.no) setKey(epochNo);
  }, [epochNo, latestEpoch?.no]);

  if (error && (statusError || 0) < 500) return <NoRecord />;
  if (error && (statusError || 0) >= 500) return <FetchDataErr />;

  const expandedEpochRowData = [
    { label: "Unique Accounts", value: "account" },
    { label: "Transaction Count", value: "txCount" },
    { label: "Rewards Distributed", value: "rewardsDistributed", isFormatADA: true },
    { label: "Total Output", value: "outSum", isFormatADA: true }
  ];

  return (
    <StyledContainer>
      <Card data-testid="epoch.epochsTitle" title={t("glossary.epochs")}>
        {latestEpoch && <FirstEpoch data={latestEpoch} onClick={handleOpenDetail} />}
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
          onClickRow={handleOpenDetail}
          onClickExpandedRow={handleExpandedRow}
          rowKey="no"
          selected={selected}
          showTabView
          expandedTable
          expandedRowData={expandedEpochRowData}
        />
      </Card>
    </StyledContainer>
  );
};

export default Epoch;
