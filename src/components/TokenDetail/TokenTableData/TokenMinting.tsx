import { Tooltip } from "@mui/material";
import moment from "moment";
import { parse, stringify } from "qs";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../../commons/hooks/useFetchList";
import { AIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatADA, getShortHash, numberWithCommas } from "../../../commons/utils/helper";

import Table, { Column } from "../../commons/Table";

import { Minting, PriceValue, SmallText, StyledLink, PriceIcon } from "./styles";

interface ITokenMinting {
  active: boolean;
  tokenId: string;
}

const TokenMinting: React.FC<ITokenMinting> = ({ active, tokenId }) => {
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
  } = useFetchList<ITokenTopHolderTable>(active ? `tokens/${tokenId}/mints` : "", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
    tokenId: tokenId,
  });

  const columns: Column<ITokenMintingTable>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => <SmallText>{index + 1}</SmallText>,
    },
    {
      title: "Trx Hash",
      key: "trxHash",
      minWidth: "200px",
      render: r => (
        <Tooltip title={r.txHash} placement="top">
          <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.txHash)}>
            {getShortHash(r.txHash)}
          </StyledLink>
        </Tooltip>
      ),
    },
    {
      title: "Amount minted",
      key: "amountMinted",
      minWidth: "200px",
      render: r => (
        <PriceValue>
          <SmallText>{numberWithCommas(r.amount) || 0}</SmallText>
          <PriceIcon src={AIcon} alt="a icon" />
        </PriceValue>
      ),
    },
    {
      title: "Time",
      key: "time",
      minWidth: "200px",
      render: r => <SmallText>{moment(r.time).format("MM/DD/YYYY HH:mm:ss")}</SmallText>,
    },
  ];

  return (
    <Table
      columns={columns}
      data={transactions}
      total={{ count: total, title: "Total Minting" }}
      loading={transactionsLoading}
      initialized={initialized}
      onClickRow={(_, r: ITokenMintingTable) => history.push(routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.txHash}`))}
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

export default TokenMinting;
