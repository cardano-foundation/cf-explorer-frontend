import { Box } from '@mui/material';
import { stringify } from 'qs';
import { useHistory, useLocation } from 'react-router-dom';
import sendImg from '../../commons/resources/images/sendImg.svg';
import receiveImg from '../../commons/resources/images/receiveImg.svg';
import useFetchList from '../../commons/hooks/useFetchList';
import { useScreen } from '../../commons/hooks/useScreen';
import { details } from '../../commons/routers';
import { API } from '../../commons/utils/api';
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  numberWithCommas
} from '../../commons/utils/helper';
import ADAicon from '../commons/ADAIcon';
import Card from '../commons/Card';
import CustomTooltip from '../commons/CustomTooltip';
import DropdownTokens from '../commons/DropdownTokens';
import Table, { Column } from '../commons/Table';
import { SmallText } from '../share/styled';
import { Img, StyledLink } from './styles';

interface AddressTransactionListProps {
  underline?: boolean;
  openDetail?: (_: any, transaction: Transactions, index: number) => void;
  selected?: number | null;
  showTabView?: boolean;
  address: string;
}

const AddressTransactionList: React.FC<AddressTransactionListProps> = ({
  underline = false,
  address,
  openDetail,
  selected,
  showTabView
}) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const url = `${API.ADDRESS.DETAIL}/${address}/txs`;
  const fetchData = useFetchList<Transactions>(url, { ...pageInfo });
  const onClickRow = (e: any, transaction: Transactions, index: number) => {
    let parent: Element | null = e.target as Element;
    while (parent !== null && !parent?.className.includes('MuiPopover-root')) {
      parent = parent?.parentElement;
    }
    if (parent) {
      return;
    }
    if (openDetail) return openDetail(e, transaction, index);
    history.push(details.transaction(transaction.hash));
  };
  const { isMobile } = useScreen();

  const columns: Column<Transactions>[] = [
    {
      title: '#',
      key: 'id',
      minWidth: 14,
      render: (data, index) => numberWithCommas(pageInfo.page * pageInfo.size + index + 1)
    },
    {
      title: 'Trx Hash',
      key: 'trxhash',
      minWidth: isMobile ? 190 : 120,

      render: (transaction) => {
        const type = transaction.balance >= 0 ? 'up' : 'down';
        return (
          <Box display={'flex'}>
            <Box width={50}>
              <Img src={type !== 'up' ? receiveImg : sendImg} alt='send icon' />
            </Box>
            <Box display={'grid'}>
              <CustomTooltip title={transaction.hash}>
                <StyledLink to={details.transaction(transaction.hash)}>{getShortHash(transaction.hash)}</StyledLink>
              </CustomTooltip>
              <SmallText>{formatDateTimeLocal(transaction.time || '')}</SmallText>
            </Box>
          </Box>
        );
      }
    },
    {
      title: 'Block',
      key: 'block',
      minWidth: 120,
      render: (transaction) => (
        <>
          <StyledLink to={details.block(transaction.blockNo)}>{transaction.blockNo}</StyledLink>
          <br />
          <StyledLink to={details.epoch(transaction.epochNo)}>{transaction.epochNo}</StyledLink>/
          <SmallText>{transaction.epochSlotNo} </SmallText>
        </>
      )
    },
    {
      title: 'Fees',
      key: 'fee',
      minWidth: 120,
      render: (transaction) => (
        <Box display='inline-flex' alignItems='center'>
          <Box mr={1}>{formatADAFull(transaction.fee)}</Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: 'ADA amount',
      minWidth: 120,
      key: 'totalOutput',
      render: (transaction) => {
        const isUp = transaction.balance >= 0;
        return (
          <Box display='inline-flex' alignItems='center'>
            <Box mr={1} color={isUp ? 'success.main' : 'error.main'}>
              {!isUp ? `- ` : `+ `}
              {formatADAFull(transaction.balance)}
            </Box>
            <ADAicon />
          </Box>
        );
      }
    },
    {
      title: 'Token',
      minWidth: 120,
      key: 'totalOutput',
      render: (transaction) => {
        const type = transaction.balance >= 0 ? 'up' : 'down';
        let tokens: Token[] = [];
        if (transaction.tokens && transaction.tokens.length > 0) {
          tokens = transaction.tokens.map((token) => ({
            assetId: token.addressId.toString(),
            assetQuantity: token.quantity,
            assetName: token.displayName
          }));
        }
        return (
          <Box display={'flex'} alignItems={'center'}>
            {transaction.tokens && transaction.tokens.length > 0 && <DropdownTokens tokens={tokens} type={type} />}
          </Box>
        );
      }
    }
  ];

  return (
    <Card title={'Transactions'} underline={underline}>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: 'Total Transactions' }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) })
        }}
        onClickRow={onClickRow}
        selected={selected}
        showTabView={showTabView}
      />
    </Card>
  );
};

export default AddressTransactionList;
