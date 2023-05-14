import { Box } from '@mui/material';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { stringify } from 'qs';
import useFetchList from '../../../../commons/hooks/useFetchList';
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from '../../../../commons/utils/helper';
import Table, { Column } from '../../../commons/Table';
import CustomTooltip from '../../../commons/CustomTooltip';
import { details } from '../../../../commons/routers';
import { StyledLink } from '../styles';
import { API } from '../../../../commons/utils/api';
import ADAicon from '../../../commons/ADAIcon';

const columns: Column<Instantaneous>[] = [
  {
    title: 'Trx Hash',
    key: 'hash',
    minWidth: '120px',
    render: (r) => (
      <CustomTooltip title={r.txHash || ''}>
        <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash || '')}</StyledLink>
      </CustomTooltip>
    )
  },
  {
    title: 'Time',
    key: 'time',
    minWidth: '120px',
    render: (r) => formatDateTimeLocal(r.time || '')
  },
  {
    title: 'Block',
    key: 'block',
    minWidth: '120px',
    render: (r) => (
      <Box>
        <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
        <Box marginTop='5px'>
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/{r.epochSlotNo}
        </Box>
      </Box>
    )
  },
  {
    title: 'Reward Paid',
    key: 'rewardPaid',
    minWidth: '120px',
    render: (r) => (
      <>
        <Box component={'span'}> {formatADAFull(r.amount)}</Box>
        <ADAicon pl={'3px'} />
      </>
    )
  }
];

const InstantaneousTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Instantaneous>(`${API.STAKE.DETAIL}/${stakeId}/instantaneous-rewards`, pageInfo);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: 'Total', count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.push({ search: stringify({ page, size }) })
      }}
    />
  );
};

export default InstantaneousTab;
