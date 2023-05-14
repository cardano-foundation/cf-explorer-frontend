import { Box } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchList from '../../../../../commons/hooks/useFetchList';
import { API } from '../../../../../commons/utils/api';
import { formatADAFull, formatHash } from '../../../../../commons/utils/helper';
import Table, { Column } from '../../../../commons/Table';
import { ADAValueFieldContainer, ADAValueLabel, ADAValueSubLabel, VerticalRow } from './styles';
import CustomIcon from '../../../../commons/CustomIcon';
import { ADAsigntIC } from '../../../../../commons/resources';
import { details } from '../../../../../commons/routers';
import CustomTooltip from '../../../../commons/CustomTooltip';
import { StyledLink } from '../../../../share/styled';

const DeregsitrationTab = () => {
  const { poolId = '' } = useParams<{ poolId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 10
  });

  const [sort, setSort] = useState<string>('');

  const columns: Column<SPODeregistrationTabpular>[] = [
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
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort('');
      },
      render(data) {
        return data.time;
      }
    },
    {
      key: 'fee',
      title: 'ADA Value',
      render(data) {
        return (
          <ADAValueFieldContainer>
            <ADAValueLabel>
              {formatADAFull(data.totalFee)} <CustomIcon icon={ADAsigntIC} width={12} />{' '}
            </ADAValueLabel>
            <ADAValueSubLabel>
              {formatADAFull(data.poolHold)} <CustomIcon icon={ADAsigntIC} width={11} /> / {formatADAFull(data.fee)}{' '}
              <CustomIcon icon={ADAsigntIC} width={11} />{' '}
            </ADAValueSubLabel>
          </ADAValueFieldContainer>
        );
      }
    },
    {
      key: 'owner',
      title: 'Owner',
      render(data) {
        return data.stakeKeys.map((item, index) => (
          <VerticalRow key={index}>
            <CustomTooltip title={item}>
              <StyledLink to={details.stake(item)} key={index}>
                {formatHash(item)}
              </StyledLink>
            </CustomTooltip>
          </VerticalRow>
        ));
      }
    }
  ];

  const fetchData = useFetchList<SPODeregistrationTabpular>(
    poolId ? API.SPO_LIFECYCLE.SPO_DEREGISTRATION(poolId) : '',
    {
      ...params,
      sort
    }
  );

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

export default DeregsitrationTab;
