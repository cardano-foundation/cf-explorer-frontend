import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { useState } from "react";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADAFull, getPageInfo, getShortHash, numberWithCommas } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledLink } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import useFetchList from "../../commons/hooks/useFetchList";
import SelectedIcon from "../commons/SelectedIcon";
import ADAicon from "../commons/ADAIcon";

interface TransactionListProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: any, r: Transactions, index: number) => void;
  selected?: number | null;
  showTabView?: boolean;
  hash?: string | null;
  handleClose: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
  showTabView,
  hash,
  handleClose,
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");
  const fetchData = useFetchList<Transactions>(url, { ...pageInfo, sort });

  const onClickRow = (_: any, r: Transactions, index: number) => {
    if (openDetail) return openDetail(_, r, index);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (data, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0),
    },
    {
      title: "Tx Hash",
      key: "txhash",
      minWidth: 120,

      render: r => (
        <div>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
        </div>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: 60,
      render: r => (
        <Box>
          <Box>
            <StyledLink to={details.block(r.blockNo || r.blockHash)}>
              {r.blockNo || getShortHash(r.blockHash)}
            </StyledLink>
          </Box>
          <Box mt={1}>
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
          </Box>
        </Box>
      ),
    },
    {
      title: "Fee",
      key: "fee",
      minWidth: 120,
      render: r => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
            <ADAicon  />
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Output in ADA",
      minWidth: 120,
      key: "outSum",
      render: r => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.totalOutput)}</Box>
            <ADAicon  />
          {hash === r.hash && <SelectedIcon />}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
  ];
  const { pathname } = window.location;
  return (
    <Card title={pathname === "/transactions" ? "Transactions" : ""} underline={underline}>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total Transactions" }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          handleCloseDetailView: handleClose,
        }}
        onClickRow={onClickRow}
        selected={selected}
        showTabView={showTabView}
      />
    </Card>
  );
};

export default TransactionList;
