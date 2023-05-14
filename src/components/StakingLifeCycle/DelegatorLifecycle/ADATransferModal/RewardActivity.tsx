import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatADAFull, formatDateTimeLocal } from '../../../../commons/utils/helper';
import useFetchList from '../../../../commons/hooks/useFetchList';
import { API } from '../../../../commons/utils/api';
import Table, { Column } from '../../../commons/Table';
import { details } from '../../../../commons/routers';
import { Amount, StyledLink } from './styles';
import CustomIcon from '../../../commons/CustomIcon';
import { AIconGreen } from '../../../../commons/resources';
import { Box, styled } from '@mui/material';
import UserInfo from './UserInfo';
import useFetch from '../../../../commons/hooks/useFetch';

const RewardActivity: React.FC = () => {
  const { stakeId = '' } = useParams<{ stakeId: string }>();
  const [{ page, size }, setPagi] = useState<{ page: number; size: number }>({ page: 0, size: 10 });
  const [sort, setSort] = useState<string>('');
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stakeId}` || '');

  const fetchData = useFetchList<RewardActivityIF>(API.STAKE_LIFECYCLE.REWARDS_ACTIVITY(stakeId), { page, size, sort });
  const rewardType = {
    REWARD_RECEIVED: 'Reward received',
    REWARD_WITHDRAWN: 'Reward withdrawn'
  };
  const columns: Column<RewardActivityIF>[] = [
    {
      title: 'Amount ADA',
      key: 'outSum',
      minWidth: '100px',
      render: (r) => (
        <Amount value={r.amount}>
          {formatADAFull(r.amount)}
          <CustomIcon icon={AIconGreen} height={15} fill='currentColor' color={(theme) => theme.palette.text.primary} />
        </Amount>
      )
    },
    {
      title: 'Timestamp',
      key: 'time',
      minWidth: '100px',
      render: (r) => formatDateTimeLocal(r.time || ''),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort('');
      }
    },
    {
      title: 'Epoch',
      key: 'Epoch',
      minWidth: '100px',
      render: (r) => <StyledLink to={details.epoch(r.epochNo || 0)}>{r.epochNo}</StyledLink>
    },

    {
      title: 'Transaction Type',
      key: 'transactionCount',
      minWidth: '100px',
      render: (r) => <Box>{rewardType[r.type]}</Box>
    }
  ];

  return (
    <Box>
      <UserInfo acitve='reward' total={fetchData.total} reward={data?.rewardAvailable || 0} stake={stakeId} />
      <StyledTable
        {...fetchData}
        columns={columns}
        maxHeight={'calc(70vh - 208px)'}
        total={{ title: 'Total Epochs', count: fetchData.total }}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => setPagi({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

export default RewardActivity;
const StyledTable = styled(Table)(() => ({
  '> :nth-child(2)': {
    boxShadow: 'none !important'
  }
}));
