import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { useRef, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { formatADAFull, formatDateTimeLocal, formatNameBlockNo, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import usePageInfo from "src/commons/hooks/usePageInfo";
import { TooltipIcon } from "src/commons/resources";

import CustomTooltip from "../commons/CustomTooltip";
import ADAicon from "../commons/ADAIcon";
import FormNowMessage from "../commons/FormNowMessage";
import Table, { Column } from "../commons/Table";
import Card from "../commons/Card";
import { Actions, StyledLink, TimeDuration } from "./styles";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";
import { Capitalize } from "../commons/CustomText/styles";
import { ApiConnector } from "../../commons/connector/ApiConnector";
import { ApiReturnType } from "../../commons/connector/types/APIReturnType";

interface TransactionListProps {
  underline?: boolean;
  openDetail?: (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => void;
  selected?: string | null;
  showTabView?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ underline = false, selected, showTabView }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();

  const [transactions, setTransactions] = useState<ApiReturnType<Transactions[]> | undefined>();
  const apiConnector: ApiConnector = ApiConnector.getApiConnector();
  apiConnector.getTransactions().then((data) => {
    setTransactions(data);
  });

  // const fetchData = useFetchList<Transactions>(url, { ...pageInfo }, false, blockKey);
  const mainRef = useRef(document.querySelector("#main"));
  const onClickRow = (e: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    if (e.target instanceof HTMLAnchorElement || (e.target instanceof Element && e.target.closest("a"))) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    history.push(details.transaction(r.hash));
  };

  const { error } = transactions || {};
  const columns: Column<Transactions>[] = [
    {
      title: <Box data-testid="transactions.table.title.txhash">{t("glossary.txhash")}</Box>,
      key: "hash",
      minWidth: 120,

      render: (r, index) => (
        <div>
          <CustomTooltip title={r.hash}>
            <StyledLink data-testid={`transaction.table.value.txhash#${index}`} to={details.transaction(r.hash)}>
              {getShortHash(r.hash)}
            </StyledLink>
          </CustomTooltip>
          <Box mt={1} color={({ palette }) => palette.secondary.light}>
            <DatetimeTypeTooltip>{r.time}</DatetimeTypeTooltip>
          </Box>
        </div>
      )
    },
    {
      title: <Box data-testid="transactions.table.title.block">{t("glossary.block")}</Box>,
      key: "block",
      minWidth: 50,
      render: (r, index) => {
        const { blockName, tooltip } = formatNameBlockNo(r.blockNo, r.epochNo) || getShortHash(r.blockHash);
        return (
          <StyledLink
            to={details.block(r.blockNo || r.blockHash)}
            data-testid={`transactions.table.block#${r.blockNo}`}
          >
            <CustomTooltip title={tooltip}>
              <span data-testid={`transaction.table.value.block#${index}`}>{blockName}</span>
            </CustomTooltip>
          </StyledLink>
        );
      }
    },
    {
      title: <Box data-testid="transactions.table.title.epoch">{t("glossary.epoch")}</Box>,
      key: "epochNo",
      minWidth: 60,
      render: (r, index) => (
        <StyledLink to={details.epoch(r.epochNo)}>
          <span data-testid={`transactions.table.value.epoch#${index}`}>{r.epochNo}</span>
        </StyledLink>
      )
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Capitalize data-testid="transactions.table.title.slot">{t("glossary.slot")}</Capitalize>
          <CustomTooltip title={t("common.explainSlot")}>
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "epochSlotNo",
      minWidth: 60,
      render: (r, index) => <Box data-testid={`transactions.table.value.slot#${index}`}>{r.epochSlotNo}</Box>
    },
    {
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Capitalize>{t("glossary.absoluteSlot")}</Capitalize>{" "}
          <CustomTooltip title={t("common.absoluteSlot")}>
            <p>
              <TooltipIcon />
            </p>
          </CustomTooltip>
        </Box>
      ),
      key: "slot",
      minWidth: 60
    },
    {
      title: (
        <Box data-testid="transactions.table.title.fees" component={"span"}>
          {t("common.fees")}
        </Box>
      ),
      key: "fee",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
          <ADAicon />
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];
  const { pathname } = window.location;
  return (
    <Card
      data-testid="transactions-card"
      title={pathname?.includes("/transactions") ? "Transactions" : ""}
      underline={underline}
    >
      {!error && (
        <Actions>
          <TimeDuration>
            <FormNowMessage time={transactions?.lastUpdated || 0} />
          </TimeDuration>
        </Actions>
      )}
      <Table
        data={transactions?.data || []}
        columns={columns}
        maxHeight={"unset"}
        total={{ count: transactions?.total || 0, title: t("common.totalTxs") }}
        pagination={{
          ...pageInfo,
          total: transactions?.total || 0,
          onChange: (page, size) => {
            mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
          },
          hideLastPage: true
        }}
        onClickRow={onClickRow}
        rowKey="hash"
        showTabView={showTabView}
        tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
      />
    </Card>
  );
};

export default TransactionList;
