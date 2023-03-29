import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet,
  numberWithCommas,
} from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import { Flex, Label, SmallText, PriceIcon, StyledLink, PriceValue } from "./styles";
import CustomTooltip from "../../../commons/CustomTooltip";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { details } from "../../../../commons/routers";
import { AIcon } from "../../../../commons/resources";
import { API } from "../../../../commons/utils/api";

const columns: Column<Transactions>[] = [
  {
    title: "#",
    key: "id",
    minWidth: "40px",
    render: (data, index) => <SmallText>{numberWithCommas(index + 1)}</SmallText>,
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
      </>
    ),
  },
  {
    title: "Time",
    key: "time",
    minWidth: "180px",

    render: r => <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>,
  },
  {
    title: "Block",
    key: "block",
    minWidth: "120px",
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
                <StyledLink to={details.address(r.addressesInput[0])}>{getShortWallet(r.addressesInput[0])}</StyledLink>
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
  },
  {
    title: "Output",
    minWidth: "120px",
    key: "ouput",
    render: r => (
      <PriceValue>
        <SmallText>{formatADAFull(r.totalOutput)}</SmallText>
        <PriceIcon src={AIcon} alt="a icon" />
      </PriceValue>
    ),
  },
];

const TokenTransaction: React.FC = () => {
  const params = useParams<{ address: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(`${API.ADDRESS.DETAIL}/${params.address}/txs`, pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ count: fetchData.total, title: "Total Transactions" }}
      onClickRow={(_, r: Transactions) => history.push(details.transaction(r.hash))}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
      }}
    />
  );
};

export default TokenTransaction;
