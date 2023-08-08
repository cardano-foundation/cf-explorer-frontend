import { Box } from "@mui/material";
import { useState } from "react";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import { formatADAFull, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import Table, { Column } from "src/components/commons/Table";

import { Actions, PageSize, PerPage, SelectMui, StyledLink, StyledMenuItem, TimeDuration } from "./styles";

const perPages = [10, 20, 50, 100];

const TopAddressesByADABalance = () => {
  const [pageSize, setPageSize] = useState("50");
  const { error, data, initialized, loading, lastUpdated } = useFetchList<Contracts>(
    API.ADDRESS.TOP_ADDRESS,
    { page: 0, size: +pageSize },
    false,
    REFRESH_TIMES.TOP_ADDRESS
  );

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
          {numberWithCommas(r.txCount) || 0}
        </Box>
      )
    }
  ];

  return (
    <Box mt={"18px"}>
      <Actions>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <PageSize>
          <SelectMui
            value={pageSize}
            onChange={(event: any) => setPageSize(event.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ color: ({ palette }) => palette.secondary.main }}
          >
            {perPages.map((item) => (
              <StyledMenuItem key={item} value={item}>
                <Box color={({ palette }) => `${palette.secondary.main} !important`}>{item}</Box>
              </StyledMenuItem>
            ))}
          </SelectMui>
          <PerPage>Addresses</PerPage>
        </PageSize>
      </Actions>
      <Table
        data={data}
        error={error}
        loading={loading}
        initialized={initialized}
        columns={columns}
        tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "55vh" } }) }}
      />
    </Box>
  );
};

export default TopAddressesByADABalance;
