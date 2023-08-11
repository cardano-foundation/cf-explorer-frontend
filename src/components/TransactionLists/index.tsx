import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { useState, useRef } from "react";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet
} from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { StyledLink } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import useFetchList from "../../commons/hooks/useFetchList";
import SelectedIcon from "../commons/SelectedIcon";
import ADAicon from "../commons/ADAIcon";

interface TransactionListProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: any, r: Transactions, index: number) => void;
  selected?: number | null;
  showTabView?: boolean;
  hash?: string | null;
  handleClose: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
  showTabView,
  hash,
  handleClose
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");
  const fetchData = useFetchList<Transactions>(url, { ...pageInfo, sort });
  const mainRef = useRef(document.querySelector("#main"));
  const onClickRow = (_: any, r: Transactions, index: number) => {
    if (openDetail) return openDetail(_, r, index);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: "Tx Hash",
      key: "txhash",
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
      title: "Block",
      key: "block",
      minWidth: 60,
      render: (r) => (
        <Box>
          <Box>
            <StyledLink to={details.block(r.blockNo || r.blockHash)}>
              {r.blockNo || getShortHash(r.blockHash)}
            </StyledLink>
          </Box>
          <Box mt={1}>
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/
            <Box color={({ palette }) => palette.secondary.light} component={"span"}>
              {r.epochSlotNo}
            </Box>
          </Box>
        </Box>
      )
    },
    {
      title: "Fees",
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
      title: "Output in ADA",
      minWidth: 120,
      key: "outSum",
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.totalOutput)}</Box>
          <ADAicon />
          {hash === r.hash && <SelectedIcon />}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Input address",
      key: "addressesInput",
      minWidth: 120,
      render: (r) => (
        <Box key={r.hash + "input"}>
          {r?.addressesInput?.slice(0, 2).map((address) => (
            <Box key={address}>
              <CustomTooltip title={address}>
                <StyledLink to={details.address(address)}>{getShortWallet(address)}</StyledLink>
              </CustomTooltip>
            </Box>
          ))}
          {r?.addressesInput?.length > 2 ? <StyledLink to={details.transaction(r.hash)}>...</StyledLink> : ""}
        </Box>
      )
    },
    {
      title: "Output address",
      key: "addressesOutput",
      minWidth: 120,
      render: (r) => (
        <Box key={r.hash + "output"}>
          {r?.addressesOutput?.slice(0, 2).map((address) => (
            <Box key={address}>
              <CustomTooltip title={address}>
                <StyledLink to={details.address(address)}>{getShortWallet(address)}</StyledLink>
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
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: "Total Transactions" }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => {
            mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            history.replace({ search: stringify({ page, size }) });
          },
          handleCloseDetailView: handleClose,
          hideLastPage: true
        }}
        onClickRow={onClickRow}
        selected={selected}
        showTabView={showTabView}
        tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
      />
    </Card>
  );
};

export default TransactionList;
