import { Box } from '@mui/material';
import TabularOverview from '../../../TabularView/TabularOverview';
import StakeTab from '../../../TabularView/StakeTab';
import {
  DelegationIcon,
  DeredistrationIcon,
  RegistrationIcon,
  RewardsDistributionIcon,
  RewardsWithdrawalIcon
} from '../../../../commons/resources';
import StakeRegistrationTab from '../../../TabularView/StakeTab/Tabs/StakeRegistrationTab';
import DelegationTab from '../../../TabularView/StakeTab/Tabs/DelegationTab';
import RewardsDistributionTab from '../../../TabularView/StakeTab/Tabs/RewardsDistributionTab';
import WithdrawalHistoryTab from '../../../TabularView/StakeTab/Tabs/WithdrawalHistoryTab';
import DeregistrationTab from '../../../TabularView/StakeTab/Tabs/DeregistrationTab';

const tabs: {
  icon: React.FC;
  label: React.ReactNode;
  key: TTabularTabKey;
  component: React.ReactNode;
}[] = [
  {
    icon: RegistrationIcon,
    label: 'Stake Key Registration',
    key: 'registration',
    component: <StakeRegistrationTab />
  },
  {
    icon: DelegationIcon,
    label: 'Delegation History',
    key: 'delegation',
    component: <DelegationTab />
  },
  {
    icon: RewardsDistributionIcon,
    label: 'Rewards Distribution',
    key: 'rewards',
    component: <RewardsDistributionTab />
  },
  {
    icon: RewardsWithdrawalIcon,
    label: 'Withdrawal History',
    key: 'withdrawal-history',
    component: <WithdrawalHistoryTab />
  },
  {
    icon: DeredistrationIcon,
    label: 'Deregistration',
    key: 'deregistration',
    component: <DeregistrationTab />
  }
];
const Tablular = () => {
  return (
    <Box mt={5}>
      <TabularOverview />
      <StakeTab tabs={tabs} />
    </Box>
  );
};

export default Tablular;
