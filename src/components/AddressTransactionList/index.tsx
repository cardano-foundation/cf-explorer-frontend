import { Box } from "@mui/material";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../commons/hooks/useFetchList";
import { useScreen } from "../../commons/hooks/useScreen";
import { details } from "../../commons/routers";
import { API } from "../../commons/utils/api";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  numberWithCommas
} from "../../commons/utils/helper";
import ADAicon from "../commons/ADAIcon";
import Card from "../commons/Card";
import CustomTooltip from "../commons/CustomTooltip";
import DropdownTokens from "../commons/DropdownTokens";
import Table, { Column } from "../commons/Table";
import { SmallText } from "../share/styled";
import { StyledLink } from "./styles";

interface AddressTransactionListProps {
  underline?: boolean;
  openDetail?: (_: any, transaction: Transactions, index: number) => void;
  selected?: number | null;
  showTabView?: boolean;
  address: string
}

const AddressTransactionList: React.FC<AddressTransactionListProps> = ({
  underline = false,
  address,
  openDetail,
  selected,
  showTabView,
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const url = `${API.ADDRESS.DETAIL}/${address}/txs`;
  const fetchData = useFetchList<Transactions>(url, { ...pageInfo });
  const onClickRow = (_: any, transaction: Transactions, index: number) => {
    if (openDetail) return openDetail(_, transaction, index);
    history.push(details.transaction(transaction.hash));
  };
  const { isMobile } = useScreen();

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
      minWidth: isMobile ? 190 : 120,

      render: transaction => (
        <Box display={"grid"}>
          <CustomTooltip title={transaction.hash}>
            <StyledLink to={details.transaction(transaction.hash)}>{getShortHash(transaction.hash)}</StyledLink>
          </CustomTooltip>
          <SmallText>{formatDateTimeLocal(transaction.time || "")}</SmallText>
        </Box>
      ),
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
      title: "Fees",
      key: "fee",
      minWidth: 120,
      render: transaction => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(transaction.fee)}</Box>
          <ADAicon />
        </Box>
      ),
    },
    {
      title: "ADA amount",
      minWidth: 120,
      key: "totalOutput",
      render: transaction => {
        const isUp = transaction.addressesOutput.includes(address);
        return (
          <Box display="inline-flex" alignItems="center">
            <Box mr={1} color={
              isUp ? "success.main" : "error.main"
            }>{!isUp ? `- ` : `+ `}{formatADAFull(transaction.totalOutput)}</Box>
            <ADAicon />
          </Box>
        )
      },
    },
    {
      title: "Token",
      minWidth: 120,
      key: "totalOutput",
      render: transaction => {
        const type = transaction.addressesOutput.includes(address) ? "up" : "down";
        return (
          <Box display={"flex"} alignItems={'center'}>
            {transaction.tokens && transaction.tokens.length > 0 && (
              <DropdownTokens tokens={transaction.tokens} type={type} />
            )}
          </Box>
        )
      },
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
        showTabView={showTabView}
      />
    </Card>
  );
};

export default AddressTransactionList;
