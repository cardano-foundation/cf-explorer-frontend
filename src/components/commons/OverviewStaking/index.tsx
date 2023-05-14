import { Box } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { AIconGreen, HashtagIcon, TimerIcon } from '../../../commons/resources';
import { formatADAFull, getShortHash } from '../../../commons/utils/helper';
import { OverviewIcon, OverviewTitle, WrapContainer } from './styles';
import CustomIcon from '../CustomIcon';

interface Props {
  hash: string;
  amount: number;
  time: string;
  item?:
    | SPODeregistration
    | PoolUpdateItem
    | RegistrationItem
    | DelegationItem
    | WithdrawItem
    | DeregistrationItem
    | SPORegistration;
  onClick: (registration: any) => void;
}

const OverviewStaking: React.FC<Props> = ({ item, ...props }) => {
  const { hash, amount, time, onClick } = props;

  return (
    <WrapContainer onClick={() => onClick(item)}>
      <Box display={'flex'}>
        <OverviewIcon>
          <CustomIcon icon={HashtagIcon} width={17} fill='currentColor' color={(theme) => theme.palette.primary.main} />
        </OverviewIcon>
        <Box marginLeft={'10px'}>
          <OverviewTitle>{getShortHash(hash)}</OverviewTitle>
        </Box>
      </Box>
      <Box display={'flex'}>
        <OverviewIcon>
          <CustomIcon icon={AIconGreen} height={17} fill='currentColor' color={(theme) => theme.palette.primary.main} />
        </OverviewIcon>
        <Box marginLeft={'10px'}>
          <OverviewTitle>{formatADAFull(amount)}</OverviewTitle>
        </Box>
      </Box>
      <Box display={'flex'}>
        <OverviewIcon>
          <CustomIcon icon={TimerIcon} width={17} fill='currentColor' color={(theme) => theme.palette.primary.main} />
        </OverviewIcon>
        <Box marginLeft={'10px'}>
          <OverviewTitle>{moment(time).format('MM/DD/YYYY HH:mm:ss')}</OverviewTitle>
        </Box>
      </Box>
    </WrapContainer>
  );
};

export default OverviewStaking;
