import { useEffect, useState } from "react";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { PriceWrapper, StyledColorBlueDard, StyledContainer, StyledLink } from "./styles";
import { useWindowSize } from "react-use";
import { Column } from "../../types/table";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { details } from "../../commons/routers";
import { formatADA, formatADAFull, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { Box } from "@mui/material";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AIcon } from "../../commons/resources";
import { setOnDetailView } from "../../stores/user";
import DetailViewBlock from "../../components/commons/DetailView/DetailViewBlock";
import Card from "../../components/commons/Card";
import Table from "../../components/commons/Table";
import { API } from "../../commons/utils/api";

const BlockList = () => {
  const [block, setBlock] = useState<number | string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<IStakeKey>(API.BLOCK.LIST, pageInfo);

  useEffect(() => {
    document.title = `Blocks List | Cardano Explorer`;
  }, []);

  const columns: Column<Block>[] = [
    {
      title: "Block No",
      key: "blockNo",
      minWidth: "50px",
      render: r => <StyledColorBlueDard>{r.blockNo !== null ? r.blockNo : "_"}</StyledColorBlueDard>,
    },
    {
      title: "Block ID",
      key: "blockId",
      minWidth: "150px",
      render: r => (
        <CustomTooltip title={r.hash}>
          <StyledLink to={details.block(r.blockNo || r.hash)}>{getShortHash(`${r.hash}`)}</StyledLink>
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
        <CustomTooltip title={formatADAFull(r.totalFees)}>
          <PriceWrapper>
            {formatADA(r.totalFees) || 0}
            <img src={AIcon} alt="ADA Icon" />
          </PriceWrapper>
        </CustomTooltip>
      ),
    },
    {
      title: "Output",
      key: "output",
      minWidth: "100px",
      render: r => (
        <CustomTooltip title={formatADAFull(r.totalOutput)}>
          <PriceWrapper>
            {formatADA(r.totalOutput) || 0}
            <img src={AIcon} alt="ADA Icon" />
            {block === (r.blockNo || r.hash) && (
              <Box position={"absolute"} right="10px" top={"50%"} style={{ transform: "translateY(-50%)" }}>
                <MdOutlineKeyboardArrowRight fontSize={30} />
              </Box>
            )}
          </PriceWrapper>
        </CustomTooltip>
      ),
    },
  ];

  const openDetail = (_: any, r: Block, index: number) => {
    if (width > 1023) {
      setOnDetailView(true);
      setBlock(r.blockNo || r.hash);
      setSelected(index);
    } else history.push(details.block(r.blockNo || r.hash));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setBlock(null);
    setSelected(null);
  };

  return (
    <StyledContainer>
      <Card title={"Blocks"}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Blocks", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
          onClickRow={openDetail}
          selected={selected}
        />
        {block && <DetailViewBlock blockNo={block} handleClose={handleClose} />}
      </Card>
    </StyledContainer>
  );
};

export default BlockList;
