import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { StyledLink, StyledContainer } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import useFetchList from "../../commons/hooks/useFetchList";
import ADAicon from "../commons/ADAIcon";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";

interface TransactionListFullProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => void;
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
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);

  const onClickRow = (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    if (openDetail) return openDetail(_, r);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: <Box data-testid="block.detail.trxTable.txhash">{t("glossary.txhash")}</Box>,
      key: "hash",
      minWidth: 120,

      render: (r, index) => (
        <div>
          <CustomTooltip title={r.hash}>
            <StyledLink data-testid={`block.detail.trxTable.value.txhash#${index}`} to={details.transaction(r.hash)}>
              {getShortHash(r.hash)}
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
          <Box color={({ palette }) => palette.secondary.light}>{formatDateTimeLocal(r.time || "")}</Box>
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <Box data-testid="block.detail.trxTable.fees">{t("common.fees")}</Box>,
      key: "fee",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
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
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: t("common.totalTxs") }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
            }
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

export default TransactionListFull;
