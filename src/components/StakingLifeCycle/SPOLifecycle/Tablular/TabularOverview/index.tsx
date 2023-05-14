import { Box, BoxProps, Grid, Icon } from '@mui/material';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useFetch from '../../../../../commons/hooks/useFetch';
import {
  BgBlue,
  BgCardWhite,
  BgGreen,
  BgPink,
  OwnerAccIC,
  PoolsizeIcon,
  ReewardAvalible,
  StatusIC,
  WalletGreenIcon
} from '../../../../../commons/resources';
import { API } from '../../../../../commons/utils/api';
import { formatADAFull, formatHash } from '../../../../../commons/utils/helper';
import { CardOverview, CardTitle, CardValue, ClickAbleLink, ViewMoreButton, WrapIcon, WrapWalletIcon } from './styles';
import { DotsIcon } from '../../../../PoolRegistrationCertificate/styles';
import ViewMoreAddressModal from '../../../../ViewMoreAddressModal';

export const GreenWalletIcon = (props: BoxProps) => {
  return (
    <WrapWalletIcon {...props}>
      <Icon component={WalletGreenIcon} />
    </WrapWalletIcon>
  );
};
export interface OverviewCardProps {
  title?: string;
  subtitle?: string;
}

const STATUS = {
  ACTIVE: ['Active', 'rgb(0,128,0)'],
  INACTIVE: ['Inactive', 'rgb(255,0,0)'],
  RETIRING: ['Retiring ', 'rgb(255,153,0)']
};

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  bgType: 'blue' | 'green' | 'red' | 'white';
  mainIcon: React.ReactNode;
};

const GridItem = ({ title, action, value, bgType, mainIcon }: TGridItem) => {
  const bg = {
    blue: BgBlue,
    green: BgGreen,
    red: BgPink,
    white: BgCardWhite
  }[bgType];

  return (
    <Grid item xs={6}>
      <CardOverview>
        <Icon component={bg} />
        <Box display='flex' alignItems='center' gap='12px'>
          <WrapIcon>{mainIcon}</WrapIcon>
          <Box textAlign='start'>
            <CardTitle>{title}</CardTitle>
            {value}
          </Box>
        </Box>
        {action}
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { poolId = '' } = useParams<{ poolId: string }>();
  const { data } = useFetch<PoolInfo>(poolId ? API.SPO_LIFECYCLE.POOL_INFO(poolId) : '');
  const history = useHistory();
  const onOwnerItemClick = (key: string) => {
    return history.push(`/stake/${key}/delegation`);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <GridItem
          title='Pool Size'
          bgType='white'
          mainIcon={<PoolsizeIcon />}
          value={
            <Box display='flex' alignItems='center'>
              <CardValue>{formatADAFull(data?.poolSize)} ₳</CardValue>
            </Box>
          }
        />
        <GridItem
          title='Status'
          bgType='white'
          mainIcon={<StatusIC />}
          value={
            <Box display='flex' alignItems='center'>
              <CardValue color={STATUS[data?.status ?? 'ACTIVE'][1]}>{STATUS[data?.status ?? 'ACTIVE'][0]} :</CardValue>
              <ClickAbleLink>&nbsp; Epoch {data?.epochNo}</ClickAbleLink>
            </Box>
          }
        />
        <GridItem
          title='Rewards Available'
          bgType='white'
          mainIcon={<ReewardAvalible />}
          value={
            <Box display='flex' alignItems='center'>
              <CardValue>{formatADAFull(data?.rewardAvailable)} ₳</CardValue>
            </Box>
          }
        />
        <GridItem
          title='Owner Account'
          bgType='white'
          mainIcon={<OwnerAccIC />}
          value={
            <Box display='flex' alignItems='center'>
              <CardValue>
                <ClickAbleLink>
                  {data?.stakeKeys && data?.stakeKeys.length && formatHash(data.stakeKeys[0])}
                </ClickAbleLink>
              </CardValue>
            </Box>
          }
          action={
            data?.stakeKeys &&
            data?.stakeKeys.length > 1 && (
              <ViewMoreButton onClick={() => setOpen(true)}>
                <DotsIcon />
              </ViewMoreButton>
            )
          }
        />
      </Grid>
      <ViewMoreAddressModal
        showFullHash={true}
        onItemClick={onOwnerItemClick}
        title='Pool Owner'
        open={open}
        items={data?.stakeKeys}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default TabularOverview;
