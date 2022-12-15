import { Tooltip } from "@mui/material";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";
import moment from "moment";
import { BiLinkExternal } from "react-icons/bi";

import useFetchList from "../../../commons/hooks/useFetchList";
import { routers } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";
import { formatADA, getShortHash, getShortWallet } from "../../../commons/utils/helper";

import Table, { Column } from "../../commons/Table";

import { Transaction } from "./styles";

interface ITokenTransaction {
  active: boolean;
  tokenId: string;
}

const TokenTransaction: React.FC<ITokenTransaction> = ({ active, tokenId }) => {
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
  } = useFetchList<Transactions>(active ? "tx/list" : "", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
    tokenId: tokenId,
  });

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => <Transaction.TransactionIndex>{index + 1}</Transaction.TransactionIndex>,
    },
    {
      title: "Trx Hash",
      key: "trxhash",
      minWidth: "200px",

      render: r => (
        <>
          <Tooltip title={r.hash} placement="top">
            <Transaction.TransactionHash to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.hash)}>
              {getShortHash(r.hash)}
            </Transaction.TransactionHash>
          </Tooltip>
          <div>{moment(r.time).format("MM/DD/YYYY HH:mm:ss")}</div>
        </>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: "200px",
      render: r => (
        <>
          <Transaction.TransactionHash to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>
            {r.blockNo}
          </Transaction.TransactionHash>
          <div style={{ display: "flex" }}>
            <Transaction.TransactionHash to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}>
              {r.epochNo}
            </Transaction.TransactionHash>
            / {r.slot}
          </div>
        </>
      ),
    },
    {
      title: "Addresses",
      key: "addresses",
      minWidth: "200px",
      render(r, index) {
        return (
          <>
            <Transaction.TransactionAddressInput>
              <Transaction.TransactionAddressTitle>Input: </Transaction.TransactionAddressTitle>
              <div>
                {r.addressesInput.slice(0, 2).map((tx, key) => (
                  <Tooltip key={key} title={tx} placement="top">
                    <Transaction.TransactionHash to={`#`} key={key}>
                      {getShortWallet(tx)}
                      <BiLinkExternal style={{ marginLeft: 8 }} />
                    </Transaction.TransactionHash>
                  </Tooltip>
                ))}
                {r.addressesInput.length > 2 && <Transaction.TransactionHash to={`#`}>...</Transaction.TransactionHash>}
              </div>
            </Transaction.TransactionAddressInput>
            <Transaction.TransactionAddressOutput>
              <Transaction.TransactionAddressTitle>Output: </Transaction.TransactionAddressTitle>
              <div>
                {r.addressesOutput.slice(0, 2).map((tx, key) => (
                  <Tooltip key={key} title={tx} placement="top">
                    <Transaction.TransactionHash to={`#`} key={key}>
                      {getShortWallet(tx)}
                      <BiLinkExternal style={{ marginLeft: 8 }} />
                    </Transaction.TransactionHash>
                  </Tooltip>
                ))}
                {r.addressesOutput.length > 2 && (
                  <Transaction.TransactionHash to={`#`}>...</Transaction.TransactionHash>
                )}
              </div>
            </Transaction.TransactionAddressOutput>
          </>
        );
      },
    },
    {
      title: "Fees",
      key: "fee",
      minWidth: "120px",
      render: r => (
        <Transaction.TransactionFee>
          {formatADA(r.fee) || 0}
          <Transaction.StyledImg src={AIcon} alt="a icon" />
        </Transaction.TransactionFee>
      ),
    },
    {
      title: "Output",
      minWidth: "120px",
      key: "ouput",
      render: r => (
        <Transaction.TransactionOutput>
          {formatADA(r.totalOutput) || 0}
          <Transaction.StyledImg src={AIcon} alt="a icon" />
        </Transaction.TransactionOutput>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={transactions}
      total={{ count: total, title: "Total Transactions" }}
      loading={transactionsLoading}
      initialized={initialized}
      onClickRow={(_, r: Transactions) => history.push(routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`))}
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

export default TokenTransaction;
