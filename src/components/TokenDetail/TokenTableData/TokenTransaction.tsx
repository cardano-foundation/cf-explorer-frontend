import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";
import moment from "moment";
import useFetchList from "../../../commons/hooks/useFetchList";
import { routers } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";
import { formatADA, getShortHash, getShortWallet } from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";
import { Flex, Label, SmallText, PriceIcon, StyledLink, PriceValue } from "./styles";
import CustomTooltip from "../../commons/CustomTooltip";

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
      render: (data, index) => <SmallText>{index + 1}</SmallText>,
    },
    {
      title: "Trx Hash",
      key: "trxhash",
      minWidth: "200px",

      render: r => (
        <>
          <CustomTooltip title={r.hash} placement="top">
            <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
          <br />
          <SmallText>{moment(r.time).format("MM/DD/YYYY HH:mm:ss")}</SmallText>
        </>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: "200px",
      render: r => (
        <>
          <StyledLink to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>{r.blockNo}</StyledLink>
          <br />
          <StyledLink to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}>{r.epochNo}</StyledLink>/
          <SmallText>{r.slot} </SmallText>
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
            <Flex>
              <Label>Input: </Label>
              <div>
                <CustomTooltip title={r.addressesInput[0]} placement="top">
                  <StyledLink to={routers.ADDRESS_DETAIL.replace(":address", `${r.addressesInput[0]}`)}>
                    {getShortWallet(r.addressesInput[0])}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesInput.length > 1 && (
                  <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`)}>...</StyledLink>
                )}
              </div>
            </Flex>
            <Flex>
              <Label>Output: </Label>
              <div>
                <CustomTooltip title={r.addressesOutput[0]} placement="top">
                  <StyledLink to={routers.ADDRESS_DETAIL.replace(":address", `${r.addressesOutput[0]}`)}>
                    {getShortWallet(r.addressesOutput[0])}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesOutput.length > 1 && (
                  <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`)}>...</StyledLink>
                )}
              </div>
            </Flex>
          </>
        );
      },
    },
    {
      title: "Fees",
      key: "fee",
      minWidth: "120px",
      render: r => (
        <PriceValue>
          <SmallText>{formatADA(r.fee) || 0}</SmallText>
          <PriceIcon src={AIcon} alt="a icon" />
        </PriceValue>
      ),
    },
    {
      title: "Output",
      minWidth: "120px",
      key: "ouput",
      render: r => (
        <PriceValue>
          <SmallText>{formatADA(r.totalOutput) || 0}</SmallText>
          <PriceIcon src={AIcon} alt="a icon" />
        </PriceValue>
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
