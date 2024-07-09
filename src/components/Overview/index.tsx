import { Box } from "@mui/material";
import { t } from "i18next";

import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";

import Card from "../commons/Card";
import Description from "./styles";
import CardOverview from "./CardOverview";
import ChartOverview from "./ChartOverview";
import TabOverview from "./TabOverview";

export default function OverviewComponent() {
  const { data, loading } = useFetch<GOoverview>(API.GOVERNANCE_OVERVIEW.OVERVIEW);
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

  return (
    <Box>
      <Card marginBottom={"32px"} title={t("glossary.overview")}>
        <Description>{t("overview.page.description")}</Description>
      </Card>
      <CardOverview loading={loading} data={dataCard} />
      <ChartOverview loading={loading} data={dataChart} />
      <TabOverview />
    </Box>
  );
}
