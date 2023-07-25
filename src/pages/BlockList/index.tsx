import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";

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

import { PriceWrapper, BlueText, StyledContainer, StyledLink } from "./styles";

const BlockList = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const [block, setBlock] = useState<number | string | null>(null);
  const [sort, setSort] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Block>(API.BLOCK.LIST, { ...pageInfo, sort });
  const mainRef = useRef(document.querySelector("#main"));

  useEffect(() => {
    document.title = `Blocks List | Iris - Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<Block>[] = [
    {
      title: "Block No",
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
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
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
          {block === (r.blockNo || r.hash) && <SelectedIcon />}
        </PriceWrapper>
      )
    }
  ];

  const openDetail = (_: any, r: Block, index: number) => {
    setOnDetailView(true);
    setBlock(r.blockNo || r.hash);
    setSelected(index);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setBlock(null);
    setSelected(null);
  };

  return (
    <StyledContainer>
      <Card data-testid="blocks-card" title={"Blocks"}>
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
          selected={selected}
          showTabView
        />
      </Card>
      {block && onDetailView && <DetailViewBlock blockNo={block} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default BlockList;
