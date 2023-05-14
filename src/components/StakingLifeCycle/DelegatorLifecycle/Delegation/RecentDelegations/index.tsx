import { Box, Skeleton } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import useFetchList from '../../../../../commons/hooks/useFetchList';
import { API } from '../../../../../commons/utils/api';
import StackingFilter, { FilterParams } from '../../../../StackingFilter';
import OverviewStaking from '../../../../commons/OverviewStaking';
import { GridBox, WrapFilterDescription } from './styles';

import moment from 'moment';
import { EmptyRecord } from '../../../../commons/Table';
import { FilterDateLabel } from '../styles';
import { DATETIME_PARTTEN } from '../../../../StackingFilter/DateRangeModal';

interface Props {
  onSelect: (registration: DelegationItem) => void;
}

const RecentDelegations: React.FC<Props> = ({ onSelect }) => {
  const { stakeId = '' } = useParams<{ stakeId: string }>();
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });

  const { data, total, loading, initialized, error } = useFetchList<DelegationItem>(
    stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : '',
    {
      page: 0,
      size: 1000,
      ...params
    }
  );

  const filterLabel = useMemo(() => {
    if (params.fromDate && params.toDate)
      return ` Filter by: ${moment.utc(params.fromDate, DATETIME_PARTTEN).local().format('MM/DD/YYYY')} - ${moment
        .utc(params.toDate, DATETIME_PARTTEN)
        .local()
        .format('MM/DD/YYYY')}`;
    if (params.sort && params.sort.length >= 2)
      return `${params.sort[1] === 'DESC' ? 'Sort by: Latest - First' : 'Sort by: First - Latest'}`;
    if (params.txHash) return `Searching for : ${params.txHash}`;
  }, [params]);

  console.log(params);
  return (
    <Box marginTop='32px'>
      <Box display={'flex'} justifyContent={'space-between'} marginBottom={'10px'}>
        <span>Recent Delegations</span>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <WrapFilterDescription>
            Showing {total} {total > 1 ? 'results' : 'result'}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) =>
              setParams(() => ({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params
              }))
            }
          />
        </Box>
      </Box>
      <GridBox>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant='rectangular' width={300} height={185} />
          ))}
        {!loading &&
          data.map((item) => {
            return (
              <OverviewStaking
                key={item.txHash}
                amount={item.fee}
                time={item.time}
                hash={item.txHash}
                item={item}
                onClick={onSelect}
              />
            );
          })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
    </Box>
  );
};

export default RecentDelegations;
