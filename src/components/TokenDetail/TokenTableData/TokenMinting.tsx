import { stringify } from "qs";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import {
  formatAmount,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  numberWithCommas
} from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";

import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { PriceValue, SmallText, StyledLink } from "./styles";

interface ITokenMinting {
  tokenId: string;
  metadata?: ITokenMetadata;
}

const TokenMinting: React.FC<ITokenMinting> = ({ tokenId, metadata }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<ITokenTopHolderTable>(`${API.TOKEN.LIST}/${tokenId}/mints`, { ...pageInfo, tokenId });

  const columns: Column<ITokenMintingTable>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => <SmallText>{numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0)}</SmallText>
    },
    {
      title: "Tx Hash",
      key: "trxHash",
      minWidth: "200px",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Amount minted",
      key: "amountMinted",
      minWidth: "200px",
      render: (r) => (
        <PriceValue>
          <SmallText>{formatAmount(r.amount, metadata?.decimals)}</SmallText>
        </PriceValue>
      )
    },
    {
      title: "Created At",
      key: "createdat",
      minWidth: "200px",
      render: (r) => <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>
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
      onClickRow={(_, r: ITokenMintingTable) => history.push(details.transaction(r.txHash))}
    />
  );
};

export default TokenMinting;
