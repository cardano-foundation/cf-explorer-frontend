import { parse, stringify } from "qs";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { AIcon } from "../../../commons/resources";
import { details, routers } from "../../../commons/routers";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { PriceIcon, PriceValue, SmallText, StyledLink } from "./styles";

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
        <CustomTooltip title={r.address} placement="top">
          <StyledLink to={routers.ADDRESS_DETAIL.replace(":address", r.address)}>
            {getShortWallet(r.address)}
          </StyledLink>
        </CustomTooltip>
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
        history.push(details.address(r.address))
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
