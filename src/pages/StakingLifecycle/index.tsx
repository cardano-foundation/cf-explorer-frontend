import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TabContext } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";
import { pick } from "lodash";

import useFetchList from "src/commons/hooks/useFetchList";
import { lists } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import CustomFilter, { FilterParams } from "src/components/commons/CustomFilter";
import PoolLifecycle from "src/components/PoolLifecycle";
import StakekeySummary from "src/components/StakekeySummary";
import NoRecord from "src/components/commons/NoRecord";
import CustomTabTitle from "src/components/commons/CustomTabTitle";
import { IPoolReportList, IStakeKeySummary } from "src/types/report";

import StakingLifeCycleSearch from "../../components/StakingLifeCycleSearch";
import {
  FilterHead,
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
const validTabs: LifecycleReportType[] = ["stake-key-reports", "pool-reports"];

const StakingLifecycle: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { userData } = useSelector(({ user }: RootState) => user);
  const [{ page, size }, setPagi] = useState<{ page: number; size: number; sort?: string }>(DEFAULT_PAGINING);
  const [params, setParams] = useState<FilterParams | null>({ sort: "" });
  const { tab } = useParams<{ tab?: LifecycleReportType }>();

  const validTab: LifecycleReportType = tab || "stake-key-reports";
  const query = {
    page,
    size,
    ...params,
    reportName: params?.search
  };

  useEffect(() => {
    document.title = `${t("common.savedReports")} | ${t("head.page.dashboard")}`;
  }, [t]);

  const setSort = (newSort?: string) => {
    setPagi((prevState) => ({ ...prevState, sort: newSort }));
    if (newSort === "") {
      history.replace({ search: stringify(pick({ page, size }, ["page", "size", "retired"])) });
    } else {
      history.replace({ search: stringify({ page, size, sort: newSort }) });
    }
  };

  const handleSort = (sort?: string) => {
    setParams({ ...params, sort });
    sort ? setSort(sort) : setSort("");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlSort = queryParams.get("sort");
    if (urlSort) {
      handleSort(urlSort);
    }
  }, []);

  useEffect(() => {
    document.title = `${t("common.savedReports")} | ${t("head.page.dashboard")}`;
  }, [t]);

  const handleChange = (e: React.SyntheticEvent, newValue: LifecycleReportType) => {
    setParams({});
    history.replace(lists.dashboard(newValue));
    handlePaginationChange(DEFAULT_PAGINING);
  };

  const handlePaginationChange = ({ page, size }: { page: number; size: number }) => setPagi({ page, size });

  const fetchDataPool = useFetchList<IPoolReportList>(
    validTab === "pool-reports" ? API.REPORT.POOL_REPORT_SUMMARY : "",
    query
  );
  const fetchDataStake = useFetchList<IStakeKeySummary>(
    validTab === "stake-key-reports" ? API.REPORT.STAKE_KEY_SUMMARY : "",
    query
  );

  const totalResult = validTab === "pool-reports" ? fetchDataPool.total : fetchDataStake.total;

  if (!validTabs.includes(validTab)) return <NoRecord />;

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
        <TextHeadline>{t("common.yourSavedReports")}</TextHeadline>
        <FilterHead>
          <WrapFilterDescription>
            {t("common.showing")} {totalResult} {totalResult <= 1 ? t("common.result") : t("common.results")}
          </WrapFilterDescription>
          <CustomFilter sortKey="id" filterValue={params} onChange={setParams} searchLabel={t("Search report name")} />
        </FilterHead>
      </TitleHead>
      <TabContext value={validTab}>
        <TabHeader>
          <StyledTabs
            value={validTab}
            onChange={handleChange}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary[200]}` }}
            TabIndicatorProps={{ sx: { backgroundColor: (theme) => theme.palette.primary.main, height: 4 } }}
            scrollButtons="auto"
            variant="scrollable"
            aria-label="lab API tabs example"
          >
            <StyledTab
              value={"stake-key-reports"}
              label={
                <CustomTabTitle active={validTab === "stake-key-reports"}>
                  {t("common.stakeAddressReports")}
                </CustomTabTitle>
              }
            />
            <StyledTab
              value={"pool-reports"}
              label={<CustomTabTitle active={validTab === "pool-reports"}>{t("common.poolReports")}</CustomTabTitle>}
            />
          </StyledTabs>
        </TabHeader>
        <TabContent value={"stake-key-reports"}>
          <StakekeySummary
            pagination={{ page, size }}
            onPagination={handlePaginationChange}
            onSort={handleSort}
            fetchData={fetchDataStake}
          />
        </TabContent>
        <TabContent value={"pool-reports"}>
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
