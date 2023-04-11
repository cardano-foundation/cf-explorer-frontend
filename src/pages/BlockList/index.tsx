import { useEffect, useState } from "react";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { PriceWrapper, StyledColorBlueDard, StyledContainer, StyledLink } from "./styles";
import { useWindowSize } from "react-use";
import { Column } from "../../types/table";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { details } from "../../commons/routers";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { useTheme } from "@mui/material";
import { AIcon } from "../../commons/resources";
import { setOnDetailView } from "../../stores/user";
import DetailViewBlock from "../../components/commons/DetailView/DetailViewBlock";
import Card from "../../components/commons/Card";
import Table from "../../components/commons/Table";
import { API } from "../../commons/utils/api";
import SelectedIcon from "../../components/commons/SelectedIcon";
import ADAicon from "../../components/commons/ADAIcon";

const BlockList = () => {
  const [block, setBlock] = useState<number | string | null>(null);
  const [sort, setSort] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<IStakeKey>(API.BLOCK.LIST, { ...pageInfo, sort });
  const theme = useTheme();

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
      key: "txCount",
      minWidth: "50px",
      render: r => <StyledColorBlueDard>{r.txCount}</StyledColorBlueDard>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Fees",
      key: "fees",
      render: r => (
        <PriceWrapper>
          {formatADAFull(r.totalFees)}
          <ADAicon />
        </PriceWrapper>
      ),
    },
    {
      title: "Output",
      key: "output",
      minWidth: "100px",
      render: r => (
        <PriceWrapper>
          {formatADAFull(r.totalOutput)}
          <ADAicon />
          {block === (r.blockNo || r.hash) && <SelectedIcon />}
        </PriceWrapper>
      ),
    },
    {
      title: "Created At",
      key: "time",
      minWidth: "100px",
      render: r => <PriceWrapper>{formatDateTimeLocal(r.time)}</PriceWrapper>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
  ];

  const openDetail = (_: any, r: Block, index: number) => {
    if (width >= theme.breakpoints.values.md) {
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
            handleCloseDetailView: handleClose,
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
