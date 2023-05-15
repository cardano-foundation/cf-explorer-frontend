import { Container } from '@mui/material';
import ReportGeneratedTabs, { TabsItem } from '../../components/ReportGeneratedTabs';
import StakekeySummary from '../../components/StakekeySummary';
import PoolLifecycle from '../../components/PoolLifecycle';

export const defaultReportTab = "stake";

const tabItems: TabsItem[] = [
  {
<<<<<<< HEAD
    value: "stake",
    label: "Stake Key summary",
    component: <StakekeySummary />,
  },
  {
    value: "pool",
    label: "Pool lifecycle",
    component: <PoolLifecycle />,
  },
=======
    value: '1',
    label: 'Stake Key summary',
    component: <StakekeySummary />
  },
  {
    value: '2',
    label: 'Pool lifecycle',
    component: <PoolLifecycle />
  }
>>>>>>> 9ed6383adceb3cd61b5b4abdc7495fec62b2b3c0
];
const ReportGenerated = () => {
  return (
    <Container>
      <ReportGeneratedTabs defaultTab={defaultReportTab} tabsItem={tabItems} />
    </Container>
  );
};

export default ReportGenerated;
