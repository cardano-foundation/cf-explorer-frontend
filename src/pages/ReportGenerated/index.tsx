import { Container } from "@mui/material";
import ReportGeneratedTabs, { TabsItem } from "../../components/ReportGeneratedTabs";
import StakekeySummary from "../../components/StakekeySummary";
import PoolLifecycle from "../../components/PoolLifecycle";
import { useEffect } from "react";

export const defaultReportTab = "stake";

const tabItems: TabsItem[] = [
  {
    value: "stake-key",
    label: "Stake Key summary",
    component: <StakekeySummary />
  },
  {
    value: "pools",
    label: "Pool lifecycle",
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
