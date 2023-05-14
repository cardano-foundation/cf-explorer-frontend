import { Box } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchList from '../../../../../commons/hooks/useFetchList';
import { API } from '../../../../../commons/utils/api';
import { formatADAFull, formatDateTimeLocal, formatHash } from '../../../../../commons/utils/helper';
import Table, { Column } from '../../../../commons/Table';
import { ADAValueLabel } from './styles';
import CustomIcon from '../../../../commons/CustomIcon';
import { ADAsigntIC } from '../../../../../commons/resources';
import { details } from '../../../../../commons/routers';
import { StyledLink } from '../../../../share/styled';
import CustomTooltip from '../../../../commons/CustomTooltip';

const RewardsDistributionTab = () => {
  const { poolId = '' } = useParams<{ poolId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 10
  });

  const [sort, setSort] = useState<string>('');

  const columns: Column<SPO_REWARD>[] = [
    {
      key: 'epochNo',
      title: 'Epoch',
      render(data) {
        return <StyledLink to={details.epoch(data.epochNo)}>{data.epochNo}</StyledLink>;
      }
    },
    {
      key: 'time',
      title: 'Timestamp',
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort('');
      },
      render(data) {
        return formatDateTimeLocal(data.time);
      }
    },
    {
      key: 'amount',
      title: 'Operator Reward ADA',
      render(data) {
        return (
          <ADAValueLabel>
            {formatADAFull(data.amount)} <CustomIcon icon={ADAsigntIC} width={12} />
          </ADAValueLabel>
        );
      }
    },
    {
      key: 'owner',
      title: 'Reward Account',
      render(data) {
        return (
          <CustomTooltip title={data.rewardAccount}>
            <StyledLink to={details.stake(data.rewardAccount)}>{formatHash(data.rewardAccount)}</StyledLink>
          </CustomTooltip>
        );
      }
    }
  ];

  const fetchData = useFetchList<SPO_REWARD>(poolId ? API.SPO_LIFECYCLE.REWARD(poolId) : '', {
    ...params,
    sort
  });

  return (
    <Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: 'Pool Registration',
          count: fetchData.total
        }}
        pagination={{
          ...params,
          total: fetchData.total,
          onChange: (page, size) => setParams({ page, size })
        }}
      />
    </Box>
  );
};

export default RewardsDistributionTab;
