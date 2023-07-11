import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
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

import { Actions, StyledContainer, StyledLink, TimeDuration } from "./styles";

const StakeDelegations = () => {
  const { search } = useLocation();
  const history = useHistory();
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
      render: (r, idx) => numberWithCommas(pageInfo?.page * pageInfo?.size + idx + 1 || 0)
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
      title: "Created At",
      key: "createdat",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time)
    },
    {
      title: "Block",
      key: "blockNo",
      render: (r) => (
        <>
          <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
          <Box mt={1}>
            <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/
            <Box color={({ palette }) => palette.grey[300]} component={"span"}>
              {r.epochSlotNo}
            </Box>
          </Box>
        </>
      )
    },
    {
      title: "Stake Address",
      key: "stakeAddress",
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
      render: (r) => (
        <>
          {r.pools.slice(0, 2).map((pool: any) => (
            <Box key={pool.poolId}>
              <CustomTooltip title={pool.poolName || pool.poolId}>
                <StyledLink to={details.delegation(pool.poolId)}>
                  <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
                    {pool.poolName || getShortWallet(pool.poolId)}
                  </Box>
                </StyledLink>
              </CustomTooltip>
            </Box>
          ))}
          {r.pools?.length > 2 ? <StyledLink to={details.transaction(r.txHash)}>...</StyledLink> : ""}
        </>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title="Stake Delegations">
        <Actions>
          <TimeDuration>
            <FormNowMessage time={fetchData.lastUpdated} />
          </TimeDuration>
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
