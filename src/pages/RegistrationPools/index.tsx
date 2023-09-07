import { useEffect, useState, useRef } from "react";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import Card from "src/components/commons/Card";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
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
import FormNowMessage from "src/components/commons/FormNowMessage";
import ADAicon from "src/components/commons/ADAIcon";

import { RegistrationContainer, StakeKey, StyledLink, StyledPoolLink, TimeDuration } from "./styles";

export enum POOL_TYPE {
  REGISTRATION = "registration",
  DEREREGISTRATION = "de-registration"
}

interface Props {
  poolType: POOL_TYPE;
}

const RegistrationPools: React.FC<Props> = ({ poolType }) => {
  const history = useHistory();
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>("");
  const mainRef = useRef(document.querySelector("#main"));
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);

  const fetchData = useFetchList<Registration>(`${API.POOL}/${poolType}`, { ...pageInfo, sort }, false, blockNo);

  useEffect(() => {
    const title = poolType === POOL_TYPE.REGISTRATION ? "Registration" : "Deregistration";
    document.title = `${title} Pools | Cardano Blockchain Explorer`;
  }, [poolType]);

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
          </>
        );
      },
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Created At",
      key: "created_at",
      render: (pool) => <>{formatDateTimeLocal(pool.txTime || "")}</>
    },
    {
      title: "Block",
      key: "block",
      render: (pool) => (
        <>
          <StyledLink to={details.block(pool.block)}>{pool.block}</StyledLink>
          <br />
          <StyledLink to={details.epoch(pool.epoch)}>{pool.epoch}</StyledLink>/{" "}
          <Box component={"span"} color={({ palette }) => palette.secondary.light}>
            {pool.slotNo}
          </Box>
        </>
      )
    },
    {
      title: "Pool",
      key: "pool",
      maxWidth: 200,
      render: (pool) => (
        <StyledPoolLink
          to={{ pathname: details.delegation(pool.poolView), state: { fromPath: history.location.pathname } }}
        >
          <CustomTooltip title={pool.poolName || pool.poolView || ""}>
            <Box component={"span"}>{pool.poolName || getShortHash(pool.poolView)}</Box>
          </CustomTooltip>
        </StyledPoolLink>
      )
    },
    {
      title: (
        <Box component="span">
          Pledge (<ADAicon />)
        </Box>
      ),
      key: poolType === POOL_TYPE.REGISTRATION ? "pledge" : "pu.pledge",
      render: (pool) => <>{formatADAFull(pool.pledge)}</>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: (
        <Box component="span">
          Fixed Cost (<ADAicon />)
        </Box>
      ),
      key: poolType === POOL_TYPE.REGISTRATION ? "fixedCost" : "pu.fixedCost",
      render: (pool) => <>{formatADAFull(pool.cost)}</>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Margin",
      key: poolType === POOL_TYPE.REGISTRATION ? "margin" : "pu.margin",
      render: (pool) => formatPercent(pool.margin),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Stake Address",
      key: "stakeAddress",
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
      <Card title={poolType === POOL_TYPE.REGISTRATION ? "Pool Certificate" : "Pool Deregistration"}>
        <TimeDuration>
          <FormNowMessage time={fetchData.lastUpdated} />
        </TimeDuration>
      </Card>
      <Box>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Transactions", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            },
            total: fetchData.total
          }}
          tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
        />
      </Box>
    </RegistrationContainer>
  );
};

export default RegistrationPools;
