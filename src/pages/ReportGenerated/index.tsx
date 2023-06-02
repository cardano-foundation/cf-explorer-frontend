import { useEffect } from "react";
import { Container } from "@mui/material";

import ReportGeneratedTabs, { TabsItem } from "src/components/ReportGeneratedTabs";
import StakekeySummary from "src/components/StakekeySummary";
import PoolLifecycle from "src/components/PoolLifecycle";

export const defaultReportTab = "stake";

const tabItems: TabsItem[] = [
  {
    value: "stake-key",
    label: "Stake Key reports",
    component: <StakekeySummary />
  },
  {
    value: "pools",
    label: "Pool reports",
    component: <PoolLifecycle />
  }
];
const ReportGenerated = () => {
  useEffect(() => {
    document.title = "Report Generated | Cardano Explorer";
  }, []);

  return (
    <Container>
      <ReportGeneratedTabs tabsItem={tabItems} />
    </Container>
  );
};

export default ReportGenerated;
