import moment from "moment";
import { parse, stringify } from "qs";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useWindowSize } from "react-use";
import useFetchList from "../../commons/hooks/useFetchList";
import { details } from "../../commons/routers";
import { getShortHash } from "../../commons/utils/helper";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
import DetailViewStakeKey from "../../components/commons/DetailView/DetailViewStakeKey";
import Table, { Column } from "../../components/commons/Table";
import { setOnDetailView } from "../../stores/user";
import { StyledContainer, StyledLink, StyledTab, StyledTabs, TabLabel } from "./styles";

interface IStake {}

enum POOL_TYPE {
  REGISTRATION = "registration",
  DEREREGISTRATION = "de-registration",
}
const colums: Column<IStakeKey>[] = [
  {
    title: "Trx Hash",
    key: "trxHash",
    render: r => (
      <CustomTooltip title={r.txHash} placement="top">
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
      </CustomTooltip>
    ),
  },
  {
    title: "Time",
    key: "time",
    render: r => <>{moment(r.txTime).format("MM/DD/YYYY HH:mm:ss")}</>,
  },
  {
    title: "Block",
    key: "block",
    render: r => (
      <>
        <StyledLink to={details.block(r.block)}>{r.block}</StyledLink>
        <div style={{ display: "flex", marginTop: "6px" }}>
          <StyledLink to={details.epoch(r.epoch)}>{r.epoch}</StyledLink>/{r.slotNo}
        </div>
      </>
    ),
  },
  {
    title: "Stake Key",
    key: "stakeKey",
    render: r => (
      <CustomTooltip title={r.stakeKey} placement="top">
        <StyledLink to={details.stake(r.stakeKey)}>{getShortHash(r.stakeKey)}</StyledLink>
      </CustomTooltip>
    ),
  },
  {
    title: "Pool",
    key: "pool",
    render: r => {
      if (r.poolNames === null) return null;
      if (r.poolNames.length === 1)
        return (
          <CustomTooltip title={r.poolNames[0]} placement="top">
            <StyledLink to={details.stake(r.stakeKey)}>{getShortHash(r.poolNames[0])}</StyledLink>
          </CustomTooltip>
        );
      return (
        <>
          <CustomTooltip title={r.poolNames[0]} placement="top">
            <StyledLink to={details.stake(r.stakeKey)}>{getShortHash(r.poolNames[0])}</StyledLink>
          </CustomTooltip>
          <StyledLink to={details.stake(r.stakeKey)}>...</StyledLink>
        </>
      );
    },
  },
];

const Stake: React.FC<IStake> = () => {
  const [poolType, setPoolType] = useState<POOL_TYPE>(POOL_TYPE.REGISTRATION);
  const [detailView, setDetailView] = useState<string | null>(null);
  const history = useHistory();
  const { search } = useLocation();
  const { width } = useWindowSize();
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data, total, loading, initialized, currentPage, error } = useFetchList<IStakeKey>(`/stake/${poolType}`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  const onChangeTab = (e: React.SyntheticEvent, poolType: POOL_TYPE) => {
    setQuery({ page: 1, size: 10 });
    setPoolType(poolType);
  };

  const openDetail = (_: any, r: IStakeKey) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r.stakeKey);
    } else history.push(details.stake(r.stakeKey));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };

  const selected = data?.findIndex(item => item.stakeKey === detailView);
  return (
    <StyledContainer>
      <Card>
        <StyledTabs
          value={poolType}
          onChange={onChangeTab}
          TabIndicatorProps={{ sx: { backgroundColor: props => props.colorGreenLight, height: 4 } }}
        >
          <StyledTab value={POOL_TYPE.REGISTRATION} label={<TabLabel>Registration</TabLabel>} />
          <StyledTab value={POOL_TYPE.DEREREGISTRATION} label={<TabLabel>Deregistration</TabLabel>} />
        </StyledTabs>
        <Table
          columns={colums}
          data={data || []}
          loading={loading}
          initialized={initialized}
          total={{ title: "Total Token List", count: total }}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
            },
            page: currentPage || 0,
            total: total,
          }}
          onClickRow={openDetail}
          selected={selected}
          selectedProps={{ style: { backgroundColor: "#ECECEC" } }}
          error={error}
        />
      </Card>
      {detailView && <DetailViewStakeKey stakeId={detailView} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Stake;
