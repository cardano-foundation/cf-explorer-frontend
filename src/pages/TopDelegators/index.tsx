import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { details } from "../../commons/routers";
import { formatADA, getPageInfo, getShortWallet } from "../../commons/utils/helper";

import Card from "../../components/commons/Card";
import Table from "../../components/commons/Table";
import { ADAToken } from "../../components/commons/Token";
import { Column } from "../../types/table";
import { StyledContainer, StyledLink } from "./styles";

const TopDelegators = () => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Contracts>("/stake/top-delegators", pageInfo);

  const columns: Column<TopDelegator>[] = [
    {
      title: "#",
      minWidth: 30,
      key: "index",
      render: (r, idx) => idx + 1 + pageInfo.page * pageInfo.size,
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
          {...fetchData}
          columns={columns}
          total={{ title: "Results", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
        />
      </Card>
    </StyledContainer>
  );
};
export default TopDelegators;
