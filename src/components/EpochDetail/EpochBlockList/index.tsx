import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Card from "src/components/commons/Card";
import Table, { Column } from "src/components/commons/Table";
import { formatDateTimeLocal, formatNameBlockNo, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import { TooltipIcon } from "src/commons/resources";

import { StyledContainer, StyledLink, PriceWrapper, Actions, TimeDuration } from "./styles";

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

  const onClickRow = (e: React.MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    if (e.target instanceof HTMLAnchorElement || (e.target instanceof Element && e.target.closest("a"))) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    history.push(details.block(r.blockNo || r.hash));
  };

  const columns: Column<BlockDetail>[] = [
    {
      title: <div data-testid="epochList.blockTitle">{t("glossary.block")}</div>,
      key: "block",
      minWidth: "100px",
      render: (r, index) => {
        const { blockName, tooltip } = formatNameBlockNo(r.blockNo, r.epochNo);
        return (
          <StyledLink data-testid={`epochList.blockValue#${index}`} to={details.block(r.blockNo || r.hash)}>
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
      render: (r, index) => (
        <CustomTooltip data-testid={`epochList.blockIdValue#${index}`} title={r.hash}>
          <StyledLink to={details.block(r.blockNo || r.hash)}>{getShortHash(`${r.hash}`)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: <div data-testid="epochList.epochTitle">{t("glossary.epoch")}</div>,
      key: "epochNo",
      minWidth: "50px",
      render: (r, index) => (
        <StyledLink data-testid={`epochList.epochValue#${index}`} to={details.epoch(r.epochNo)}>
          {r.epochNo}
        </StyledLink>
      )
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div data-testid="epochList.slotTitle">{t("glossary.slot")}</div>
          <CustomTooltip title={t("common.explainSlot")}>
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "epochSlotNo",
      minWidth: "50px",
      render: (r, index) => <div data-testid={`epochList.slotValue#${index}`}>{r.epochSlotNo}</div>
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div data-testid="epochList.slotNoTitle">{t("glossary.absoluteSlot")}</div>
          <CustomTooltip title={t("common.absoluteSlot")}>
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "slotNo",
      minWidth: "100px",
      render: (r, index) => <div data-testid={`epochList.slotNoValue#${index}`}>{r.slotNo}</div>
    },
    {
      title: <div data-testid="epochList.createdAtTitle">{t("createdAt")}</div>,
      key: "time",
      minWidth: "100px",
      render: (r, index) => (
        <DatetimeTypeTooltip>
          <PriceWrapper data-testid={`epochList.createdAtValue#${index}`}>{formatDateTimeLocal(r.time)}</PriceWrapper>
        </DatetimeTypeTooltip>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title={<Box data-testid="epoch.blockList.blocksTitle">{t("head.page.blocks")}</Box>} underline>
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
          onClickRow={onClickRow}
        />
      </Card>
    </StyledContainer>
  );
};

export default EpochBlockList;
