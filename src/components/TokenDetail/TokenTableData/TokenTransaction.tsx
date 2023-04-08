import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet,
  numberWithCommas,
} from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";
import { Flex, Label, SmallText, PriceIcon, StyledLink, PriceValue } from "./styles";
import CustomTooltip from "../../commons/CustomTooltip";
import { API } from "../../../commons/utils/api";

interface ITokenTransaction {
  active: boolean;
  tokenId: string;
}

const TokenTransaction: React.FC<ITokenTransaction> = ({ active, tokenId }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<Transactions>(API.TOKEN.TOKEN_TRX.replace(":tokenId", tokenId), { ...pageInfo, sort });

  const columns: Column<Transactions>[] = [
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
      key: "trxhash",
      minWidth: "200px",

      render: r => (
        <>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
          <br />
          <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>
        </>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: "200px",
      render: r => (
        <>
          <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
          <br />
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/<SmallText>{r.epochSlotNo} </SmallText>
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
                <CustomTooltip title={r.addressesInput[0]}>
                  <StyledLink to={details.address(r.addressesInput[0])}>
                    {getShortWallet(r.addressesInput[0])}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesInput.length > 1 && <StyledLink to={details.transaction(r.hash)}>...</StyledLink>}
              </div>
            </Flex>
            <Flex>
              <Label>Output: </Label>
              <div>
                <CustomTooltip title={r.addressesOutput[0]}>
                  <StyledLink to={details.address(r.addressesOutput[0])}>
                    {getShortWallet(r.addressesOutput[0])}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesOutput.length > 1 && <StyledLink to={details.transaction(r.hash)}>...</StyledLink>}
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
          <SmallText>{formatADAFull(r.fee)}</SmallText>
          <PriceIcon src={AIcon} alt="a icon" />
        </PriceValue>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Output",
      minWidth: "120px",
      key: "outSum",
      render: r => (
        <PriceValue>
          <SmallText>{formatADAFull(r.totalOutput)}</SmallText>
          <PriceIcon src={AIcon} alt="a icon" />
        </PriceValue>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
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
      onClickRow={(_, r: Transactions) => history.push(details.transaction(r.hash))}
    />
  );
};

export default TokenTransaction;
