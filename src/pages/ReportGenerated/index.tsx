import { Container } from "@mui/material";
import ReportGeneratedTabs, { TabsItem } from "../../components/ReportGeneratedTabs";
import StakekeySummary from "../../components/StakekeySummary";
import PoolLifecycle from "../../components/PoolLifecycle";

const tabItems: TabsItem[] = [
  {
    value: "1",
    label: "Stake Key summary",
    component: <StakekeySummary />,
  },
  {
    value: "2",
    label: "Pool lifecycle",
    component: <PoolLifecycle />,
  },
];
const ReportGenerated = () => {
  return (
    <Container>
      <ReportGeneratedTabs tabsItem={tabItems} />
    </Container>
  );
};

export default ReportGenerated;
