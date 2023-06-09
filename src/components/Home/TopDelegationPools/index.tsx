import { useHistory } from "react-router-dom";
import { Box } from "@mui/system";

import useFetch from "src/commons/hooks/useFetch";
import { details, routers } from "src/commons/routers";
import { formatADAFull, formatPercent } from "src/commons/utils/helper";
import ViewAllButton from "src/components/commons/ViewAllButton";
import { Column } from "src/components/commons/Table";
import RateWithIcon from "src/components/commons/RateWithIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import FormNowMessage from "src/components/commons/FormNowMessage";

import {
  Actions,
  DelegateTable,
  Header,
  PoolName,
  ProgressContainer,
  ProgressTitle,
  StyledLinearProgress,
  TimeDuration,
  TimeDurationSm,
  Title,
  TopDelegateContainer
} from "./style";

const TopDelegationPools = () => {
  const { data, loading, initialized, lastUpdated } = useFetch<DelegationPool[]>(
    `${API.DELEGATION.TOP}?page=1&size=4`,
    undefined,
    false,
    REFRESH_TIMES.TOP_DELEGATION_POOLS
  );
  const history = useHistory();

  const columns: Column<DelegationPool>[] = [
    {
      title: "Pool",
      key: "name",
      render: (r) => <PoolName to={`/delegation-pool/${r.poolId}`}>{r.poolName || r.poolId}</PoolName>
    },
    {
      title: "Pool size (A)",
      key: "size",
      render: (r) => formatADAFull(r.poolSize || 0)
    },
    {
      title: "Reward",
      key: "reward",
      render: (r) => <RateWithIcon value={r.reward} multiple={1} />
    },
    {
      title: "Fee (A)",
      key: "fee",
      render: (r) => (
        <CustomTooltip title={`${r.feePercent * 100 || 0}% (${formatADAFull(r.feeAmount)} A)`}>
          <Box display="inline-block">
            {formatPercent(r.feePercent || 0)} ({formatADAFull(r.feeAmount)} A)
          </Box>
        </CustomTooltip>
      )
    },
    {
      title: "Declared Pledge (A)",
      key: "declaredPledge",
      render: (r) => <Box display="inline-block">{formatADAFull(r.pledge)}</Box>
    },
    {
      title: "Saturation",
      key: "output",
      render: (r) => {
        return (
          <ProgressContainer>
            <CustomTooltip title={`${r.saturation}%`}>
              <ProgressTitle>{formatPercent(r.saturation / 100)}</ProgressTitle>
            </CustomTooltip>
            <CustomTooltip title={`${r.saturation}%`}>
              <StyledLinearProgress
                variant="determinate"
                value={r.saturation > 100 ? 100 : r.saturation}
                style={{ width: 150 }}
              />
            </CustomTooltip>
          </ProgressContainer>
        );
      }
    }
  ];
  return (
    <TopDelegateContainer>
      <Header>
        <Title>Top Delegation Pools</Title>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <ViewAllButton data-testid="view-all" to={routers.DELEGATION_POOLS} />
        </Actions>
      </Header>
      <TimeDurationSm>
        <FormNowMessage time={lastUpdated} />
      </TimeDurationSm>
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
