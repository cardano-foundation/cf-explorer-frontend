import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet,
  numberWithCommas,
} from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { AIcon } from "../../commons/resources";
import { StyledLink } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import useFetchList from "../../commons/hooks/useFetchList";
import { SmallText } from "../share/styled";

interface AddressTransactionListProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: any, transaction: Transactions, index: number) => void;
  selected?: number | null;
}

const AddressTransactionList: React.FC<AddressTransactionListProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);

  const onClickRow = (_: any, transaction: Transactions, index: number) => {
    if (openDetail) return openDetail(_, transaction, index);
    history.push(details.transaction(transaction.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (data, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1),
    },
    {
      title: "Trx Hash",
      key: "trxhash",
      minWidth: 120,

      render: transaction => (
        <div>
          <CustomTooltip title={transaction.hash}>
            <StyledLink to={details.transaction(transaction.hash)}>{getShortHash(transaction.hash)}</StyledLink>
          </CustomTooltip>
        </div>
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
      minWidth: 120,
      render: transaction => (
        <>
          <StyledLink to={details.block(transaction.blockNo)}>{transaction.blockNo}</StyledLink>
          <br />
          <StyledLink to={details.epoch(transaction.epochNo)}>{transaction.epochNo}</StyledLink>/
          <SmallText>{transaction.epochSlotNo} </SmallText>
        </>
      ),
    },
    {
      title: "Addresses",
      key: "address",
      minWidth: 120,
      render(transaction, index) {
        return (
          <div>
            <Box display={"flex"}>
              <Box width="50px"> Input: </Box>
              <div>
                {transaction.addressesInput.slice(0, 1).map((tx, key) => {
                  return (
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)}>{getShortWallet(tx)}</StyledLink>
                    </CustomTooltip>
                  );
                })}
                <Box>
                  {transaction.addressesInput.length > 1 && (
                    <StyledLink to={details.transaction(transaction.hash)}> ...</StyledLink>
                  )}
                </Box>
              </div>
            </Box>
            <Box display={"flex"} mt={1}>
              <Box width="50px">Output: </Box>
              <div>
                {transaction.addressesOutput.slice(0, 1).map((tx, key) => {
                  return (
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)}>{getShortWallet(tx)}</StyledLink>
                    </CustomTooltip>
                  );
                })}
                <Box>
                  {transaction.addressesOutput.length > 1 && (
                    <StyledLink to={details.transaction(transaction.hash)}> ...</StyledLink>
                  )}
                </Box>
              </div>
            </Box>
          </div>
        );
      },
    },
    {
      title: "Fees",
      key: "fee",
      minWidth: 120,
      render: transaction => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(transaction.fee)}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      ),
    },
    {
      title: "Output",
      minWidth: 120,
      key: "ouput",
      render: transaction => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(transaction.totalOutput)}</Box>
          <img src={AIcon} alt="a icon" />
        </Box>
      ),
    },
  ];

  return (
    <Card title={"Transactions"} underline={underline}>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total Transactions" }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        }}
        onClickRow={onClickRow}
        selected={selected}
      />
    </Card>
  );
};

export default AddressTransactionList;
