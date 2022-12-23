import moment from "moment";
import { parse, stringify } from "qs";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useWindowSize } from "react-use";
import useFetchList from "../../commons/hooks/useFetchList";
import { details, routers } from "../../commons/routers";
import { getShortHash } from "../../commons/utils/helper";
import Card from "../../components/commons/Card";
import CustomTooltip from "../../components/commons/CustomTooltip";
import DetailViewStakeKey from "../../components/commons/DetailView/DetailViewStakeKey";
import Table, { Column } from "../../components/commons/Table";
import { setOnDetailView } from "../../stores/user";
import { ActiveButton, Header, StyledButton, StyledContainer, StyledLink } from "./styles";

interface IStake {}

const colums: Column<IStakeKey>[] = [
  {
    title: "Trx Hash",
    key: "trxHash",
    render: r => (
      <CustomTooltip title={r.txHash} placement="top">
        <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
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
        <StyledLink to={routers.STAKE_DETAIL.replace(":stakeId", r.stakeKey)}>{getShortHash(r.stakeKey)}</StyledLink>
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
            <StyledLink to={details.stake(r.stakeKey)}>
              {getShortHash(r.poolNames[0])}
            </StyledLink>
          </CustomTooltip>
        );
      return (
        <>
          <CustomTooltip title={r.poolNames[0]} placement="top">
            <StyledLink to={details.stake(r.stakeKey)}>
              {getShortHash(r.poolNames[0])}
            </StyledLink>
          </CustomTooltip>
          <StyledLink to={details.stake(r.stakeKey)}>...</StyledLink>
        </>
      );
    },
  },
];

const Stake: React.FC<IStake> = () => {
  const [stakeKey, setStakeKey] = useState<string>("registration");
  const [detailView, setDetailView] = useState<string | null>(null);
  const history = useHistory();
  const { search } = useLocation();
  const { width } = useWindowSize();
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data, total, loading, initialized, currentPage, error } = useFetchList<IStakeKey>(
    `/stake/${stakeKey === "registration" ? "" : "de-"}registration`,
    {
      page: query.page ? +query.page - 1 : 0,
      size: query.size ? (query.size as string) : 10,
    }
  );

  const openDetail = (_: any, r: IStakeKey) => {
    if (width > 1023) {
      setOnDetailView(true);
      setDetailView(r.stakeKey);
    } else history.push(routers.STAKE_DETAIL.replace(":stakeId", r.stakeKey));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setDetailView(null);
  };

  const selected = data?.findIndex(item => item.stakeKey === detailView);
  return (
    <StyledContainer>
      <Card>
        <Header>
          {stakeKey === "registration" ? (
            <>
              <ActiveButton
                style={{ marginRight: 40 }}
                onClick={() => {
                  setStakeKey("registration");
                }}
              >
                Registration
              </ActiveButton>
              <StyledButton
                onClick={() => {
                  setStakeKey("deregistration");
                }}
              >
                Deregistration
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton
                style={{ marginRight: 40 }}
                onClick={() => {
                  setStakeKey("registration");
                }}
              >
                Registration
              </StyledButton>
              <ActiveButton
                onClick={() => {
                  setStakeKey("deregistration");
                }}
              >
                Deregistration
              </ActiveButton>
            </>
          )}
        </Header>
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
