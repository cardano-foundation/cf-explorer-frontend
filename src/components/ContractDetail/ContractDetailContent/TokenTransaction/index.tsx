import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import moment from "moment";
import { formatADA, getPageInfo, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import Table, { Column } from "../../../commons/Table";
import { Flex, Label, SmallText, PriceIcon, StyledLink, PriceValue } from "./styles";
import CustomTooltip from "../../../commons/CustomTooltip";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { details } from "../../../../commons/routers";
import { AIcon } from "../../../../commons/resources";

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
          <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
        </CustomTooltip>
        <br />
        <SmallText>{moment(r.time).format("MM/DD/YYYY HH:mm:ss")}</SmallText>
      </>
    ),
  },
  {
    title: "Time",
    key: "time",
    minWidth: "200px",

    render: r => <SmallText>{moment(r.time).format("MM/DD/YYYY HH:mm:ss")}</SmallText>,
  },
  {
    title: "Block",
    key: "block",
    minWidth: "200px",
    render: r => (
      <>
        <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
        <br />
        <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/<SmallText>{r.slot} </SmallText>
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
                <StyledLink to={details.address(r.addressesInput[0])}>{getShortWallet(r.addressesInput[0])}</StyledLink>
              </CustomTooltip>
              <br />
              {r.addressesInput.length > 1 && <StyledLink to={details.transaction(r.hash)}>...</StyledLink>}
            </div>
          </Flex>
          <Flex>
            <Label>Output: </Label>
            <div>
              <CustomTooltip title={r.addressesOutput[0]} placement="top">
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

const TokenTransaction: React.FC = () => {
  const params = useParams<{ address: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(`address/${params.address}/txs`, pageInfo);

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
