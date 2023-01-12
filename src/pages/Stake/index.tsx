import moment from "moment";
import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useWindowSize } from "react-use";
import useFetchList from "../../commons/hooks/useFetchList";
import { details, routers } from "../../commons/routers";
import { getPageInfo, getShortHash, getShortWallet } from "../../commons/utils/helper";
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

const columns: Column<IStakeKey>[] = [
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
        <StyledLink to={details.stake(r.stakeKey)}>{getShortWallet(r.stakeKey)}</StyledLink>
      </CustomTooltip>
    ),
  },
];

const Stake: React.FC<IStake> = () => {
  const [stake, setStake] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  let { poolType = POOL_TYPE.REGISTRATION } = useParams<{ poolType: POOL_TYPE }>();
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<IStakeKey>(`/stake/${poolType}`, pageInfo);

  useEffect(() => {
    const title = poolType === POOL_TYPE.REGISTRATION ? "Registrations" : "Deregistrations";
    document.title = `${title} Stake Keys | Cardano Explorer`;
  }, [poolType]);

  const onChangeTab = (e: React.SyntheticEvent, poolType: POOL_TYPE) => {
    history.push(routers.STAKE_LIST.replace(":poolType", poolType));
    handleClose();
  };

  const openDetail = (_: any, r: IStakeKey, index: number) => {
    if (width > 1023) {
      setOnDetailView(true);
      setStake(r.stakeKey);
      setSelected(index);
    } else history.push(details.stake(r.stakeKey));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setStake(null);
    setSelected(null);
  };

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
          {...fetchData}
          columns={columns}
          total={{ title: "Total Token List", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size, poolType }) }),
          }}
          onClickRow={openDetail}
          selected={selected}
        />
      </Card>
      {stake && <DetailViewStakeKey stakeId={stake} handleClose={handleClose} />}
    </StyledContainer>
  );
};

export default Stake;
