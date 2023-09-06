import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import Card from "src/components/commons/Card";
import Table, { Column } from "src/components/commons/Table";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { EpochNo, StyledOutput, BlueText, StyledContainer, StyledLink, PriceWrapper } from "./styles";

interface IEpochBlockList {
  epochId: string;
}

const EpochBlockList: React.FC<IEpochBlockList> = ({ epochId }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<BlockDetail>(
    `${API.EPOCH.DETAIL}/${epochId}/blocks`,
    pageInfo,
    false,
    pageInfo.page === 0 ? REFRESH_TIMES.EPOCH_DETAIL : 0
  );

  const columns: Column<BlockDetail>[] = [
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: "100px",
      render: (r) => (
        <StyledLink to={details.block(r.blockNo || r.hash)}>{r.blockNo || getShortHash(r.hash || "")}</StyledLink>
      )
    },
    {
      title: t("glossary.blockID"),
      key: "blockId",
      minWidth: "150px",
      render: (r) => (
        <CustomTooltip title={r.hash}>
          <StyledLink to={details.block(r.blockNo || r.hash)}>{getShortHash(`${r.hash}`)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.EpochSlot"),
      key: "slot",
      minWidth: "100px",
      render: (r) => (
        <>
          <EpochNo>{r.slotNo}</EpochNo>
          <Box color={({ palette }) => palette.secondary.light}>
            {r.epochNo}/{r.epochSlotNo || 0}
          </Box>
        </>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "100px",
      render: (r) => <PriceWrapper>{formatDateTimeLocal(r.time)}</PriceWrapper>
    },
    {
      title: t("drawer.transactions"),
      key: "blkCount",
      minWidth: "100px",
      render: (r) => <BlueText>{r.txCount || 0}</BlueText>
    },
    {
      title: t("common.fees"),
      key: "fees",
      render: (r) => (
        <PriceWrapper>
          {formatADAFull(r.totalFees)}
          <ADAicon />
        </PriceWrapper>
      )
    },
    {
      title: t("glossary.output"),
      key: "outSum",
      minWidth: "100px",
      render: (r) => (
        <StyledOutput>
          <BlueText>{formatADAFull(r.totalOutput)}</BlueText>
          <ADAicon />
        </StyledOutput>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title={t("head.page.blocks")} underline>
        <Table
          {...fetchData}
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
