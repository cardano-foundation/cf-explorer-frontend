/* eslint-disable */
import { Box, Container, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { useScreen } from "src/commons/hooks/useScreen";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import FilterReport, { FilterParams } from "src/components/FilterReport";
import { WrapFilterDescription } from "src/components/StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";

import { TabContext } from "@mui/lab";
import PoolLifecycle from "src/components/PoolLifecycle";
import { TabContent, TabHeader } from "src/components/ReportGeneratedTabs/styles";
import StakekeySummary from "src/components/StakekeySummary";
import { StyledTab, StyledTabs } from "../RegistrationPools/styles";
import StakingLifeCycleSearch from "../StakingLifeCycleSearch";
import { FilterHead, StyledTabLabel, TextHeadline, TitleHead } from "./styles";
import { useSelector } from "react-redux";

export interface SavedReport {
  timestamp: Date | string;
  entity: string;
  status: number;
  downloadUrl: string;
}
const DEFAULT_PARAMS = {
  sort: undefined,
  toDate: undefined,
  fromDate: undefined,
  reportName: undefined
};
const DEFAULT_PAGINING = { page: 0, size: 50 };
const Dashboard: React.FC = () => {
  const history = useHistory();
  const { userData } = useSelector(({ user }: RootState) => user);
  const [onDownload, setOnDownload] = useState<number | false>(false);
  const [sort, setSort] = useState<string>("");
  const [{ page, size }, setPagi] = useState<{ page: number; size: number; sort?: string }>(DEFAULT_PAGINING);
  const [params, setParams] = useState<any>(DEFAULT_PARAMS);
  const { tab = "stake-key" } = useParams<{ tab: "stake-key" | "pools" }>();
  const query = {
    page,
    size,
    ...params,
    sort: sort || params.sort
  };

  useEffect(() => {
    document.title = "Saved Reports | Cardano Explorer";
  }, []);
  const handleSort = (sort: string = "") => setSort(sort);

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    handleFilterChange(DEFAULT_PARAMS);
    history.replace(details.dashboard(newValue));
    handlePaginationChange(DEFAULT_PAGINING);
  };

  const handlePaginationChange = ({ page, size }: { page: number; size: number }) => setPagi({ page, size });

  const handleFilterChange = (params: FilterParams) => {
    const { sort, toDate, fromDate, txHash } = params;
    const body: any = {};
    if (sort) {
      setSort("");
      body.sort = params?.sort?.replace("time", "id");
    }
    if (toDate) {
      body.toDate = params?.toDate;
    }
    if (fromDate) {
      body.fromDate = params?.fromDate;
    }
    if (txHash) {
      body.reportName = txHash;
    }
    setParams(body);
  };

  const fetchDataPool = useFetchList<IPoolReportList>(tab === "pools" ? API.REPORT.POOL_REPORT_SUMMARY : "", query);
  const fetchDataStake = useFetchList<IStakeKeySummary>(tab === "stake-key" ? API.REPORT.STAKE_KEY_SUMMARY : "", query);
  const { isMobile } = useScreen();
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
          <FilterReport filterValue={params} onFilterValueChange={handleFilterChange} />
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

export default Dashboard;
