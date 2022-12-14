import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Container, Tooltip } from "@mui/material";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { getShortWallet, formatADA } from "../../commons/utils/helper";

import { routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";

import { PriceWrapper, StyledColorBlueDard, StyledLink } from "./styles";
import DetailViewBlock from "../commons/DetailView/DetailViewBlock";
import { useState } from "react";
import { useWindowSize } from "react-use";
import { setOnDetailView } from "../../stores/user";

interface BlockListProps {
  blockLists: Block[];
  loading: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
  initialized: boolean;
}

const BlockList: React.FC<BlockListProps> = ({ blockLists, loading, initialized, total, currentPage }) => {
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
        <Tooltip placement="top" title={r.hash}>
          <StyledLink to={"#"}>{getShortWallet(`${r.hash}`)}</StyledLink>
        </Tooltip>
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
        </PriceWrapper>
      ),
    },
  ];
  const openDetail = (_: any, r: Block) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r.blockNo);
    } else history.push(routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };

  const selected = blockLists?.findIndex(item => item.blockNo === detailView);

  return (
    <Container>
      <Card title={"Blocks"}>
        <Table
          loading={loading}
          initialized={initialized}
          columns={columns}
          data={blockLists}
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
    </Container>
  );
};

export default BlockList;
