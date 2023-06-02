import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select } from "@mui/material";

import useFetchList from "src/commons/hooks/useFetchList";
import { formatADAFull, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import Table, { Column } from "src/components/commons/Table";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { Actions, PageSize, PerPage, StyledContainer, StyledLink, TimeDuration } from "./styles";

const perPages = [10, 20, 50, 100];

const TopAddresses = () => {
  const [pageSize, setPageSize] = useState("50");

  const { error, data, initialized, loading, lastUpdated } = useFetchList<Contracts>(
    API.ADDRESS.TOP_ADDRESS,
    { page: 0, size: +pageSize },
    false,
    REFRESH_TIMES.TOP_ADDRESS
  );

  useEffect(() => {
    document.title = `Top Addresses | Cardano Explorer`;
  }, []);

  const columns: Column<Address>[] = [
    {
      title: "#",
      key: "id",
      minWidth: 30,
      render: (_, index) => numberWithCommas(index + 1)
    },
    {
      title: "Addresses",
      key: "address",
      minWidth: 120,

      render: (r) => (
        <div>
          <CustomTooltip title={r.address}>
            <StyledLink to={details.address(r.address)}>{getShortWallet(r.address)}</StyledLink>
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
      )
    },
    {
      title: "Transaction Count",
      minWidth: 120,
      key: "transaction_count",
      render: (r) => (
        <Box display="flex" alignItems="center">
          {r.txCount || 0}
        </Box>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title={"Top addresses"} underline={false}>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <PageSize>
            <Select
              value={pageSize}
              onChange={(event) => setPageSize(event.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {perPages.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <PerPage>Per page</PerPage>
          </PageSize>
        </Actions>
        <Table data={data} error={error} loading={loading} initialized={initialized} columns={columns} />
      </Card>
    </StyledContainer>
  );
};

export default TopAddresses;
