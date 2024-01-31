import { Box, useTheme } from "@mui/material";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { MouseEvent } from "react";

import useFetchList from "src/commons/hooks/useFetchList";
import { DownRedUtxoDarkmode, TransferIcon, UpGreenUtxoDarkmode } from "src/commons/resources";
import receiveImg from "src/commons/resources/images/receiveImg.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownTokens, { TokenLink } from "src/components/commons/DropdownTokens";
import Table, { Column } from "src/components/commons/Table";

import { Img, StyledContainer, StyledLink } from "./styles";

const TransactionTab: React.FC<{ stakeAddress?: string }> = ({ stakeAddress }) => {
  return <TransactionListFull url={`${API.STAKE.DETAIL}/${stakeAddress}/txs`} showTitle={false} />;
};

interface TransactionListFullProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => void;
  selected?: string | null;
  showTitle?: boolean;
}

const TransactionListFull: React.FC<TransactionListFullProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
  showTitle = true
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);
  const theme = useTheme();

  const onClickRow = (e: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    let parent: Element | null = e.target as Element;
    while (
      parent !== null &&
      typeof parent?.className.includes === "function" &&
      !parent?.className.includes("MuiPopover-root")
    ) {
      parent = parent?.parentElement;
    }
    if (parent) {
      return;
    }
    if (openDetail) return openDetail(e, r);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: t("glossary.txHash"),
      key: "hash",
      minWidth: 120,

      render: (transaction) => {
        const type = transaction?.balance >= 0 ? "up" : "down";
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
              <Box width={50} display={transaction?.balance !== null ? "" : "none"}>
                <Img
                  src={
                    type !== "up"
                      ? theme.isDark
                        ? DownRedUtxoDarkmode
                        : receiveImg
                      : theme.isDark
                      ? UpGreenUtxoDarkmode
                      : sendImg
                  }
                  alt="send icon"
                />
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
      title: t("glossary.createdAt"),
      key: "created_at",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatDateTimeLocal(r.time || "")}</Box>
        </Box>
      )
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: 50,
      render: (r) => (
        <StyledLink to={details.block(r.blockNo || r.blockHash)}>{r.blockNo || getShortHash(r.blockHash)}</StyledLink>
      )
    },
    {
      title: t("glossary.epoch"),
      key: "epochNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
    },
    {
      title: t("glossary.slot"),
      key: "epochSlotNo",
      minWidth: "50px"
    },
    {
      title: t("glossary.absoluteSlot"),
      key: "slot",
      minWidth: "100px"
    },
    {
      title: t("fees"),
      key: "fee",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: t("glossary.adaAmount"),
      minWidth: 120,
      key: "totalOutput",
      render: (transaction) => {
        const isUp = transaction?.balance >= 0;
        let colorTheme: string;
        if (isUp) {
          colorTheme = theme.palette.success[800];
          if (theme.mode === "dark") {
            colorTheme = theme.palette.success[700];
          }
        } else {
          colorTheme = theme.palette.error[700];
        }
        return (
          <Box display="inline-flex" alignItems="center">
            {transaction?.balance ? (
              <>
                <Box mr={1} color={colorTheme}>
                  {!isUp ? `` : `+`}
                  {formatADAFull(transaction.balance)}
                </Box>
                <ADAicon />
              </>
            ) : null}
          </Box>
        );
      }
    },
    {
      title: t("glossary.Token"),
      minWidth: 120,
      key: "totalOutput",
      render: (transaction) => {
        const type = transaction?.balance >= 0 ? "up" : "down";
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
            {transaction.tokens && transaction.tokens.length === 1 && <TokenLink isSuccess={true} token={tokens[0]} />}
            {transaction.tokens && transaction.tokens.length > 1 && (
              <DropdownTokens isSuccess={true} tokens={tokens} type={type} hideInputLabel hideMathChar />
            )}
          </Box>
        );
      }
    }
  ];

  return (
    <StyledContainer>
      <Card title={showTitle ? t("tab.transactions") : ""} underline={underline}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: "Total Transactions" }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.replace({ search: stringify({ page, size }) }, history.location.state)
          }}
          onClickRow={onClickRow}
          rowKey="hash"
          selected={selected}
          className="transactions-table"
        />
      </Card>
    </StyledContainer>
  );
};

export default TransactionTab;
