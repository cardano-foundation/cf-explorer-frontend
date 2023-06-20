import { Box, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import {
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet,
  numberWithCommas
} from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { Actions, PageSize, PerPage, PoolName, StyledContainer, StyledLink, TimeDuration } from "./styles";

const perPages = [10, 20, 50, 100];

const StakeDelegations = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [pageSize, setPageSize] = useState("50");
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Contracts>(
    API.STAKE.STAKE_DELEGATIONS,
    { ...pageInfo },
    false,
    REFRESH_TIMES.STAKE_DELEGATIONS
  );

  const mainRef = useRef(document.querySelector("#main"));

  useEffect(() => {
    document.title = `Stake Delegations | Cardano Explorer`;
  }, []);

  const columns: Column<StakeDelegations>[] = [
    {
      title: "#",
      minWidth: 30,
      key: "index",
      render: (r, idx) => numberWithCommas(idx + 1)
    },
    {
      title: "Tx Hash",
      minWidth: 120,
      key: "txHash",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: "Time",
      key: "time",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time)
    },
    {
      title: "Block",
      key: "blockNo",
      render: (r) => <Box component={"span"}>{r.blockNo}</Box>
    },
    {
      title: "Stake Key",
      key: "stakeKeys",
      render: (r) => {
        const stakeKey = r.stakeKeys[0];
        return (
          <CustomTooltip title={stakeKey}>
            <StyledLink to={details.stake(stakeKey)}>{getShortWallet(stakeKey)}</StyledLink>
          </CustomTooltip>
        );
      }
    },
    {
      title: "Pool",
      key: "pool",
      render: (r) => {
        const pool = r.pools[0] || {};
        return (
          <>
            <CustomTooltip title={pool.poolName || pool.poolId}>
              <PoolName to={details.delegation(pool.poolId)}>
                <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
                  {pool.poolName || `${getShortWallet(pool.poolId)}`}
                </Box>
              </PoolName>
            </CustomTooltip>
            <>
              {(r.pools || []).length > 1 && (
                <Box display={"block"} component={Link} to={details.transaction(r.txHash)}>
                  ...
                </Box>
              )}
            </>
          </>
        );
      }
    }
  ];

  return (
    <StyledContainer>
      <Card title="Stake Delegations">
        <Actions>
          <TimeDuration>
            <FormNowMessage time={fetchData.lastUpdated} />
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
export default StakeDelegations;
