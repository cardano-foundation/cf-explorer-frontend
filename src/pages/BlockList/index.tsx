import { useState } from "react";
import { parse, stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../commons/hooks/useFetchList";

import { PriceWrapper, StyledColorBlueDard, StyledContainer, StyledLink } from "./styles";
import { useWindowSize } from "react-use";
import { Column } from "../../types/table";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { details } from "../../commons/routers";
import { formatADA, getShortHash } from "../../commons/utils/helper";
import { Box } from "@mui/material";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AIcon } from "../../commons/resources";
import { setOnDetailView } from "../../stores/user";
import DetailViewBlock from "../../components/commons/DetailView/DetailViewBlock";
import Card from "../../components/commons/Card";
import Table from "../../components/commons/Table";

const BlockList = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const { data, loading, initialized, total, currentPage } = useFetchList<Block>("block/list", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });
  const [detailView, setDetailView] = useState<number | null>(null);
  const { width } = useWindowSize();
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<Block>[] = [
    {
      title: "Block No",
      key: "blockNo",
      minWidth: "50px",
      render: r => <StyledColorBlueDard>{r.blockNo}</StyledColorBlueDard>,
    },
    {
      title: "Block ID",
      key: "blockId",
      minWidth: "150px",
      render: r => (
        <CustomTooltip placement="top" title={r.hash}>
          <StyledLink to={details.block(r.blockNo)}>{getShortHash(`${r.hash}`)}</StyledLink>
        </CustomTooltip>
      ),
    },
    {
      title: "Transactions",
      key: "transactions",
      minWidth: "50px",
      render: r => <StyledColorBlueDard>{r.txCount}</StyledColorBlueDard>,
    },
    {
      title: "Fees",
      key: "fees",
      render: r => (
        <PriceWrapper>
          {formatADA(r.totalFees) || 0}
          <img src={AIcon} alt="ADA Icon" />
        </PriceWrapper>
      ),
    },
    {
      title: "Output",
      key: "output",
      minWidth: "100px",
      render: r => (
        <PriceWrapper>
          {formatADA(r.totalOutput) || 0}
          <img src={AIcon} alt="ADA Icon" />
          {detailView === r.blockNo && (
            <Box position={"absolute"} right="10px" top={"50%"} style={{ transform: "translateY(-50%)" }}>
              <MdOutlineKeyboardArrowRight fontSize={30} />
            </Box>
          )}
        </PriceWrapper>
      ),
    },
  ];
  const openDetail = (_: any, r: Block) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r.blockNo);
    } else history.push(details.block(r.blockNo));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };

  const selected = data?.findIndex(item => item.blockNo === detailView);

  return (
    <StyledContainer>
      <Card title={"Blocks"}>
        <Table
          loading={loading}
          initialized={initialized}
          columns={columns}
          data={data || []}
          total={{ count: total, title: "Total Blocks" }}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
            },
            page: currentPage || 0,
            total: total,
          }}
          onClickRow={openDetail}
          selected={selected}
          selectedProps={{ style: { backgroundColor: "#ECECEC" } }}
        />
        {detailView && <DetailViewBlock blockNo={detailView} handleClose={handleClose} />}
      </Card>
    </StyledContainer>
  );
};

export default BlockList;
