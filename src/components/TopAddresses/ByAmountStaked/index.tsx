import { Box, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import { formatADAFull, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";

import { Actions, PageSize, PerPage, StyledLink, TimeDuration } from "./styles";

const perPages = [10, 20, 50, 100];

const TopAddressesByAmountStaked = () => {
  const history = useHistory();
  const [pageSize, setPageSize] = useState("50");
  const { error, data, initialized, loading, lastUpdated } = useFetchList<Contracts>(
    API.STAKE.TOP_DELEGATOR,
    { page: 0, size: +pageSize },
    false,
    REFRESH_TIMES.TOP_DELEGATORS
  );

  const columns: Column<TopDelegator>[] = [
    {
      title: "#",
      minWidth: 30,
      key: "index",
      render: (r, idx) => numberWithCommas(idx + 1)
    },
    {
      title: "Stake Address",
      minWidth: 120,
      key: "addresses",
      render: (r) => (
        <CustomTooltip title={r.stakeKey}>
          <StyledLink to={details.stake(r.stakeKey)}>{getShortWallet(r.stakeKey)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Pool",
      key: "pool",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <StyledLink to={details.delegation(r.poolId)}>{r.poolName || getShortWallet(r.poolId)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Stake amount",
      key: "Stakeamount",
      render: (r) => (
        <Box component={"span"}>
          {formatADAFull(r.balance)} <ADAicon />
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
          <PerPage>Delegators</PerPage>
        </PageSize>
      </Actions>
      <Table
        onClickRow={(_, r) => history.push(details.stake(r.stakeKey))}
        data={data}
        error={error}
        loading={loading}
        initialized={initialized}
        columns={columns}
      />
    </Box>
  );
};
export default TopAddressesByAmountStaked;
