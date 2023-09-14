import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import { Column } from "src/types/table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { setOnDetailView } from "src/stores/user";
import DetailViewBlock from "src/components/commons/DetailView/DetailViewBlock";
import Card from "src/components/commons/Card";
import Table from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import SelectedIcon from "src/components/commons/SelectedIcon";
import Link from "src/components/commons/Link";
import ADAicon from "src/components/commons/ADAIcon";
import useFetchList from "src/commons/hooks/useFetchList";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { PriceWrapper, BlueText, StyledContainer, StyledLink, Actions, TimeDuration } from "./styles";

const BlockList = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const [sort, setSort] = useState<string>("");
  const [selected, setSelected] = useState<number | string | null>(null);
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Block>(API.BLOCK.LIST, { ...pageInfo, sort }, false, blockNo);
  const mainRef = useRef(document.querySelector("#main"));

  useEffect(() => {
    document.title = `Blocks List | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<Block>[] = [
    {
      title: "Block",
      key: "blockNo",
      minWidth: "50px",
      render: (r) => <Link to={details.block(r.blockNo || r.hash)}>{r.blockNo !== null ? r.blockNo : "_"}</Link>
    },
    {
      title: "Block ID",
      key: "blockId",
      minWidth: "150px",
      render: (r) => (
        <CustomTooltip title={r.hash}>
          <StyledLink to={details.block(r.blockNo || r.hash)}>{getShortHash(`${r.hash}`)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Epoch/Slot",
      key: "epoch",
      minWidth: "150px",
      render: (r) => (
        <>
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/
          <Box component={"span"} color={({ palette }) => palette.secondary.light}>
            {r.epochSlotNo}
          </Box>
        </>
      )
    },
    {
      title: "Created At",
      key: "time",
      minWidth: "100px",
      render: (r) => <PriceWrapper>{formatDateTimeLocal(r.time)}</PriceWrapper>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Transactions",
      key: "txCount",
      minWidth: "50px",
      render: (r) => <BlueText>{r.txCount}</BlueText>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Fees",
      key: "fees",
      render: (r) => (
        <PriceWrapper>
          {formatADAFull(r.totalFees)}
          <ADAicon />
        </PriceWrapper>
      )
    },
    {
      title: "Output",
      key: "output",
      minWidth: "100px",
      render: (r) => (
        <PriceWrapper>
          {formatADAFull(r.totalOutput)}
          <ADAicon />
          {selected === (r.blockNo || r.hash) && <SelectedIcon />}
        </PriceWrapper>
      )
    }
  ];

  const openDetail = (_: any, r: Block) => {
    setOnDetailView(true);
    setSelected(r.blockNo || r.hash);
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
      <Card data-testid="blocks-card" title={"Blocks"}>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={fetchData.lastUpdated} />
          </TimeDuration>
        </Actions>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Blocks", count: fetchData.total }}
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
          rowKey={(r: Block) => r.blockNo || r.hash}
          selected={selected}
          showTabView
          tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
        />
      </Card>
      {selected && onDetailView && <DetailViewBlock blockNo={selected} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default BlockList;
