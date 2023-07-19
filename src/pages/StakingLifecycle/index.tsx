import { Box, Container, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TabContext } from "@mui/lab";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import CustomFilter, { FilterParams } from "src/components/commons/CustomFilter";
import PoolLifecycle from "src/components/PoolLifecycle";
import StakekeySummary from "src/components/StakekeySummary";

import StakingLifeCycleSearch from "../StakingLifeCycleSearch";
import {
  FilterHead,
  StyledTabLabel,
  TextHeadline,
  TitleHead,
  WrapFilterDescription,
  TabContent,
  TabHeader,
  StyledTab,
  StyledTabs
} from "./styles";

export interface SavedReport {
  timestamp: Date | string;
  entity: string;
  status: number;
  downloadUrl: string;
}

const DEFAULT_PAGINING = { page: 0, size: 50 };

const StakingLifecycle: React.FC = () => {
  const history = useHistory();
  const { userData } = useSelector(({ user }: RootState) => user);
  const [{ page, size }, setPagi] = useState<{ page: number; size: number; sort?: string }>(DEFAULT_PAGINING);
  const [params, setParams] = useState<FilterParams>({});
  const { tab = "stake-key" } = useParams<{ tab: "stake-key" | "pools" }>();
  const query = {
    page,
    size,
    ...params,
    reportName: params.search
  };

  useEffect(() => {
    document.title = "Saved Reports | Iris - Cardano Blockchain Explorer";
  }, []);

  const handleSort = (sort?: string) => setParams({ ...params, sort });

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setParams({});
    history.replace(details.dashboard(newValue));
    handlePaginationChange(DEFAULT_PAGINING);
  };

  const handlePaginationChange = ({ page, size }: { page: number; size: number }) => setPagi({ page, size });

  const fetchDataPool = useFetchList<IPoolReportList>(tab === "pools" ? API.REPORT.POOL_REPORT_SUMMARY : "", query);
  const fetchDataStake = useFetchList<IStakeKeySummary>(tab === "stake-key" ? API.REPORT.STAKE_KEY_SUMMARY : "", query);
  const totalResult = tab === "pools" ? fetchDataPool.total : fetchDataStake.total;
  if (!userData)
    return (
      <Container>
        <StakingLifeCycleSearch />
      </Container>
    );

  return (
    <Container>
      <StakingLifeCycleSearch />
      <TitleHead>
        <TextHeadline>Saved reports</TextHeadline>
        <FilterHead>
          <WrapFilterDescription>
            Showing {totalResult} {totalResult > 1 ? "results" : "result"}
          </WrapFilterDescription>
          <CustomFilter sortKey="id" filterValue={params} onChange={setParams} searchLabel="Search report name" />
        </FilterHead>
      </TitleHead>
      <TabContext value={tab}>
        <TabHeader>
          <Tabs style={{ flex: 1 }}>
            <Box width={"100%"}>
              <StyledTabs
                value={tab}
                onChange={handleChange}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.border.main}` }}
                TabIndicatorProps={{ sx: { backgroundColor: (theme) => theme.palette.primary.main, height: 4 } }}
                scrollButtons="auto"
                variant="scrollable"
                aria-label="lab API tabs example"
              >
                <StyledTab
                  value={"stake-key"}
                  label={<StyledTabLabel active={+(tab === "stake-key")}>Stake Address Reports</StyledTabLabel>}
                />
                <StyledTab
                  value={"pools"}
                  label={<StyledTabLabel active={+(tab === "pools")}>Pool Reports</StyledTabLabel>}
                />
              </StyledTabs>
            </Box>
          </Tabs>
        </TabHeader>
        <TabContent value={"stake-key"}>
          <StakekeySummary
            pagination={{ page, size }}
            onPagination={handlePaginationChange}
            onSort={handleSort}
            fetchData={fetchDataStake}
          />
        </TabContent>
        <TabContent value={"pools"}>
          <PoolLifecycle
            pagination={{ page, size }}
            onPagination={handlePaginationChange}
            onSort={handleSort}
            fetchData={fetchDataPool}
          />
        </TabContent>
      </TabContext>
    </Container>
  );
};

export default StakingLifecycle;
