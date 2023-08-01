import { Box, useTheme } from "@mui/material";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";

import receiveImg from "src/commons/resources/images/receiveImg.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import useFetchList from "src/commons/hooks/useFetchList";
import { useScreen } from "src/commons/hooks/useScreen";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  numberWithCommas
} from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownTokens, { TokenLink } from "src/components/commons/DropdownTokens";
import Table, { Column } from "src/components/commons/Table";
import { SmallText } from "src/components/share/styled";
import { TransferIcon } from "src/commons/resources";

import { Img, StyledLink } from "./styles";
import { TextCardHighlight } from "../AddressDetail/AddressAnalytics/styles";

interface AddressTransactionListProps {
  underline?: boolean;
  openDetail?: (_: any, transaction: Transactions, index: number) => void;
  selected?: number | null;
  showTabView?: boolean;
  address: string;
}

const AddressTransactionList: React.FC<AddressTransactionListProps> = ({
  underline = false,
  address,
  openDetail,
  selected,
  showTabView
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const url = `${API.ADDRESS.DETAIL}/${address}/txs`;
  const theme = useTheme();
  const fetchData = useFetchList<Transactions>(url, { ...pageInfo });
  const onClickRow = (e: any, transaction: Transactions, index: number) => {
    let parent: Element | null = e.target as Element;
    while (parent !== null && !parent?.className.includes("MuiPopover-root")) {
      parent = parent?.parentElement;
    }
    if (parent) {
      return;
    }
    if (openDetail) return openDetail(e, transaction, index);
    history.push(details.transaction(transaction.hash));
  };
  const { isMobile } = useScreen();

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 14,
      render: (data, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1)
    },
    {
      title: "Tx Hash",
      key: "trxhash",
      minWidth: isMobile ? 190 : 120,

      render: (transaction) => {
        const type = transaction.balance >= 0 ? "up" : "down";
        const isTransferType = transaction?.tokens.some((t) => {
          return (t.quantity < 0 && transaction?.balance >= 0) || (t.quantity >= 0 && transaction?.balance < 0);
        });
        return (
          <Box display={"flex"} alignItems={"center"}>
            {isTransferType ? (
              <Box width={40} ml={"2px"} mr={"8px"}>
                <TransferIcon style={{ scale: "1.15" }} />
              </Box>
            ) : (
              <Box width={50} display={transaction?.balance === null ? "none" : ""}>
                <Img src={type !== "up" ? receiveImg : sendImg} alt="send icon" />
              </Box>
            )}
            <CustomTooltip title={transaction.hash}>
              <StyledLink to={details.transaction(transaction.hash)}>{getShortHash(transaction.hash)}</StyledLink>
            </CustomTooltip>
          </Box>
        );
      }
    },
    {
      title: "Created At",
      key: "created_at",
      minWidth: 120,
      render: (transaction) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatDateTimeLocal(transaction.time || "")}</Box>
        </Box>
      )
    },
    {
      title: "Block",
      key: "block",
      minWidth: 120,
      render: (transaction) => (
        <>
          <StyledLink to={details.block(transaction.blockNo)}>{transaction.blockNo}</StyledLink>
          <br />
          <StyledLink to={details.epoch(transaction.epochNo)}>{transaction.epochNo}</StyledLink>/
          <SmallText>{transaction.epochSlotNo} </SmallText>
        </>
      )
    },
    {
      title: "Fees",
      key: "fee",
      minWidth: 120,
      render: (transaction) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(transaction.fee)}</Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: "ADA amount",
      minWidth: 120,
      key: "totalOutput",
      render: (transaction) => {
        const isUp = transaction.balance >= 0;
        return (
          <Box display="inline-flex" alignItems="center">
            <Box mr={1} color={isUp ? theme.palette.success[800] : theme.palette.error[700]}>
              {!isUp ? `` : `+`}
              {formatADAFull(transaction.balance)}
            </Box>
            <ADAicon />
          </Box>
        );
      }
    },
    {
      title: "Token",
      minWidth: 120,
      key: "totalOutput",
      render: (transaction) => {
        const type = transaction.balance >= 0 ? "up" : "down";
        let tokens: Token[] = [];
        if (transaction.tokens && transaction.tokens.length > 0) {
          tokens = transaction.tokens.map((token) => ({
            assetId: token.fingerprint,
            assetQuantity: token.quantity,
            assetName: token.displayName
          }));
        }
        return (
          <Box display={"flex"} alignItems={"center"}>
            {transaction.tokens && transaction.tokens.length === 1 && <TokenLink token={tokens[0]} />}
            {transaction.tokens && transaction.tokens.length > 1 && (
              <DropdownTokens tokens={tokens} type={type} hideInputLabel />
            )}
          </Box>
        );
      }
    }
  ];

  return (
    <Card title={<TextCardHighlight>Transactions</TextCardHighlight>} underline={underline}>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total Transactions" }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) }),
          hideLastPage: true
        }}
        onClickRow={onClickRow}
        selected={selected}
        showTabView={showTabView}
      />
    </Card>
  );
};

export default AddressTransactionList;
