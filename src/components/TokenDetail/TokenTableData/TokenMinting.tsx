import { stringify } from "qs";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { formatDateTimeLocal, getPageInfo, getShortHash, numberWithCommas } from "../../../commons/utils/helper";
import { API } from "../../../commons/utils/api";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { PriceValue, SmallText, StyledLink } from "./styles";

interface ITokenMinting {
  tokenId: string;
}

const TokenMinting: React.FC<ITokenMinting> = ({ tokenId }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<ITokenTopHolderTable>(`${API.TOKEN.LIST}/${tokenId}/mints`, { ...pageInfo, tokenId });

  const columns: Column<ITokenMintingTable>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => (
        <SmallText>{numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0)}</SmallText>
      ),
    },
    {
      title: "Trx Hash",
      key: "trxHash",
      minWidth: "200px",
      render: r => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      ),
    },
    {
      title: "Amount minted",
      key: "amountMinted",
      minWidth: "200px",
      render: r => (
        <PriceValue>
          <SmallText>{numberWithCommas(r.amount)}</SmallText>
        </PriceValue>
      ),
    },
    {
      title: "Time",
      key: "time",
      minWidth: "200px",
      render: r => <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>,
    },
  ];

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
      }}
      onClickRow={(_, r: ITokenMintingTable) => history.push(details.transaction(r.txHash))}
    />
  );
};

export default TokenMinting;
