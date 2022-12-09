import { useHistory } from "react-router-dom";
import moment from "moment";
import { stringify } from "qs";
import { Tooltip } from "@mui/material";

import Card from "../commons/Card";
import { Column } from "../commons/Table";
import { getShortWallet, formatADA } from "../../commons/utils/helper";

import { routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";

import { BlocksTable, StyledColorBlueDard, StyledIcon, StyledImage, StyledLink } from "./styles";

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
      title: "Block Number",
      key: "blockNo",
      minWidth: "100px",
      render: r => <b>{r.blockNo}</b>,
    },
    {
      title: "Block ID",
      key: "blockId",
      minWidth: "150px",
      render: r => (
        <Tooltip placement="top" title={r.hash}>
          <StyledLink>
            {getShortWallet(`${r.hash}`)}
            <StyledIcon />
          </StyledLink>
        </Tooltip>
      ),
    },
    {
      title: "Created at",
      key: "createdAt",
      minWidth: "150px",
      render: r => (
        <StyledColorBlueDard>{r.time ? moment(r.time).format("MM/DD/YYYY HH:mm:ss") : ""}</StyledColorBlueDard>
      ),
    },
    {
      title: "Transactions",
      key: "transactions",
      minWidth: "150px",
      render: r => <b>{r.txCount}</b>,
    },
    {
      title: "Fees",
      key: "fees",
      render: r => (
        <b>
          <StyledImage src={AIcon} alt="ADA Icon" /> {formatADA(r.totalFees) || 0}
        </b>
      ),
    },
    {
      title: "Output",
      key: "output",
      minWidth: "100px",
      render: r => (
        <b>
          <StyledImage src={AIcon} alt="ADA Icon" /> {formatADA(r.totalFees) || 0}
        </b>
      ),
    },
  ];

  return (
    <Card title={"Blocks"}>
      <BlocksTable
        loading={loading}
        initialized={initialized}
        columns={columns}
        data={blockLists}
        total={{ count: total, title: "Total Transactions" }}
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
