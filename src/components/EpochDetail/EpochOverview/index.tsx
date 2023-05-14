import React from 'react';
import { MAX_SLOT_EPOCH } from '../../../commons/utils/constants';
import DetailHeader from '../../commons/DetailHeader';
import timeIcon from '../../../commons/resources/icons/time.svg';
import outputIcon from '../../../commons/resources/icons/outputIcon.svg';
import cubeIcon from '../../../commons/resources/icons/blockIcon.svg';
import slotIcon from '../../../commons/resources/icons/slot.svg';
import { TitleCard } from '../../BlockDetail/BlockOverview/styles';
import { Box } from '@mui/material';
import { formatADAFull, formatDateTimeLocal } from '../../../commons/utils/helper';
import { useSelector } from 'react-redux';
import ADAicon from '../../commons/ADAIcon';
interface EpochOverviewProps {
  data: IDataEpoch | null;
  loading: boolean;
}

const EpochOverview: React.FC<EpochOverviewProps> = ({ data, loading }) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const slot = data && data?.no === currentEpoch?.no ? currentEpoch.slot : MAX_SLOT_EPOCH;

  const listOverview = [
    {
      icon: timeIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}>Start time </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.startTime || '')
    },
    {
      icon: timeIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}>End time </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.endTime || '')
    },
    {
      icon: outputIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}> Total Output</TitleCard>
        </Box>
      ),
      value: (
        <Box component={'span'}>
          {formatADAFull(data?.outSum || 0)} <ADAicon />
        </Box>
      )
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}> Block</TitleCard>
        </Box>
      ),
      value: data?.blkCount || 0
    },
    {
      icon: slotIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}> Slot</TitleCard>
        </Box>
      ),
      value: (
        <>
          {slot}/
          <Box component={'span'} fontWeight='400'>
            {MAX_SLOT_EPOCH}
          </Box>
        </>
      )
    }
  ];
  return (
    <DetailHeader
      loading={loading}
      listItem={listOverview}
      type='EPOCH'
      bookmarkData={`${data?.no || ''}`}
      title={'Epoch detail'}
      epoch={
        data && {
          no: data.no,
          slot: slot,
          status: data.status
        }
      }
    />
  );
};

export default EpochOverview;
