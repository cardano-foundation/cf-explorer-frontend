import { useParams } from 'react-router-dom';
import { API } from '../../../../commons/utils/api';
import TransactionListFull from '../../../TransactionListsFull';

const TransactionTab = () => {
  const { stakeId } = useParams<{ stakeId: string }>();

  return <TransactionListFull url={`${API.STAKE.DETAIL}/${stakeId}/txs`} showTitle={false} />;
};

export default TransactionTab;
