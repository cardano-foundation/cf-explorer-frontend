import { Box, Button, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { details } from "../../commons/routers";
import { API } from "../../commons/utils/api";
import { formatADAFull, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import ADAicon from "../../components/commons/ADAIcon";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
import Table from "../../components/commons/Table";
import { Column } from "../../types/table";
import { Actions, PageSize, PerPage, StyledContainer, StyledLink, TimeDuration } from "./styles";
import { REFRESH_TIMES } from "../../commons/utils/constants";
import FormNowMessage from "src/components/commons/FormNowMessage";

const perPages = [10, 20, 50, 100];

const TopDelegators = () => {
  const history = useHistory();
  const [pageSize, setPageSize] = useState("50");
  const { error, data, initialized, loading, lastUpdated } = useFetchList<Contracts>(
    API.STAKE.TOP_DELEGATOR,
    { page: 0, size: +pageSize },
    false,
    REFRESH_TIMES.TOP_DELEGATORS
  );

  useEffect(() => {
    document.title = `Top Delegators | Cardano Explorer`;
  }, []);

  const columns: Column<TopDelegator>[] = [
    {
      title: "#",
      minWidth: 30,
      key: "index",
      render: (r, idx) => numberWithCommas(idx + 1)
    },
    {
      title: "Stake key Addresses",
      minWidth: 120,
      key: "addresses",
      render: (r, idx) => (
        <CustomTooltip title={r.stakeKey}>
          <StyledLink to={details.stake(r.stakeKey)}>{getShortWallet(r.stakeKey)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Pool",
      key: "pool",
      render: (r, idx) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <StyledLink to={details.delegation(r.poolId)}>
            {r.poolName || `Pool [${getShortWallet(r.poolId)}]`}
          </StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Stake amount",
      key: "Stakeamount",
      render: (r, idx) => (
        <Box component={"span"}>
          {formatADAFull(r.balance)} <ADAicon />
        </Box>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title='Top delegators'>
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
        <Table
          onClickRow={(_, r) => history.push(details.stake(r.stakeKey))}
          data={data}
          error={error}
          loading={loading}
          initialized={initialized}
          columns={columns}
        />
      </Card>
    </StyledContainer>
  );
};
export default TopDelegators;
