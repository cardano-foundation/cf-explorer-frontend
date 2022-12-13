import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Tooltip } from "@mui/material";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { getShortWallet, formatADA } from "../../commons/utils/helper";

import { routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";

import { PriceWrapper, StyledColorBlueDard, StyledLink } from "./styles";

interface BlockListProps {
  blockLists: Block[];
  loading: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
  initialized: boolean;
}

const BlockList: React.FC<BlockListProps> = ({ blockLists, loading, initialized, total, currentPage }) => {
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
          {formatADA(r.totalFees) || 0}
          <img src={AIcon} alt="ADA Icon" />
        </PriceWrapper>
      ),
    },
  ];

  return (
    <Card title={"Blocks"}>
      <Table
        loading={loading}
        initialized={initialized}
        columns={columns}
        data={blockLists}
        total={{ count: total, title: "Total Blocks" }}
        onClickRow={(_, r: Block) => history.push(routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`))}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: currentPage || 0,
          total: total,
        }}
      />
    </Card>
  );
};

export default BlockList;
