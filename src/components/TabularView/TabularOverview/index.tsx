import { Box, BoxProps, Grid, Icon } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import {
  WalletGreenIcon,
  BgGray,
  PaymentWallet,
  RewardWithdrawn,
  DelegationTo,
  RewardAccount,
  TransactionIcon
} from '../../../commons/resources/index';
import { CardOverview, CardTitle, CardValue, TransferButton, WrapIcon, WrapWalletIcon } from './styles';
import { API } from '../../../commons/utils/api';
import useFetch from '../../../commons/hooks/useFetch';
import { formatADAFull } from '../../../commons/utils/helper';
import ADAicon from '../../commons/ADAIcon';
import { useState } from 'react';
import ADATransferModal from '../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal';
import { details } from '../../../commons/routers';
import { useScreen } from '../../../commons/hooks/useScreen';

export const GreenWalletIcon = (props: BoxProps) => {
  return (
    <WrapWalletIcon {...props}>
      <Icon component={WalletGreenIcon} />
    </WrapWalletIcon>
  );
};

type TCardAmount = {
  amount?: number;
};

const CardAmount = ({ amount }: TCardAmount) => {
  return (
    <Box display='flex' alignItems='center'>
      <GreenWalletIcon mr={2} />
      <CardValue>
        {formatADAFull(amount)}
        <ADAicon pl={'8px'} />
      </CardValue>
    </Box>
  );
};

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  mainIcon: React.ReactNode;
};

const GridItem = ({ title, action, value, mainIcon }: TGridItem) => {
  const { isMobile } = useScreen();
  return (
    <Grid item xs={12} md={6}>
      <CardOverview
        mr={isMobile ? 2 : 0}
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent={`${isMobile ? 'center' : 'space-between'}`}
      >
        <Icon component={BgGray} />
        <Box display='flex' alignItems='center' gap='12px'>
          <WrapIcon pt={`${isMobile ? '30px' : '0px'}`}>{mainIcon}</WrapIcon>
          <Box textAlign='start'>
            <CardTitle>{title}</CardTitle>
            {value}
          </Box>
        </Box>
        <Box display='flex' margin='0 auto' ml='120px' mt={`${isMobile ? '-10px' : '0px'}`}>
          {' '}
          {action}
        </Box>
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}`, undefined, false);

  return (
    <Grid container spacing={2}>
      <GridItem
        title='Payment Wallet'
        mainIcon={<PaymentWallet />}
        value={<CardAmount amount={data?.totalStake} />}
        action={
          <TransferButton
            onClick={() => setOpen(true)}
            variant='contained'
            startIcon={<Icon fill='white' component={TransactionIcon} />}
          >
            ADA Transfers
          </TransferButton>
        }
      />
      <GridItem
        title='Reward Account'
        mainIcon={<RewardAccount />}
        value={<CardAmount amount={data?.rewardAvailable} />}
      />
      <GridItem
        title='Rewards Withdrawn'
        mainIcon={<RewardWithdrawn />}
        value={<CardAmount amount={data?.rewardWithdrawn} />}
      />
      <GridItem
        title='Delegating To'
        mainIcon={<DelegationTo />}
        value={
          <Box component={Link} to={details.delegation(data?.pool?.poolId)} display='flex' alignItems='center'>
            <CardValue>{data?.pool?.poolName}</CardValue>
          </Box>
        }
      />
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Grid>
  );
};

export default TabularOverview;
