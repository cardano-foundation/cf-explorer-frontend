import { Box } from '@mui/material';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useFetchList from '../../../../../commons/hooks/useFetchList';
import { EyeIcon } from '../../../../../commons/resources';
import { details } from '../../../../../commons/routers';
import { API } from '../../../../../commons/utils/api';
import { formatDateTimeLocal, getShortHash } from '../../../../../commons/utils/helper';
import { AdaValue } from '../../../../TabularView/StakeTab/Tabs/StakeRegistrationTab';
import CustomTooltip from '../../../../commons/CustomTooltip';
import Table, { Column } from '../../../../commons/Table';
import { StyledLink } from '../../../../share/styled';
import { PoolUpdateModal } from '../../PoolUpdates';
import { ClickAbleLink } from './styles';

const PoolUpdateTab = () => {
  const { poolId = '' } = useParams<{ poolId: string }>();
  const history = useHistory();
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
            <StyledLink to={details.transaction(data.txHash)}>{getShortHash(data.txHash)}</StyledLink>
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
        return <AdaValue value={data.fee} />;
      }
    },
    {
      key: 'Certificate',
      title: 'Certificate',
      render(data) {
        return (
          <ClickAbleLink onClick={() => setSelectedValue(data)}>
            <EyeIcon style={{ transform: 'scale(.8)' }} />
          </ClickAbleLink>
        );
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
          onChange: (page, size) => setParams({ page: page - 1, size })
        }}
      />
    </Box>
  );
};

export default PoolUpdateTab;
