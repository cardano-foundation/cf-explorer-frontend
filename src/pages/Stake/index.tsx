import { Tooltip } from "@mui/material";
import moment from "moment";
import { parse, stringify } from "qs";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "../../commons/hooks/useFetchList";
import { routers } from "../../commons/routers";
import { getShortHash } from "../../commons/utils/helper";

import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";

import { ActiveButton, Header, StyledButton, StyledContainer, StyledLink } from "./styles";

interface IStake {}

const colums: Column<IStakeKey>[] = [
  {
    title: "Trx Hash",
    key: "trxHash",
    render: r => (
      <Tooltip title={r.txHash} placement="top">
        <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
      </Tooltip>
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
        <StyledLink to={routers.BLOCK_DETAIL.replace(":blockId", `${r.block}`)}>{r.block}</StyledLink>
        <div style={{ display: "flex", marginTop: "6px" }}>
          <StyledLink to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epoch}`)}>{r.epoch}</StyledLink>/{r.slotNo}
        </div>
      </>
    ),
  },
  {
    title: "Stake Key",
    key: "stakeKey",
    render: r => (
      <Tooltip title={r.stakeKey} placement="top">
        <StyledLink to={routers.STAKE_DETAIL.replace(":stakeId", r.stakeKey)}>{getShortHash(r.stakeKey)}</StyledLink>
      </Tooltip>
    ),
  },
  {
    title: "Pool",
    key: "pool",
    render: r => {
      if (r.poolNames === null) return null;
      if (r.poolNames.length === 1)
        return (
          <Tooltip title={r.poolNames[0]} placement="top">
            <StyledLink to={"#"}>{getShortHash(r.poolNames[0])}</StyledLink>
          </Tooltip>
        );
      return (
        <>
          <Tooltip title={r.poolNames[0]} placement="top">
            <StyledLink to={"#"}>{getShortHash(r.poolNames[0])}</StyledLink>
          </Tooltip>
          <StyledLink to={"#"}>...</StyledLink>
        </>
      );
    },
  },
];

const Stake: React.FC<IStake> = () => {
  const [stakeKey, setStakeKey] = useState<string>("registration");
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data, total, loading, initialized, currentPage } = useFetchList<IStakeKey>(
    `/stake/${stakeKey === "registration" ? "" : "de-"}registration`,
    {
      page: query.page ? +query.page - 1 : 0,
      size: query.size ? (query.size as string) : 10,
    }
  );

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
          onClickRow={(_, r) => history.push(routers.STAKE_DETAIL.replace(":stakeId", r.stakeKey))}
        />
      </Card>
    </StyledContainer>
  );
};

export default Stake;
