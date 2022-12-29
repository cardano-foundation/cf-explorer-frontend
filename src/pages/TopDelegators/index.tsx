import { Box } from "@mui/material";
import { parse, stringify } from "qs";
import { Link, useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { details } from "../../commons/routers";
import { formatADA, getShortWallet } from "../../commons/utils/helper";

import Card from "../../components/commons/Card";
import Table from "../../components/commons/Table";
import { ADAToken } from "../../components/commons/Token";
import { Column } from "../../types/table";
import { StyledContainer, StyledLink } from "./styles";

const TopDelegators = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const page = query.page ? +query.page - 1 : 0;
  const size = query.size ? (query.size as string) : 10;
  const { data, loading, currentPage, error, initialized, total } = useFetchList("/stake/top-delegators", {
    page: page,
    size: +size * (page + 1) > 50 ? 50 - +size * page : size,
  });

  const columns: Column<TopDelegator>[] = [
    {
      title: "#",
      minWidth: 30,
      key: "index",
      render: (r, idx) => idx + 1 + (query.page ? +query.page - 1 : 0) * +(query.size ? query.size : 10),
    },
    {
      title: "Addresses",
      minWidth: 120,
      key: "addresses",
      render: (r, idx) => <StyledLink to={details.stake(r.stakeKey)}>{getShortWallet(r.stakeKey)}</StyledLink>,
    },
    {
      title: "Pool",
      key: "pool",
      render: (r, idx) => (
        <StyledLink to={details.delegation(r.poolId)}>
          {r.poolName} #{r.poolId}
        </StyledLink>
      ),
    },
    {
      title: "Stake amount",
      key: "Stakeamount",
      render: (r, idx) => (
        <>
          {formatADA(r.balance || 0)} <ADAToken />
        </>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Card title="Top 50 delegators">
        <Table
          columns={columns}
          data={data}
          loading={loading}
          total={{ count: Math.min(total, 50), title: "Results" }}
          initialized={initialized}
          pagination={{
            onChange: (page, size) => {
              setQuery({ page, size });
            },
            page: currentPage || 0,
            total: Math.min(total, 50),
          }}
          error={error}
        />
      </Card>
    </StyledContainer>
  );
};
export default TopDelegators;
