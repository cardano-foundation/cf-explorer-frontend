import { Box } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchList from '../../../../../commons/hooks/useFetchList';
import { API } from '../../../../../commons/utils/api';
import { formatADAFull, formatDateTimeLocal, formatHash } from '../../../../../commons/utils/helper';
import Table, { Column } from '../../../../commons/Table';
import { PoolUpdateModal } from '../../PoolUpdates';
import { ADAValueLabel, ClickAbleLink } from './styles';
import CustomIcon from '../../../../commons/CustomIcon';
import { ADAsigntIC } from '../../../../../commons/resources';
import { details } from '../../../../../commons/routers';
import CustomTooltip from '../../../../commons/CustomTooltip';
import { StyledLink } from '../../../../share/styled';

const ProtocolUpdateTab = () => {
  const { poolId = '' } = useParams<{ poolId: string }>();
  const [selectedValue, setSelectedValue] = useState<PoolUpdateDetail | null>(null);
  const [params, setParams] = useState({
    page: 0,
    size: 10
  });

  const [sort, setSort] = useState<string>('');

  const columns: Column<PoolUpdateDetail>[] = [
    {
      key: 'txHash',
      title: 'Transaction hash',
      render(data) {
        return (
          <CustomTooltip title={data.txHash}>
            <StyledLink to={details.transaction(data.txHash)}>{formatHash(data.txHash)}</StyledLink>
          </CustomTooltip>
        );
      }
    },
    {
      key: 'time',
      title: 'Timestamp',
      sort({ columnKey, sortValue }) {
        sortValue ? setSort(`bk.${columnKey},${sortValue}`) : setSort('');
      },
      render(data) {
        return formatDateTimeLocal(data.time);
      }
    },
    {
      key: 'fee',
      title: 'Fees',
      render(data) {
        return (
          <ADAValueLabel>
            {formatADAFull(data.fee)} <CustomIcon icon={ADAsigntIC} width={12} />
          </ADAValueLabel>
        );
      }
    },
    {
      key: 'update',
      title: 'Update',
      render(data) {
        return <ClickAbleLink onClick={() => setSelectedValue(data)}>Certificate Update</ClickAbleLink>;
      }
    }
  ];

  const fetchData = useFetchList<PoolUpdateDetail>(poolId ? API.SPO_LIFECYCLE.POOL_UPDATE_LIST(poolId) : '', {
    ...params,
    sort
  });

  return (
    <Box>
      <PoolUpdateModal
        data={selectedValue}
        open={!!selectedValue}
        handleCloseModal={() => {
          setSelectedValue(null);
        }}
      />
      <Table
        {...fetchData}
        columns={columns}
        total={{
          title: 'Pool update',
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

export default ProtocolUpdateTab;
