import { useLocation, useParams } from 'react-router-dom';
import { styled, Container } from '@mui/material';
import AddressTransactionList from '../../components/AddressTransactionList';
import AddressHeader from '../../components/AddressDetail/AddressHeader';
import AddressAnalytics from '../../components/AddressDetail/AddressAnalytics';
import useFetch from '../../commons/hooks/useFetch';
import NoRecord from '../../components/commons/NoRecord';
import { useEffect, useRef } from 'react';
import { API } from '../../commons/utils/api';

const AddressWalletDetail = () => {
  const { address } = useParams<{ address: string }>();
  const { state } = useLocation<{ data?: WalletAddress }>();
  const { data, loading, initialized, error } = useFetch<WalletAddress>(
    state?.data ? '' : `${API.ADDRESS.DETAIL}/${address}`,
    state?.data
  );
  const mainRef = useRef(document.querySelector('#main'));
  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Address ${address} | Cardano Explorer`;
    mainRef.current?.scrollTo(0, 0);
  }, [address]);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <ContainerBox>
      <AddressHeader data={data} loading={loading} />
      <AddressAnalytics />
      <AddressTransactionList url={`${API.ADDRESS.DETAIL}/${address}/txs`} />
    </ContainerBox>
  );
};

export default AddressWalletDetail;

const ContainerBox = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;
