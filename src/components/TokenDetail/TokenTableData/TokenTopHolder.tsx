import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";

import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import {
  formatNumberDivByDecimals,
  getPageInfo,
  getShortWallet,
  numberWithCommas
} from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { PriceValue, SmallText, StyledLink } from "./styles";
import { API } from "../../../commons/utils/api";

interface ITokenTopHolder {
  tokenId: string;
  totalSupply?: number;
  decimal?: number;
}

const TokenTopHolder: React.FC<ITokenTopHolder> = ({ tokenId, totalSupply, decimal }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<ITokenTopHolderTable>(`${API.TOKEN.LIST}/${tokenId}/top_holders`, {
    ...pageInfo,
    tokenId
  });

  const columns: Column<ITokenTopHolderTable>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => <SmallText>{numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0)}</SmallText>
    },
    {
      title: "Address",
      key: "address",
      minWidth: "200px",
      render: (r) => (
        <CustomTooltip title={r.address}>
          <StyledLink to={details.address(r.address)}>{getShortWallet(r.address)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Balance",
      key: "balance",
      minWidth: "200px",
      render: (r) => (
        <PriceValue>
          <SmallText>{formatNumberDivByDecimals(r?.quantity, decimal || 0)}</SmallText>
        </PriceValue>
      )
    },
    {
      title: "Share",
      key: "share",
      minWidth: "200px",
      render: (r) => (
        <SmallText>{r.quantity && totalSupply ? ((r.quantity / totalSupply) * 100).toFixed(2) : 0}%</SmallText>
      )
    }
  ];

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
      }}
      onClickRow={(_, r: ITokenTopHolderTable) => history.push(details.address(r.address))}
    />
  );
};

export default TokenTopHolder;
