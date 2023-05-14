import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useFetchList from '../../commons/hooks/useFetchList';

import { stringify } from 'qs';
import { Box } from '@mui/material';
import {
  exchangeADAToUSD,
  formatADAFull,
  getPageInfo,
  getShortWallet,
  numberWithCommas
} from '../../commons/utils/helper';
import { details } from '../../commons/routers';
import { StyledContainer, StyledLink } from './styles';
import Table, { Column } from '../../components/commons/Table';
import Card from '../../components/commons/Card';
import CustomTooltip from '../../components/commons/CustomTooltip';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import { API } from '../../commons/utils/api';
import ADAicon from '../../components/commons/ADAIcon';
import { REFRESH_TIMES } from '../../commons/utils/constants';

const Transactions: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const [sort, setSort] = useState<string>('');
  const mainRef = useRef(document.querySelector('#main'));
  const fetchData = useFetchList<Contracts>(API.CONTRACT, { ...pageInfo, sort }, false, REFRESH_TIMES.CONTRACTS);
  const { adaRate } = useSelector(({ system }: RootState) => system);

  useEffect(() => {
    document.title = `Contracts List | Cardano Explorer`;
  }, []);

  const columns: Column<Contracts>[] = [
    {
      title: '#',
      key: 'id',
      minWidth: 30,
      render: (_, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0)
    },
    {
      title: 'Contract Addresses',
      key: 'trxhash',
      minWidth: 120,

      render: (r) => (
        <div>
          <CustomTooltip title={r.address}>
            <StyledLink to={details.contract(r.address)}>{getShortWallet(r.address)}</StyledLink>
          </CustomTooltip>
        </div>
      )
    },
    {
      title: 'Balance',
      key: 'balance',
      minWidth: 60,
      render: (r) => (
        <Box display='inline-flex' alignItems='center'>
          <Box mr={1}>{formatADAFull(r.balance)}</Box>
          <ADAicon />
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort('');
      }
    },
    {
      title: 'Value',
      key: 'value',
      minWidth: 120,
      render: (r) => (
        <CustomTooltip title={exchangeADAToUSD(r.balance, adaRate, true)}>
          <Box display='inline-flex' alignItems='center'>
            {exchangeADAToUSD(r.balance, adaRate, true)}
          </Box>
        </CustomTooltip>
      )
    },
    {
      title: 'Transaction Count',
      minWidth: 120,
      key: 'txCount',
      render: (r) => (
        <Box display='flex' alignItems='center'>
          {r.txCount}
        </Box>
      ),
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort('');
      }
    }
  ];

  return (
    <StyledContainer>
      <Card title={'Contracts'} underline={false}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: 'Total Contracts', count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.push({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo(0, 0);
            }
          }}
        />
      </Card>
    </StyledContainer>
  );
};

export default Transactions;
