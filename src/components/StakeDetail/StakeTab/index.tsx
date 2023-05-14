import React from 'react';
import { Tab, Box, useTheme } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { ReactComponent as DelegationHistoryIcon } from '../../../commons/resources/icons/delegationHistory.svg';
import { ReactComponent as StakeKeyHistoryIcon } from '../../../commons/resources/icons/stateKeyHistory.svg';
import { ReactComponent as WithdrawHistoryIcon } from '../../../commons/resources/icons/withdrawHistory.svg';
import { ReactComponent as InstantaneousHistoryIcon } from '../../../commons/resources/icons/instantaneousHistory.svg';
import { ReactComponent as TransactionIcon } from '../../../commons/resources/icons/transactionIcon.svg';
import { StyledTabList, TitleTab } from './styles';
import { useHistory, useParams } from 'react-router-dom';
import DelegationHistoryTab from './Tabs/DelegationHistoryTab';
import StakeHistoryTab from './Tabs/StakeHistoryTab';
import WithdrawalHistoryTab from './Tabs/WithdrawalHistoryTab';
import InstantaneousTab from './Tabs/InstantaneousTab';
import TransactionTab from './Tabs/TransactionTab';
import { details } from '../../../commons/routers';

const tabs: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: React.ReactNode;
  key: TabStakeDetail;
  component: React.ReactNode;
}[] = [
  {
    icon: DelegationHistoryIcon,
    label: 'Delegation History',
    key: 'delegation',
    component: <DelegationHistoryTab />
  },
  {
    icon: StakeKeyHistoryIcon,
    label: 'Stake Key History',
    key: 'stake-key',
    component: <StakeHistoryTab />
  },
  {
    icon: WithdrawHistoryIcon,
    label: 'Withdrawal History',
    key: 'withdrawal',
    component: <WithdrawalHistoryTab />
  },
  {
    icon: InstantaneousHistoryIcon,
    label: 'Instantaneous Rewards',
    key: 'instantaneous',
    component: <InstantaneousTab />
  },
  {
    icon: TransactionIcon,
    label: 'Transactions',
    key: 'transactions',
    component: <TransactionTab />
  }
];

const StakeTab = () => {
  const { stakeId, tabActive = 'delegation' } = useParams<{ stakeId: string; tabActive?: TabStakeDetail }>();
  const history = useHistory();
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, tab: TabStakeDetail) => {
    history.push({ pathname: details.stake(stakeId || '', tab) });
  };

  return (
    <Box mt={4}>
      <TabContext value={tabActive}>
        <Box sx={{ borderBottom: (theme) => `1px solid ${theme.palette.border.secondary}` }}>
          <StyledTabList
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: theme.palette.primary.main } }}
          >
            {tabs.map(({ icon: Icon, key, label }) => (
              <Tab
                key={key}
                value={key}
                style={{ padding: '12px 0px', marginRight: 40 }}
                label={
                  <Box display={'flex'} alignItems='center'>
                    <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.text.hint} />
                    <TitleTab pl={1} active={key === tabActive}>
                      {label}
                    </TitleTab>
                  </Box>
                }
              />
            ))}
          </StyledTabList>
        </Box>
        {tabs.map((item) => (
          <TabPanel key={item.key} value={item.key} style={{ padding: 0 }}>
            {item.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default StakeTab;
