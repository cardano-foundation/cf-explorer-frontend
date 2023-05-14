import { Box, BoxProps } from '@mui/material';
import { StyledLink, TableSubTitle } from '../styles';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useFetchList from '../../../../commons/hooks/useFetchList';
import {
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet,
  formatADAFull
} from '../../../../commons/utils/helper';
import Table, { Column } from '../../../commons/Table';
import CustomTooltip from '../../../commons/CustomTooltip';
import { details } from '../../../../commons/routers';
import { API } from '../../../../commons/utils/api';

import ADAicon from '../../../commons/ADAIcon';
import { useState } from 'react';

interface IAdaValue extends BoxProps {
  value: number | string;
}

export const AdaValue = ({ value, gap = '8px', fontSize, ...props }: IAdaValue) => {
  return (
    <Box {...props} display='flex' alignItems='center' gap={gap} fontSize={fontSize}>
      {formatADAFull(value)}
      <ADAicon fontSize={fontSize} />
    </Box>
  );
};

const StakeRegistrationTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const [pageInfo, setPageInfo] = useState(getPageInfo(search));

  const fetchData = useFetchList<RegistrationItem>(stakeId ? API.STAKE_LIFECYCLE.REGISTRATION(stakeId) : '', pageInfo);

  const columns: Column<RegistrationItem>[] = [
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
      title: (
        <>
          <Box>ADA Value</Box>
          <TableSubTitle>Hold/Fees</TableSubTitle>
        </>
      ),
      key: 'block',
      minWidth: '120px',
      render: (r) => (
        <Box>
          <AdaValue value={r.deposit + r.fee} />
          <TableSubTitle>
            <Box display='flex' mt={1} alignItems='center' lineHeight='1'>
              <AdaValue value={r.deposit} gap='3px' fontSize='12px' />
              <Box mx={1}>/</Box>
              <AdaValue value={r.fee} gap='3px' fontSize='12px' />
            </Box>
          </TableSubTitle>
        </Box>
      )
    },
    {
      title: 'Certificate',
      key: 'stakeId',
      minWidth: '120px',
      render: () => (
        <CustomTooltip title={stakeId}>
          <StyledLink to={details.stake(stakeId)}>{getShortWallet(stakeId)}</StyledLink>
        </CustomTooltip>
      )
    }
  ];

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: 'Total', count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page, size }))
      }}
      onClickRow={(e, r: RegistrationItem) => history.push(details.transaction(r.txHash))}
    />
  );
};

export default StakeRegistrationTab;
