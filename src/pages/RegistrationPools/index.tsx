import { useState } from "react";
import moment from "moment";
import { parse, stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { details, routers } from "../../commons/routers";
import { formatADA, getShortHash, getShortWallet } from "../../commons/utils/helper";
import CustomTooltip from "../../components/commons/CustomTooltip";
import Table, { Column } from "../../components/commons/Table";
import { RegistrationContainer, StyledLink, StyledTab, StyledTabs, TabLabel } from "./styles";

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
          <CustomTooltip title={r.txHash} placement="top">
            <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || "")}</StyledLink>
          </CustomTooltip>
          <div>{moment(r.txTime).format("MM/DD/YYYY HH:mm:ss")}</div>
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
      <StyledLink to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.txId}`)}>{r.poolName}</StyledLink>
    ),
  },
  {
    title: "Pledge(A)",
    key: "pledge",
    render: r => <>{formatADA(r.pledge)}</>,
  },
  {
    title: "Cost(A)",
    key: "cost",
    render: r => <>{formatADA(r.cost)}</>,
  },
  {
    title: "Margin",
    key: "margin",
    render: r => <>{r.margin ? `${r.margin}%` : ""}</>,
  },
  {
    title: "Stake Key",
    key: "stakeKey",
    render: r => (
      <CustomTooltip title={r.stakeKey} placement="top">
        <StyledLink to={routers.STORY_DETAIL.replace(":poolId", `${r.txId}`)}>
          {r.stakeKey ? getShortWallet(r.stakeKey) : ""}
        </StyledLink>
      </CustomTooltip>
    ),
  },
];

const RegistrationPools = () => {
  const [poolType, setPoolType] = useState<POOL_TYPE>(POOL_TYPE.REGISTRATION);
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data, total, loading, initialized, error } = useFetchList<Registration>(
    `/pool/${poolType}?page=${query.page || 1}&size=${query.size || 10}`
  );

  const onChangeTab = (e: React.SyntheticEvent, poolType: POOL_TYPE) => {
    setQuery({ page: 1, size: 10 });
    setPoolType(poolType);
  };

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
        columns={columns}
        data={data || []}
        loading={loading}
        initialized={initialized}
        error={error}
        total={{ title: "Total Transactions", count: total }}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: query.page ? +query.page - 1 : 0,
          total: total,
        }}
      />
    </RegistrationContainer>
  );
};

export default RegistrationPools;
