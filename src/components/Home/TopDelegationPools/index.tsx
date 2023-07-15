import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { get } from "lodash";

import useFetch from "src/commons/hooks/useFetch";
import { details, routers } from "src/commons/routers";
import { formatADAFull, formatPercent, getShortWallet } from "src/commons/utils/helper";
import ViewAllButton from "src/components/commons/ViewAllButton";
import { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";
import FormNowMessage from "src/components/commons/FormNowMessage";

import {
  Actions,
  DelegateTable,
  Header,
  PoolName,
  StyledLinearProgress,
  SubHeader,
  TimeDuration,
  TimeDurationSm,
  Title,
  TopDelegateContainer
} from "./style";

const TopDelegationPools = () => {
  const { data, loading, initialized, lastUpdated } = useFetch<DelegationPool[]>(
    `${API.DELEGATION.TOP}?page=0&size=5`,
    undefined,
    false,
    REFRESH_TIMES.TOP_DELEGATION_POOLS
  );
  const history = useHistory();

  const columns: Column<DelegationPool>[] = [
    {
      title: "Pool",
      key: "Pool",
      minWidth: "40px",
      maxWidth: "350px",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <PoolName to={details.delegation(r.poolId)}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {r.poolName || `${getShortWallet(r.poolId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: "Pool Size (A)",
      key: "poolSize",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{formatADAFull(r.poolSize)}</Box>
    },
    {
      title: "Saturation",
      key: "Saturation",
      minWidth: "200px",
      render: (r) => (
        <Box display="flex" alignItems="center" justifyContent={"end"}>
          <Box component={"span"} mr={1}>
            {formatPercent(r.saturation / 100) || `0%`}
          </Box>
          <StyledLinearProgress
            saturation={r.saturation}
            variant="determinate"
            value={r.saturation > 100 ? 100 : get(r, "saturation", 0)}
          />
        </Box>
      )
    },
    {
      title: "Blocks In Current Epoch",
      key: "epochBlock",
      render: (r) => r.epochBlock || 0
    },
    {
      title: "Blocks Lifetime",
      key: "lifetimeBlock",
      render: (r) => r.lifetimeBlock || 0
    },
    {
      title: (
        <CustomTooltip title="Gross average return during pool’s lifetime">
          <span>Lifetime ROS</span>
        </CustomTooltip>
      ),
      key: "lifetimeRos",
      render: (r) => r.lifetimeRos || 0
    }
  ];
  return (
    <TopDelegateContainer data-testid="home-top-delegation">
      <Header>
        <Title>
          Pools
          <SubHeader>Sorted by blocks produced in the current epoch</SubHeader>
        </Title>
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
        data={data || []}
        onClickRow={(_, r: DelegationPool) => history.push(details.delegation(r.poolId))}
      />
    </TopDelegateContainer>
  );
};

export default TopDelegationPools;
