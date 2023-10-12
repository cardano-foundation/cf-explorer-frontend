import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { details, routers } from "src/commons/routers";
import { formatADAFull, formatPercent, getShortHash } from "src/commons/utils/helper";
import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";
import { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { API } from "src/commons/utils/api";
import FormNowMessage from "src/components/commons/FormNowMessage";
import ADAicon from "src/components/commons/ADAIcon";

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
  const { t } = useTranslation();
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);

  const { data, loading, initialized, lastUpdated } = useFetch<DelegationPool[]>(
    `${API.DELEGATION.TOP}?page=0&size=5`,
    undefined,
    false,
    blockNo
  );
  const history = useHistory();

  const columns: Column<DelegationPool>[] = [
    {
      title: t("glossary.pool"),
      key: "Pool",
      minWidth: "40px",
      maxWidth: "350px",
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <PoolName to={details.delegation(r.poolId)}>
            <Box component={"span"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
              {r.poolName || `${getShortHash(r.poolId)}`}
            </Box>
          </PoolName>
        </CustomTooltip>
      )
    },
    {
      title: (
        <Box component="span">
          {t("glossary.poolSize")} (<ADAicon />)
        </Box>
      ),
      key: "poolSize",
      minWidth: "120px",
      render: (r) => <Box component={"span"}>{formatADAFull(r.poolSize)}</Box>
    },
    {
      title: t("glossary.saturation"),
      key: "Saturation",
      minWidth: "200px",
      render: (r) => (
        <Box display="flex" alignItems="center" justifyContent={"flex-start"}>
          <Box component={"span"} mr={1} flexGrow={1} textAlign={"right"} maxWidth={"55px"}>
            {formatPercent(r.saturation / 100) || `0%`}
          </Box>
          <StyledLinearProgress
            variant="determinate"
            saturation={r.saturation}
            value={r.saturation > 100 ? 100 : get(r, "saturation", 0)}
          />
        </Box>
      )
    },
    {
      title: t("glossary.blocksInCurrentEpoch"),
      key: "epochBlock",
      render: (r) => r.epochBlock || 0
    },
    {
      title: t("glossary.blocksLifetime"),
      key: "lifetimeBlock",
      render: (r) => r.lifetimeBlock || 0
    }
  ];
  return (
    <TopDelegateContainer data-testid="home-top-delegation">
      <Header>
        <Title>
          {t("glossary.pools")}
          <SubHeader>{t("info.sortedBlock")}</SubHeader>
        </Title>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <ViewAllButtonExternal to={routers.DELEGATION_POOLS} />
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
