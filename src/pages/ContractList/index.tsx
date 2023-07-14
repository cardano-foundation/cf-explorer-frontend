import { Box } from "@mui/material";
import { stringify } from "qs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import {
  exchangeADAToUSD,
  formatADAFull,
  getPageInfo,
  getShortWallet,
  numberWithCommas
} from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import Table, { Column } from "src/components/commons/Table";
import { RootState } from "src/stores/types";

import { StyledContainer, StyledLink, TimeDuration } from "./styles";

const Transactions: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");
  const mainRef = useRef(document.querySelector("#main"));
  const fetchData = useFetchList<Contracts>(API.CONTRACT, { ...pageInfo, sort }, false, REFRESH_TIMES.CONTRACTS);
  const { adaRate } = useSelector(({ system }: RootState) => system);

  useEffect(() => {
    document.title = `Contracts List | Cardano Explorer`;
  }, []);

  const columns: Column<Contracts>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (_, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0)
    },
    {
      title: "Contract Addresses",
      key: "trxhash",
      minWidth: 120,

      render: (r) => (
        <div>
          <CustomTooltip title={r.address}>
            <StyledLink to={details.contract(r.address)}>{getShortWallet(r.address)}</StyledLink>
          </CustomTooltip>
        </div>
      )
    },
    {
      title: "Balance",
      key: "balance",
      minWidth: 60,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.balance)}</Box>
          <ADAicon />
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Value",
      key: "value",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          {exchangeADAToUSD(r.balance, adaRate, true)}
        </Box>
      )
    },
    {
      title: "Transaction Count",
      minWidth: 120,
      key: "txCount",
      render: (r) => (
        <Box display="flex" alignItems="center">
          {numberWithCommas(r.txCount)}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    }
  ];

  return (
    <StyledContainer>
      <Card title={"Contracts"} underline={false}>
        <TimeDuration>
          <FormNowMessage time={fetchData.lastUpdated} />
        </TimeDuration>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Contracts", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo(0, 0);
            }
          }}
        />
      </Card>
    </StyledContainer>
  );
};

export default Transactions;
