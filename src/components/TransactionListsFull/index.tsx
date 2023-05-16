import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import Card from "../commons/Card";
import DropdownTokens from "../commons/DropdownTokens";
import Table, { Column } from "../commons/Table";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet,
  numberWithCommas
} from "../../commons/utils/helper";
import sendImg from "../../commons/resources/images/sendImg.svg";
import receiveImg from "../../commons/resources/images/receiveImg.svg";
import { details } from "../../commons/routers";
import { Label, StyledLink, StyledContainer, Img } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import useFetchList from "../../commons/hooks/useFetchList";
import ADAicon from "../commons/ADAIcon";
import { SmallText } from "../share/styled";

interface TransactionListFullProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: any, r: Transactions, index: number) => void;
  selected?: number | null;
  showTitle?: boolean;
}

const TransactionListFull: React.FC<TransactionListFullProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
  showTitle = true
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);

  const onClickRow = (_: any, r: Transactions, index: number) => {
    if (openDetail) return openDetail(_, r, index);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (data, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0)
    },
    {
      title: "Tx Hash",
      key: "txhash",
      minWidth: 120,

      render: (transaction) => {
        const type = transaction?.balance >= 0 ? "up" : "down";
        return (
          <Box display={"flex"}>
            <Box width={50} display={transaction?.balance ? "" : "none"}>
              <Img src={type !== "up" ? receiveImg : sendImg} alt='send icon' />
            </Box>
            <Box display={"grid"}>
              <CustomTooltip title={transaction.hash}>
                <StyledLink to={details.transaction(transaction.hash)}>{getShortHash(transaction.hash)}</StyledLink>
              </CustomTooltip>
              <SmallText>{formatDateTimeLocal(transaction.time || "")}</SmallText>
            </Box>
          </Box>
        );
      }
    },
    {
      title: "Block",
      key: "block",
      minWidth: 120,
      render: (r) => (
        <Box>
          <Box>
            <StyledLink to={details.block(r.blockNo || r.blockHash)}>
              {r.blockNo || getShortHash(r.blockHash)}
            </StyledLink>
          </Box>
          <Box mt={1}>
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
          </Box>
        </Box>
      )
    },
    {
      title: "Fee",
      key: "fee",
      minWidth: 120,
      render: (r) => (
        <Box display='inline-flex' alignItems='center'>
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: "ADA amount",
      minWidth: 120,
      key: "totalOutput",
      render: (transaction) => {
        const isUp = transaction?.balance >= 0;
        return (
          <Box display='inline-flex' alignItems='center'>
            {
              transaction?.balance ? (
                <>
                  <Box mr={1} color={isUp ? "success.main" : "error.main"}>
                    {!isUp ? `- ` : `+ `}
                    {formatADAFull(transaction.balance)}
                  </Box>
                  <ADAicon />
                </>
              ) : null
            }
          </Box>
        );
      }
    },
    {
      title: "Token",
      minWidth: 120,
      key: "totalOutput",
      render: (transaction) => {
        const type = transaction?.balance >= 0 ? "up" : "down";
        let tokens: Token[] = [];
        if (transaction.tokens && transaction.tokens.length > 0) {
          tokens = transaction.tokens.map((token) => ({
            assetId: token.addressId.toString(),
            assetQuantity: token.quantity,
            assetName: token.displayName
          }));
        }
        return (
          <Box display={"flex"} alignItems={"center"}>
            {transaction.tokens && transaction.tokens.length > 0 && <DropdownTokens tokens={tokens} type={type} />}
          </Box>
        );
      }
    }
  ];

  return (
    <StyledContainer>
      <Card title={showTitle ? "Transactions" : ""} underline={underline}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: "Total Transactions" }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) })
          }}
          onClickRow={onClickRow}
          selected={selected}
          className='transactions-table'
        />
      </Card>
    </StyledContainer>
  );
};

export default TransactionListFull;
