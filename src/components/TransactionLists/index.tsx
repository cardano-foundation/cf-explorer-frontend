import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { useRef, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { formatADAFull, formatDateTimeLocal, formatNameBlockNo, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";
import usePageInfo from "src/commons/hooks/usePageInfo";

import CustomTooltip from "../commons/CustomTooltip";
import ADAicon from "../commons/ADAIcon";
import FormNowMessage from "../commons/FormNowMessage";
import Table, { Column } from "../commons/Table";
import Card from "../commons/Card";
import { Actions, StyledLink, TimeDuration } from "./styles";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";

interface TransactionListProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => void;
  selected?: string | null;
  showTabView?: boolean;
  handleClose: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
  showTabView,
  handleClose
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { pageInfo, setSort } = usePageInfo();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const fetchData = useFetchList<Transactions>(url, { ...pageInfo }, false, blockKey);
  const mainRef = useRef(document.querySelector("#main"));

  const onClickRow = (e: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    if (openDetail) return openDetail(e, r);
    if ("href" in e.target) {
      e.stopPropagation();
      return;
    }
    history.push(details.transaction(r.hash));
  };

  const { error } = fetchData;
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
            <DatetimeTypeTooltip>{formatDateTimeLocal(r.time || "")}</DatetimeTypeTooltip>
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
      title: <Box data-testid="transactions.table.title.slot">{t("glossary.slot")}</Box>,
      key: "epochSlotNo",
      minWidth: 60,
      render: (r, index) => <Box data-testid={`transactions.table.value.slot#${index}`}>{r.epochSlotNo}</Box>
    },
    {
      title: t("glossary.absoluteSlot"),
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
            <FormNowMessage time={fetchData.lastUpdated} />
          </TimeDuration>
        </Actions>
      )}
      <Table
        {...fetchData}
        columns={columns}
        maxHeight={"unset"}
        total={{ count: fetchData.total, title: t("common.totalTxs") }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
          },
          handleCloseDetailView: handleClose,
          hideLastPage: true
        }}
        onClickRow={onClickRow}
        rowKey="hash"
        selected={selected}
        showTabView={showTabView}
        tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
      />
    </Card>
  );
};

export default TransactionList;
