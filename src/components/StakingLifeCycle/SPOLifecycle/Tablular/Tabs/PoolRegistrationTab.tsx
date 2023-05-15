import { Box, IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchList from '../../../../../commons/hooks/useFetchList';
import { API } from '../../../../../commons/utils/api';
import { formatDateTimeLocal, getShortHash } from '../../../../../commons/utils/helper';

import { EyeIcon } from '../../../../../commons/resources';
import { details } from '../../../../../commons/routers';
import { AdaValue } from '../../../../TabularView/StakeTab/Tabs/StakeRegistrationTab';
import { TableSubTitle } from '../../../../TabularView/StakeTab/styles';
import CustomTooltip from '../../../../commons/CustomTooltip';
import Table, { Column } from '../../../../commons/Table';
import { StyledLink } from '../../../../share/styled';
import { RegistrationCertificateModal } from '../../Registration';

const PoolRegistrationTab = () => {
  const theme = useTheme();
  const { poolId = '' } = useParams<{ poolId: string }>();
  const [params, setParams] = useState({
    page: 0,
    size: 10
  });

  const [sort, setSort] = useState<string>('');
  const [selected, setSelected] = useState<number | null>(null);

  const columns: Column<SPORegistrationTabpular>[] = [
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
      title: (
        <Box>
          ADA Value
          <Box fontSize={'0.75rem'} fontWeight={'normal'}>
            Hold/Fees
          </Box>
        </Box>
      ),
      render(data) {
        return (
          <Box>
            <AdaValue value={data.totalFee} />
            <TableSubTitle>
              <Box display='flex' mt={1} alignItems='center' lineHeight='1'>
                <AdaValue color={theme.palette.grey[400]} value={data.deposit} gap='3px' fontSize='12px' />
                <Box mx='3px'>/</Box>
                <AdaValue color={theme.palette.grey[400]} value={data.fee} gap='3px' fontSize='12px' />
              </Box>
            </TableSubTitle>
          </Box>
        );
      }
    },
    {
      key: 'Certificate',
      title: 'Certificate',
      render: (data) => (
        <IconButton onClick={() => setSelected(data?.poolUpdateId || 0)}>
          <EyeIcon style={{ transform: 'scale(.8)' }} />
        </IconButton>
      )
    }
  ];

  const fetchData = useFetchList<SPORegistrationTabpular>(
    poolId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_LIST(poolId) : '',
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
          onChange: (page, size) => setParams({ page: page - 1, size })
        }}
      />
      <RegistrationCertificateModal
        poolUpdateId={selected || 0}
        open={!!selected}
        handleCloseModal={() => setSelected(null)}
        poolId={poolId}
      />
    </Box>
  );
};

export default PoolRegistrationTab;
