import { Box } from '@mui/material';
import { StyledLink, WrapWalletLabel } from '../styles';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useFetchList from '../../../../commons/hooks/useFetchList';
import { formatDateTimeLocal, getPageInfo, getShortHash } from '../../../../commons/utils/helper';
import Table, { Column } from '../../../commons/Table';
import CustomTooltip from '../../../commons/CustomTooltip';
import { details } from '../../../../commons/routers';
import { API } from '../../../../commons/utils/api';
import { AdaValue } from './StakeRegistrationTab';
import { GreenWalletIcon } from '../../TabularOverview';
import { WrapFilterDescription } from '../../../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles';
import { useMemo, useState } from 'react';
import StackingFilter, { FilterParams } from '../../../StackingFilter';
import moment from 'moment';
import { DATETIME_PARTTEN } from '../../../StackingFilter/DateRangeModal';
import { FilterDateLabel } from '../../../StakingLifeCycle/DelegatorLifecycle/Delegation/styles';

const columns: Column<DelegationItem>[] = [
  {
    title: 'Transaction Hash',
    key: 'hash',
    minWidth: '120px',
    render: (r) => (
      <CustomTooltip title={r.txHash}>
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
      </CustomTooltip>
    )
  },
  {
    title: 'Timestamp',
    key: 'time',
    minWidth: '120px',
    render: (r) => formatDateTimeLocal(r.time)
  },
  {
    title: 'Fees',
    key: 'block',
    minWidth: '120px',
    render: (r) => <AdaValue value={r.outSum} />
  },
  {
    title: 'Certificate',
    key: 'poolId',
    minWidth: '120px',
    render: (r) => (
      <CustomTooltip title={r.txHash}>
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
      </CustomTooltip>
    )
  }
];

const DelegationTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(() => getPageInfo(search));
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const fetchData = useFetchList<DelegationItem>(stakeId ? API.STAKE_LIFECYCLE.DELEGATION(stakeId) : '', {
    ...pageInfo,
    ...params
  });
  const { total, data } = fetchData;
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
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
        <WrapWalletLabel>
          <GreenWalletIcon mr={1} />
          <AdaValue value={data.reduce((current, item) => current + item.outSum, 0)} />
        </WrapWalletLabel>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <WrapFilterDescription>
            Showing {Math.min(total, pageInfo.size)} {Math.min(total, pageInfo.size) > 1 ? 'results' : 'result'}
          </WrapFilterDescription>
          {filterLabel && <FilterDateLabel>{filterLabel}</FilterDateLabel>}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={(params) => {
              setParams(() => ({
                fromDate: undefined,
                sort: undefined,
                toDate: undefined,
                txHash: undefined,
                ...params
              }));
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
          />
        </Box>
      </Box>
      <Table
        {...fetchData}
        columns={columns}
        total={{ title: 'Total', count: fetchData.total }}
        pagination={{
          ...pageInfo,
          page: pageInfo.page + 1,
          total: fetchData.total,
          onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
        }}
        onClickRow={(e, r: DelegationItem) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default DelegationTab;
