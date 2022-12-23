import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box, Container } from "@mui/material";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADA, getShortHash } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { PriceWrapper, StyledColorBlueDard, StyledLink } from "./styles";
import DetailViewBlock from "../commons/DetailView/DetailViewBlock";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { setOnDetailView } from "../../stores/user";
import CustomTooltip from "../commons/CustomTooltip";

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
  const location = useLocation();
  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };
  useEffect(() => {
    handleClose();
  }, [location.pathname, location.search]);
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
