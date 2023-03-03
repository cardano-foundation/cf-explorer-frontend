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
    render: r => {
      return (
        <>
          <CustomTooltip title={r.txHash}>
            <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
          </CustomTooltip>
          <div>{formatDateTimeLocal(r.txTime || "")}</div>
        </>
      );
    },
  },
  {
    title: "Block",
    key: "block",
    render: r => (
      <>
        <StyledLink to={details.block(r.block)}>{r.block}</StyledLink>
        <br />
        <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>/{r.slotNo}
      </>
    ),
  },
  {
    title: "Pool",
    key: "pool",
    render: r => (
      <StyledLink to={details.delegation(r.poolView || "")}>
        <CustomTooltip title={r.poolName || `Pool[${r.poolView}]` || ""}>
          <Box component={"span"}>{r.poolName || `Pool[${getShortHash(r.poolView)}]`}</Box>
        </CustomTooltip>
      </StyledLink>
    ),
  },
  {
    title: "Pledge (A)",
    key: "pledge",
    render: r => <>{formatADAFull(r.pledge)}</>,
  },
  {
    title: "Cost (A)",
    key: "cost",
    render: r => <>{formatADAFull(r.cost)}</>,
  },
  {
    title: "Fee",
    key: "margin",
    render: r => formatPercent(r.margin || 0),
  },
  {
    title: "Stake Key",
    key: "stakeKey",
    render: r =>
      r.stakeKey?.[0] ? (
        <CustomTooltip title={r.stakeKey[0]}>
          <StyledLink to={details.stake(r.stakeKey[0])}>{getShortWallet(r.stakeKey[0])}</StyledLink>
        </CustomTooltip>
      ) : (
        ""
      ),
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
        TabIndicatorProps={{ sx: { backgroundColor: props => props.colorGreenLight, height: 4 } }}
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
