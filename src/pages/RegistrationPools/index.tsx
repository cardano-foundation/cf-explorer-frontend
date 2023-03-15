import { useEffect } from "react";
import { stringify } from "qs";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { details, routers } from "../../commons/routers";
import {
  formatADAFull,
  formatDateTimeLocal,
  formatPercent,
  getPageInfo,
  getShortHash,
  getShortWallet,
} from "../../commons/utils/helper";
import CustomTooltip from "../../components/commons/CustomTooltip";
import Table, { Column } from "../../components/commons/Table";
import { RegistrationContainer, StyledLink, StyledTab, StyledTabs, TabLabel } from "./styles";
import { API } from "../../commons/utils/api";
import NoRecord from "../../components/commons/NoRecord";
import { Box } from "@mui/material";

enum POOL_TYPE {
  REGISTRATION = "registration",
  DEREREGISTRATION = "de-registration",
}

const columns: Column<Registration>[] = [
  {
    title: "Trx Hash",
    key: "trxHash",
    render: pool => {
      return (
        <>
          <CustomTooltip title={pool.txHash}>
            <StyledLink to={details.transaction(pool.txHash)}>{getShortHash(pool.txHash || "")}</StyledLink>
          </CustomTooltip>
          <div>{formatDateTimeLocal(pool.txTime || "")}</div>
        </>
      );
    },
  },
  {
    title: "Block",
    key: "block",
    render: pool => (
      <>
        <StyledLink to={details.block(pool.block)}>{pool.block}</StyledLink>
        <br />
        <StyledLink to={details.epoch(pool.epoch)}>{pool.epoch}</StyledLink>/{pool.slotNo}
      </>
    ),
  },
  {
    title: "Pool",
    key: "pool",
    render: pool => (
      <StyledLink to={details.delegation(pool.poolView || "")}>
        <CustomTooltip title={pool.poolName || `Pool[${pool.poolView}]` || ""}>
          <Box component={"span"}>{pool.poolName || `Pool[${getShortHash(pool.poolView)}]`}</Box>
        </CustomTooltip>
      </StyledLink>
    ),
  },
  {
    title: "Pledge (A)",
    key: "pledge",
    render: pool => <>{formatADAFull(pool.pledge)}</>,
  },
  {
    title: "Cost (A)",
    key: "cost",
    render: pool => <>{formatADAFull(pool.cost)}</>,
  },
  {
    title: "Fee",
    key: "margin",
    render: pool => formatPercent(pool.margin || 0),
  },
  {
    title: "Stake Key",
    key: "stakeKey",
    render: pool =>
      pool?.stakeKey?.map((stakeKey, index) => (
        <>
          {index ? <br /> : ""}
          <CustomTooltip title={stakeKey} key={stakeKey}>
            <StyledLink to={details.stake(stakeKey)}>{getShortWallet(stakeKey)}</StyledLink>
          </CustomTooltip>
        </>
      )) || "",
  },
];

const RegistrationPools = () => {
  const history = useHistory();
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const { poolType = POOL_TYPE.REGISTRATION } = useParams<{ poolType: POOL_TYPE }>();

  const fetchData = useFetchList<Registration>(`${API.POOL}/${poolType}`, pageInfo);

  useEffect(() => {
    const title = poolType === POOL_TYPE.REGISTRATION ? "Registration" : "Deregistration";
    document.title = `${title} Pools | Cardano Explorer`;
  }, [poolType]);

  const onChangeTab = (e: React.SyntheticEvent, poolType: POOL_TYPE) => {
    history.push(routers.REGISTRATION_POOLS.replace(":poolType", poolType));
  };

  if (!Object.values(POOL_TYPE).includes(poolType)) return <NoRecord />;

  return (
    <RegistrationContainer>
      <StyledTabs
        value={poolType}
        onChange={onChangeTab}
        TabIndicatorProps={{ sx: { backgroundColor: theme => theme.palette.primary.main, height: 4 } }}
      >
        <StyledTab value={POOL_TYPE.REGISTRATION} label={<TabLabel>Registration</TabLabel>} />
        <StyledTab value={POOL_TYPE.DEREREGISTRATION} label={<TabLabel>Deregistration</TabLabel>} />
      </StyledTabs>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: "Total Transactions", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          total: fetchData.total,
        }}
      />
    </RegistrationContainer>
  );
};

export default RegistrationPools;
