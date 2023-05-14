import React, { useState } from 'react';
import {
  AmountADARow,
  EpochRow,
  ModalContainer,
  ModalContent,
  ModalTitle,
  RewardBalance,
  RewardBalanceHeader,
  RewardBalanceTitle,
  TableContainer
} from './styles';
import Table, { Column } from '../commons/Table';
import { ReceidvedRewardsIC } from '../../commons/resources';
import StyledModal from '../commons/StyledModal';
import { useParams } from 'react-router-dom';
import useFetchList from '../../commons/hooks/useFetchList';
import { API } from '../../commons/utils/api';
import { formatADA } from '../../commons/utils/helper';
import ADAicon from '../commons/ADAIcon';
import { details } from '../../commons/routers';

interface ReceivedReward {
  amount: string;
  epoch: number;
  time: string;
}

export interface ReceivedRewardsModalProps {
  open?: boolean;
  onClose?: () => void;
  reward: number;
}
const ReceivedRewardsModal: React.FC<ReceivedRewardsModalProps> = ({ open = false, onClose, reward = 0 }) => {
  const [params, setParams] = useState({ page: 0, size: 10 });
  const { stakeId = '' } = useParams<{ stakeId: string }>();
  const [sort, setSort] = useState<string>('');

  const fetchData = useFetchList<RewardDistributionItem>(stakeId ? API.STAKE_LIFECYCLE.RECEIVED_REWARD(stakeId) : '', {
    ...params,
    sort
  });

  const columns: Column<ReceivedReward>[] = [
    {
      key: 'amount',
      title: 'Amount ADA',
      render(data) {
        return (
          <AmountADARow>
            {formatADA(data.amount)} <ADAicon color='#333333' />
          </AmountADARow>
        );
      }
    },
    {
      key: 'epoch',
      title: 'Epoch',
      render(data) {
        return <EpochRow to={details.epoch(data.epoch)}>{data.epoch}</EpochRow>;
      }
    },
    {
      key: 'time',
      title: 'Date',
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort('');
      }
    }
  ];
  return (
    <StyledModal open={open} handleCloseModal={() => onClose?.()} width={600}>
      <ModalContainer>
        <ModalTitle>Received Rewards</ModalTitle>
        <ModalContent>
          <RewardBalanceHeader>
            <RewardBalance>
              <ReceidvedRewardsIC />
              <RewardBalanceTitle>Reward Balance: {formatADA(reward)}</RewardBalanceTitle>
              <ADAicon />
            </RewardBalance>
            {/* <TotalTransaction>100 Transactions</TotalTransaction> */}
          </RewardBalanceHeader>
          <TableContainer>
            <Table
              {...fetchData}
              columns={columns}
              total={{ count: fetchData.total, title: 'Total Transactions' }}
              pagination={{
                ...params,
                total: fetchData.total,
                onChange(page, size) {
                  setParams({ page, size });
                }
              }}
              maxHeight={'calc(70vh - 100px)'}
            />
          </TableContainer>
        </ModalContent>
      </ModalContainer>
    </StyledModal>
  );
};

export default ReceivedRewardsModal;
