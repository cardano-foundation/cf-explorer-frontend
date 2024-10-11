import { Box } from "@mui/material";
import { t } from "i18next";

import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";

import Card from "../commons/Card";
import Description from "./styles";
import CardOverview from "./CardOverview";
import ChartOverview from "./ChartOverview";
import TabOverview from "./TabOverview";
import NoRecord from "../commons/NoRecord";
import FetchDataErr from "../commons/FetchDataErr";
import PreDefinedVotesChart from "./ChartPreDefined";

export default function OverviewComponent() {
  const { data, loading, error, statusError } = useFetch<GOoverview>(API.GOVERNANCE_OVERVIEW.OVERVIEW);
  const dataCard = {
    activeDReps: data?.activeDReps,
    activeSPOs: data?.activeSPOs,
    activeCommittees: data?.activeCommittees
  };

  const dataChart = {
    totalGovActions: data?.totalGovActions,
    govStatusMap: data?.govStatusMap,
    govCountMap: data?.govCountMap
  };
  if (error && (statusError || 0) < 500) return <NoRecord />;
  if (error && (statusError || 0) >= 500) return <FetchDataErr />;
  return (
    <Box>
      <Card marginBottom={"32px"} title={t("glossary.overview")}>
        <Description>{t("overview.page.description")}</Description>
      </Card>
      <CardOverview loading={loading} data={dataCard} />
      <ChartOverview loading={loading} data={dataChart} />
      <PreDefinedVotesChart />
      <TabOverview />
    </Box>
  );
}
