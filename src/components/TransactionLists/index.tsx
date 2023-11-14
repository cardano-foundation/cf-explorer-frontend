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
import SelectedIcon from "../commons/SelectedIcon";
import ADAicon from "../commons/ADAIcon";
import FormNowMessage from "../commons/FormNowMessage";
import Table, { Column } from "../commons/Table";
import Card from "../commons/Card";
import { Actions, StyledLink, TimeDuration } from "./styles";

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
  const onClickRow = (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    if (openDetail) return openDetail(_, r);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: t("glossary.txhash"),
      key: "hash",
      minWidth: 120,

      render: (r) => (
        <div>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
          <Box mt={1} color={({ palette }) => palette.secondary.light}>
            {formatDateTimeLocal(r.time || "")}
          </Box>
        </div>
      )
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: 50,
      render: (r) => {
        const { blockName, tooltip } = formatNameBlockNo(r.blockNo, r.epochNo) || getShortHash(r.blockHash);
        return (
          <StyledLink to={details.block(r.blockNo || r.blockHash)}>
            <CustomTooltip title={tooltip}>
              <span>{blockName}</span>
            </CustomTooltip>
          </StyledLink>
        );
      }
    },
    {
      title: t("glossary.epoch"),
      key: "epochNo",
      minWidth: 60,
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
    },
    {
      title: t("glossary.slot"),
      key: "epochSlotNo",
      minWidth: 60,
      render: (r) => r.epochSlotNo
    },
    {
      title: t("glossary.absoluteSlot"),
      key: "slot",
      minWidth: 60
    },
    {
      title: t("common.fees"),
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
    },
    {
      title: t("glossary.outputInAda"),
      minWidth: 120,
      key: "outSum",
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.totalOutput)}</Box>
          <ADAicon />
          {selected === r.hash && <SelectedIcon />}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: t("glossary.inputAddress"),
      key: "addressesInput",
      minWidth: 120,
      render: (r) => (
        <Box key={r.hash + "input"}>
          {r?.addressesInput?.slice(0, 2).map((address) => (
            <Box key={address}>
              <CustomTooltip title={address}>
                <StyledLink to={details.address(address)}>{getShortHash(address)}</StyledLink>
              </CustomTooltip>
            </Box>
          ))}
          {r?.addressesInput?.length > 2 ? <StyledLink to={details.transaction(r.hash)}>...</StyledLink> : ""}
        </Box>
      )
    },
    {
      title: t("glossary.outpuAddress"),
      key: "addressesOutput",
      minWidth: 120,
      render: (r) => (
        <Box key={r.hash + "output"}>
          {r?.addressesOutput?.slice(0, 2).map((address) => (
            <Box key={address}>
              <CustomTooltip title={address}>
                <StyledLink to={details.address(address)}>{getShortHash(address)}</StyledLink>
              </CustomTooltip>
            </Box>
          ))}
          {r?.addressesOutput?.length > 2 ? <StyledLink to={details.transaction(r.hash)}>...</StyledLink> : ""}
        </Box>
      )
    }
  ];
  const { pathname } = window.location;
  return (
    <Card
      data-testid="transactions-card"
      title={pathname?.includes("/transactions") ? "Transactions" : ""}
      underline={underline}
    >
      <Actions>
        <TimeDuration>
          <FormNowMessage time={fetchData.lastUpdated} />
        </TimeDuration>
      </Actions>
      <Table
        {...fetchData}
        columns={columns}
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
