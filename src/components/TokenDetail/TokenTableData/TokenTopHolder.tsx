import { Tooltip } from "@mui/material";
import { parse, stringify } from "qs";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../../commons/hooks/useFetchList";
import { AIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatADA, getShortHash } from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";

import { PriceIcon, PriceValue, SmallText, StyledLink, TopHolder } from "./styles";

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
      render: (data, index) => <SmallText>{index + 1}</SmallText>,
    },
    {
      title: "Address",
      key: "address",
      minWidth: "200px",
      render: r => (
        <Tooltip title={r.address} placement="top">
          <StyledLink to={routers.ADDRESS_DETAIL.replace(":address", r.address)}>{getShortHash(r.address)}</StyledLink>
        </Tooltip>
      ),
    },
    {
      title: "Balance",
      key: "balance",
      minWidth: "200px",
      render: r => (
        <PriceValue>
          <SmallText>{formatADA(r.quantity) || 0}</SmallText>
          <PriceIcon src={AIcon} alt="a icon" />
        </PriceValue>
      ),
    },
    {
      title: "Share",
      key: "share",
      minWidth: "200px",
      render: r => (
        <SmallText>{r.quantity && totalSupply ? ((r.quantity / totalSupply) * 100).toFixed(2) : 0}%</SmallText>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={transactions}
      total={{ count: total, title: "Total Top Holders" }}
      loading={transactionsLoading}
      initialized={initialized}
      onClickRow={(_, r: ITokenTopHolderTable) =>
        history.push(routers.ADDRESS_DETAIL.replace(":address", `${r.address}`))
      }
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
