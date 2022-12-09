import { Tooltip } from "@mui/material";
import { parse, stringify } from "qs";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../../commons/hooks/useFetchList";
import { AIcon } from "../../../commons/resources";
import { formatADA, getShortHash } from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";

import { TopHolder } from "./styles";

interface ITokenTopHolder {
  active: boolean;
  tokenId: string;
  totalSupply?: number;
}

const TokenTopHolder: React.FC<ITokenTopHolder> = ({ active, tokenId, totalSupply }) => {
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const {
    data: transactions,
    loading: transactionsLoading,
    initialized,
    total,
    totalPage,
    currentPage,
  } = useFetchList<ITokenTopHolderTable>(active ? `tokens/${tokenId}/top_holders` : "", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
    tokenId: tokenId,
  });

  const columns: Column<ITokenTopHolderTable>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => <TopHolder.TopHolderIndex>{index + 1}</TopHolder.TopHolderIndex>,
    },
    {
      title: "Address",
      key: "address",
      minWidth: "200px",
      render: r => (
        <Tooltip title={r.address} placement="top">
          <TopHolder.TopHolderHash to={"#"}>
            {getShortHash(r.address)}
            <BiLinkExternal style={{ marginLeft: 8 }} />
          </TopHolder.TopHolderHash>
        </Tooltip>
      ),
    },
    {
      title: "Balance",
      key: "balance",
      minWidth: "200px",
      render: r => (
        <TopHolder.TopHolderBalance>
          <TopHolder.StyledImg src={AIcon} alt="a icon" />
          {formatADA(r.quantity) || 0}
        </TopHolder.TopHolderBalance>
      ),
    },
    {
      title: "Share",
      key: "share",
      minWidth: "200px",
      render: r => (
        <TopHolder.TopHolderShare>
          {r.quantity && totalSupply ? ((r.quantity / totalSupply) * 100).toFixed(2) : 0}%
        </TopHolder.TopHolderShare>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={transactions}
      total={{ count: total, title: "Total" }}
      loading={transactionsLoading}
      initialized={initialized}
      //   onClickRow={(_, r: Transactions) => history.push(routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`))}
      pagination={{
        onChange: (page, size) => {
          setQuery({ page, size });
        },
        page: currentPage || 0,
        total: total,
      }}
    />
  );
};

export default TokenTopHolder;
