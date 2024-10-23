import { useSelector } from "react-redux";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { Box } from "@mui/material";
import { stringify } from "qs";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Column } from "src/types/table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { formatDateTimeLocal, formatNameBlockNo, getShortHash } from "src/commons/utils/helper";
import { setOnDetailView } from "src/stores/user";
import Card from "src/components/commons/Card";
import Table from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import Link from "src/components/commons/Link";
import useFetchList from "src/commons/hooks/useFetchList";
import { Capitalize } from "src/components/commons/CustomText/styles";
import FormNowMessage from "src/components/commons/FormNowMessage";
import usePageInfo from "src/commons/hooks/usePageInfo";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import { TooltipIcon } from "src/commons/resources";

import { PriceWrapper, StyledContainer, StyledLink, Actions, TimeDuration } from "./styles";

const BlockList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const { pageInfo, setSort } = usePageInfo();
  const [selected, setSelected] = useState<number | string | null>(null);

  const fetchData = useFetchList<Block>(API.BLOCK.LIST, { ...pageInfo }, false, blockNo);
  const mainRef = useRef(document.querySelector("#main"));
  const { error } = fetchData;
  useEffect(() => {
    document.title = `Blocks List | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<Block>[] = [
    {
      title: <Capitalize data-testid="blocks.table.title.block">{t("glossary.block")}</Capitalize>,
      key: "blockNo",
      minWidth: "50px",
      render: (r, index) => {
        const { blockName, tooltip } = formatNameBlockNo(r.blockNo, r.epochNo);
        return (
          <Link to={details.block(r.blockNo || r.hash)}>
            <CustomTooltip title={tooltip}>
              <span data-testid={`blocks.table.value.block#${index}`}>{blockName}</span>
            </CustomTooltip>
          </Link>
        );
      }
    },
    {
      title: <Capitalize data-testid="blocks.table.title.blockId">{t("glossary.blockID")}</Capitalize>,
      key: "blockId",
      minWidth: "50px",
      render: (r, index) => (
        <CustomTooltip title={r.hash}>
          <StyledLink to={details.block(r.blockNo || r.hash)} data-testid={`blocks.table.value.blockId#${index}`}>
            {getShortHash(`${r.hash}`)}
          </StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: <Capitalize data-testid="blocks.table.title.epoch"> {t("glossary.epoch")}</Capitalize>,
      key: "epochNo",
      minWidth: "50px",
      render: (r, index) => (
        <StyledLink to={details.epoch(r.epochNo)} data-testid={`blocks.table.value.epoch#${index}`}>
          {r.epochNo}
        </StyledLink>
      )
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Capitalize data-testid="blocks.table.title.slot">{t("glossary.slot")}</Capitalize>
          <CustomTooltip
            title={
              <Box sx={{ textAlign: "left" }}>
                <p>{t("common.explainSlot")}</p>
              </Box>
            }
          >
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "epochSlotNo",
      minWidth: "100px",
      render: (r, index) => <Box data-testid={`blocks.table.value.slot#${index}`}>{r.epochSlotNo}</Box>
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Capitalize data-testid="blocks.table.title.absoluteSlot">{t("glossary.absoluteSlot")}</Capitalize>{" "}
          <CustomTooltip
            title={
              <Box sx={{ textAlign: "left" }}>
                <p>{t("common.absoluteSlot")}</p>
              </Box>
            }
          >
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "slotNo",
      minWidth: "100px",
      render: (r, index) => <Box data-testid={`blocks.table.value.absSlot#${index}`}>{r.slotNo}</Box>
    },
    {
      title: <Capitalize data-testid="blocks.table.title.createAt">{t("createdAt")}</Capitalize>,
      key: "time",
      minWidth: "100px",
      render: (r, index) => (
        <DatetimeTypeTooltip>
          <PriceWrapper data-testid={`blocks.table.value.createAt#${index}`}>
            {formatDateTimeLocal(r.time)}
          </PriceWrapper>
        </DatetimeTypeTooltip>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];

  const handleOpenDetail = (_: MouseEvent<Element, globalThis.MouseEvent>, r: Block) => {
    history.push(details.block(r.blockNo));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setSelected(null);
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  return (
    <StyledContainer>
      <Card data-testid="blocks-card" title={t("head.page.blocks")}>
        {!error && (
          <Actions>
            <TimeDuration>
              <FormNowMessage time={fetchData.lastUpdated} />
            </TimeDuration>
          </Actions>
        )}
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: t("common.totalBlocks"), count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ ...pageInfo, page, size }) });
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            },
            handleCloseDetailView: handleClose
          }}
          onClickRow={handleOpenDetail}
          rowKey={(r: Block) => r.blockNo || r.hash}
          selected={selected}
          showTabView
          tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
        />
      </Card>
    </StyledContainer>
  );
};

export default BlockList;
