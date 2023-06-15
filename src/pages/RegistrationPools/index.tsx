import { useEffect, useState, useRef } from "react";
import { stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";

import useFetchList from "src/commons/hooks/useFetchList";
import { details, routers } from "src/commons/routers";
import {
  formatADAFull,
  formatDateTimeLocal,
  formatPercent,
  getPageInfo,
  getShortHash,
  getShortWallet
} from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import FormNowMessage from "src/components/commons/FormNowMessage";

import {
  RegistrationContainer,
  StakeKey,
  StyledLink,
  StyledTab,
  StyledTabs,
  TabLabel,
  TimeDuration,
  WrapHeader
} from "./styles";

enum POOL_TYPE {
  REGISTRATION = "registration",
  DEREREGISTRATION = "de-registration"
}

const RegistrationPools = () => {
  const history = useHistory();
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");
  const mainRef = useRef(document.querySelector("#main"));
  const { poolType = POOL_TYPE.REGISTRATION } = useParams<{ poolType: POOL_TYPE }>();

  const fetchData = useFetchList<Registration>(
    `${API.POOL}/${poolType}`,
    { ...pageInfo, sort },
    false,
    REFRESH_TIMES.POOL_REGISTRATIONS
  );

  useEffect(() => {
    const title = poolType === POOL_TYPE.REGISTRATION ? "Registration" : "Deregistration";
    document.title = `${title} Pools | Cardano Explorer`;
  }, [poolType]);

  const onChangeTab = (e: React.SyntheticEvent, poolType: POOL_TYPE) => {
    setSort("");
    history.push(routers.REGISTRATION_POOLS.replace(":poolType", poolType));
  };

  const columns: Column<Registration>[] = [
    {
      title: "Tx Hash",
      key: "bk.time",
      render: (pool) => {
        return (
          <>
            <CustomTooltip title={pool.txHash}>
              <StyledLink to={details.transaction(pool.txHash)}>{getShortHash(pool.txHash || "")}</StyledLink>
            </CustomTooltip>
            <div>{formatDateTimeLocal(pool.txTime || "")}</div>
          </>
        );
      },
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Block",
      key: "block",
      render: (pool) => (
        <>
          <StyledLink to={details.block(pool.block)}>{pool.block}</StyledLink>
          <br />
          <StyledLink to={details.epoch(pool.epoch)}>{pool.epoch}</StyledLink>/{pool.slotNo}
        </>
      )
    },
    {
      title: "Pool",
      key: "pool",
      render: (pool) => (
        <StyledLink to={details.delegation(pool.poolView || "")}>
          <CustomTooltip title={pool.poolName || pool.poolView || ""}>
            <Box component={"span"}>{pool.poolName || getShortHash(pool.poolView)}</Box>
          </CustomTooltip>
        </StyledLink>
      )
    },
    {
      title: "Pledge (A)",
      key: poolType === POOL_TYPE.REGISTRATION ? "pledge" : "pu.pledge",
      render: (pool) => <>{formatADAFull(pool.pledge)}</>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Cost (A)",
      key: poolType === POOL_TYPE.REGISTRATION ? "fixedCost" : "pu.fixedCost",
      render: (pool) => <>{formatADAFull(pool.cost)}</>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Fee",
      key: poolType === POOL_TYPE.REGISTRATION ? "margin" : "pu.margin",
      render: (pool) => formatPercent(pool.margin),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Stake Key",
      key: "stakeKey",
      render: (pool) => (
        <>
          {pool.stakeKey?.slice(0, 2).map((stakeKey) => (
            <StakeKey key={stakeKey}>
              <CustomTooltip title={stakeKey}>
                <StyledLink to={details.stake(stakeKey)}>{getShortWallet(stakeKey)}</StyledLink>
              </CustomTooltip>
            </StakeKey>
          ))}
          {pool.stakeKey?.length > 2 ? <StyledLink to={details.delegation(pool.poolView || "")}>...</StyledLink> : ""}
        </>
      )
    }
  ];
  if (!Object.values(POOL_TYPE).includes(poolType)) return <NoRecord />;

  return (
    <RegistrationContainer>
      <WrapHeader>
        <StyledTabs
          value={poolType}
          onChange={onChangeTab}
          TabIndicatorProps={{ sx: { backgroundColor: (theme) => theme.palette.primary.main, height: 4 } }}
        >
          <StyledTab value={POOL_TYPE.REGISTRATION} label={<TabLabel>Registration</TabLabel>} />
          <StyledTab value={POOL_TYPE.DEREREGISTRATION} label={<TabLabel>Deregistration</TabLabel>} />
        </StyledTabs>
        <TimeDuration>
          <FormNowMessage time={fetchData.lastUpdated} />
        </TimeDuration>
      </WrapHeader>
      <Box>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Transactions", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo(0, 0);
            },
            total: fetchData.total
          }}
        />
      </Box>
    </RegistrationContainer>
  );
};

export default RegistrationPools;
