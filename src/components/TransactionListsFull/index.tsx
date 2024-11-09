import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADAFull, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { StyledLink, StyledContainer } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import ADAicon from "../commons/ADAIcon";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";
import { ApiReturnType } from "../../commons/connector/types/APIReturnType";

interface TransactionListFullProps {
  underline?: boolean;
  openDetail?: (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => void;
  selected?: number | null;
  showTitle?: boolean;
  txListResponse: ApiReturnType<Transaction[]> | undefined;
}

const TransactionListFull: React.FC<TransactionListFullProps> = ({
  underline = false,
  openDetail,
  showTitle = true,
  txListResponse
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const onClickRow = (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    if (openDetail) return openDetail(_, r);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transaction>[] = [
    {
      title: <Box data-testid="block.detail.trxTable.txhash">{t("glossary.txhash")}</Box>,
      key: "hash",
      minWidth: 120,

      render: (r, index) => (
        <div>
          <CustomTooltip title={r.tx.hash}>
            <StyledLink data-testid={`block.detail.trxTable.value.txhash#${index}`} to={details.transaction(r.tx.hash)}>
              {getShortHash(r.tx.hash)}
            </StyledLink>
          </CustomTooltip>
        </div>
      )
    },
    {
      title: <Box data-testid="block.detail.trxTable.createdAt">{t("createdAt")}</Box>,
      key: "createdat",
      minWidth: 120,
      render: (r) => (
        <DatetimeTypeTooltip>
          <Box color={({ palette }) => palette.secondary.light}>{r.tx.time || ""}</Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <Box data-testid="block.detail.trxTable.fees">{t("common.fees")}</Box>,
      key: "fee",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.tx.fee)}</Box>
          <ADAicon />
        </Box>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card
        title={
          showTitle ? (
            <Box display={"inline"} data-testid="header.table.transactions">
              {t("head.page.transactions")}
            </Box>
          ) : (
            ""
          )
        }
        underline={underline}
      >
        <Table
          data={txListResponse?.data || []}
          columns={columns}
          total={{ count: txListResponse?.total || 0, title: t("common.totalTxs") }}
          pagination={{
            ...pageInfo,
            total: txListResponse?.total || 0,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
            }
          }}
          onClickRow={onClickRow}
          rowKey="hash"
          className="transactions-table"
        />
      </Card>
    </StyledContainer>
  );
};

export default TransactionListFull;
