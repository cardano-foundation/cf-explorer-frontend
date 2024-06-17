import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Card from "src/components/commons/Card";
import Table, { Column } from "src/components/commons/Table";
import {
  formatADAFull,
  formatDateTimeLocal,
  formatNameBlockNo,
  getPageInfo,
  getShortHash
} from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { StyledOutput, BlueText, StyledContainer, StyledLink, PriceWrapper, Actions, TimeDuration } from "./styles";

interface IEpochBlockList {
  epochId: string;
}

const EpochBlockList: React.FC<IEpochBlockList> = ({ epochId }) => {
  const { t } = useTranslation();
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<BlockDetail>(
    `${API.EPOCH.DETAIL}/${epochId}/blocks`,
    pageInfo,
    false,
    epochNo?.toString() === epochId && pageInfo.page === 0 ? blockNo : 0
  );

  const { error } = fetchData;

  const columns: Column<BlockDetail>[] = [
    {
      title: <div data-testid="epochList.blockTitle">{t("glossary.block")}</div>,
      key: "block",
      minWidth: "100px",
      render: (r) => {
        const { blockName, tooltip } = formatNameBlockNo(r.blockNo, r.epochNo);
        return (
          <StyledLink data-testid="epochList.blockValue" to={details.block(r.blockNo || r.hash)}>
            <CustomTooltip title={tooltip}>
              <span>{blockName}</span>
            </CustomTooltip>
          </StyledLink>
        );
      }
    },
    {
      title: <div data-testid="epochList.blockIdTitle">{t("glossary.blockID")}</div>,
      key: "blockId",
      minWidth: "150px",
      render: (r) => (
        <CustomTooltip data-testid="epochList.blockIdValue" title={r.hash}>
          <StyledLink to={details.block(r.blockNo || r.hash)}>{getShortHash(`${r.hash}`)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: <div data-testid="epochList.epochTitle">{t("glossary.epoch")}</div>,
      key: "epochNo",
      minWidth: "50px",
      render: (r) => (
        <StyledLink data-testid="epochList.epochValue" to={details.epoch(r.epochNo)}>
          {r.epochNo}
        </StyledLink>
      )
    },
    {
      title: <div data-testid="epochList.slotTitle">{t("glossary.slot")}</div>,
      key: "epochSlotNo",
      minWidth: "50px",
      render: (r) => <div data-testid="epochList.slotValue">{r.epochSlotNo}</div>
    },
    {
      title: <div data-testid="epochList.slotNoTitle">{t("glossary.absoluteSlot")}</div>,
      key: "slotNo",
      minWidth: "100px",
      render: (r) => <div data-testid="epochList.slotNoValue">{r.slotNo}</div>
    },
    {
      title: <div data-testid="epochList.createdAtTitle">{t("createdAt")}</div>,
      key: "time",
      minWidth: "100px",
      render: (r) => (
        <DatetimeTypeTooltip>
          <PriceWrapper data-testid="epochList.createdAtValue">{formatDateTimeLocal(r.time)}</PriceWrapper>
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <div data-testid="epochList.blkCountTitle">{t("drawer.transactions")}</div>,
      key: "blkCount",
      minWidth: "100px",
      render: (r) => <BlueText data-testid="epochList.blkCountTitle">{r.txCount || 0}</BlueText>
    },
    {
      title: <div data-testid="epochList.feesTitle">{t("common.fees")}</div>,
      key: "fees",
      render: (r) => (
        <PriceWrapper data-testid="epochList.feesValue">
          {formatADAFull(r.totalFees)}
          <ADAicon />
        </PriceWrapper>
      )
    },
    {
      title: <div data-testid="epochList.outSumTitle">{t("glossary.output")}</div>,
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <StyledOutput>
          <BlueText data-testid="epochList.outSumValue">{formatADAFull(r.totalOutput)}</BlueText>
          <ADAicon />
        </StyledOutput>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card data-testid="epoch.blockList.blocksTitle" title={t("head.page.blocks")} underline>
        {!error && (
          <Actions>
            <TimeDuration>
              <FormNowMessage time={fetchData.lastUpdated} />
            </TimeDuration>
          </Actions>
        )}
        <Table
          data-testid="epoch.blockList.table"
          {...fetchData}
          error={error}
          columns={columns}
          total={{ title: t("common.totalBlocks"), count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
          }}
          onClickRow={(_, r) => history.push(details.block(r.blockNo || r.hash))}
        />
      </Card>
    </StyledContainer>
  );
};

export default EpochBlockList;
