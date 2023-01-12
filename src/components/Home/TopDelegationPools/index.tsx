import React from "react";
import { useHistory } from "react-router-dom";
import useFetch from "../../../commons/hooks/useFetch";
import { details, routers } from "../../../commons/routers";
import { formatADA, formatPercent } from "../../../commons/utils/helper";
import ViewAllButton from "../../commons/ViewAllButton";
import { Column } from "../../commons/Table";
import {
  DelegateTable,
  Header,
  PoolName,
  ProgressContainer,
  ProgressTitle,
  StyledLinearProgress,
  Title,
  TopDelegateContainer,
} from "./style";
import RateWithIcon from "../../commons/RateWithIcon";

interface Props {}

const TopDelegationPools: React.FC<Props> = () => {
  const { data, loading, initialized } = useFetch<DelegationPool[]>(`delegation/top?page=1&size=4`);
  const history = useHistory();
  data?.forEach(item => {
    if (!item.poolSize) {
      item.poolSize = Math.floor(Math.random() * 10 ** 13);
      item.feePercent = Number((Math.floor(Math.random() * 2 * 10) / 10).toFixed(1)) + 1;
      item.feeAmount = (item.poolSize * item.feePercent) / 100;
      item.reward = Math.floor((Math.random() * 20 * 100) / 100) + 10;
      item.saturation = Math.floor(Math.random() * 60) + 30;
    }
  });
  const columns: Column<DelegationPool>[] = [
    {
      title: "Pool",
      key: "name",
      render: r => <PoolName to={`/delegation-pool/${r.poolId}`}>{r.poolName || r.poolId}</PoolName>,
    },
    {
      title: "Pool size (A)",
      key: "size",
      render: r => formatADA(r.poolSize / 10 ** 6),
    },
    {
      title: "Reward",
      key: "reward",
      render: r => <RateWithIcon value={r.reward} multiple={100} />,
    },
    {
      title: "Fee (A)",
      key: "fee",
      render: r => `${formatPercent(r.feePercent || 0)} (${formatADA(r.feeAmount)} A)`,
    },
    {
      title: "Declared Pledge (A)",
      key: "declaredPledge",
      render: r => formatADA(r.pledge),
    },
    {
      title: "Saturation",
      key: "output",
      render: r => (
        <ProgressContainer>
          <ProgressTitle>{formatPercent(r.saturation / 100)}</ProgressTitle>
          <StyledLinearProgress variant="determinate" value={r.saturation} style={{ width: 150 }} />
        </ProgressContainer>
      ),
    },
  ];
  return (
    <TopDelegateContainer>
      <Header>
        <Title>Top Delegation Pools</Title>
        <ViewAllButton to={routers.DELEGATION_POOLS} />
      </Header>
      <DelegateTable
        loading={loading}
        initialized={initialized}
        columns={columns}
        data={data?.slice(0, 3) || []}
        onClickRow={(_, r: DelegationPool) => history.push(details.delegation(r.poolId))}
      />
    </TopDelegateContainer>
  );
};

export default TopDelegationPools;
