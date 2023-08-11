import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled, Container } from "@mui/material";

import AddressTransactionList from "src/components/AddressTransactionList";
import AddressHeader from "src/components/AddressDetail/AddressHeader";
import AddressAnalytics from "src/components/AddressDetail/AddressAnalytics";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";

const AddressWalletDetail = () => {
  const { address } = useParams<{ address: string }>();
  const { state } = useLocation<{ data?: WalletAddress }>();
  const { data, loading, initialized, error } = useFetch<WalletAddress>(
    state?.data ? "" : `${API.ADDRESS.DETAIL}/${address}`,
    state?.data
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Address ${address} | Cardano Blockchain Explorer`;
    document.documentElement.scrollTop = 0;
  }, [address]);

  if (!initialized && !state?.data) {
    return null;
  }

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <ContainerBox>
      <AddressHeader data={data} loading={loading} />
      <AddressAnalytics />
      <AddressTransactionList address={address} />
    </ContainerBox>
  );
};

export default AddressWalletDetail;

const ContainerBox = styled(Container)`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    padding-top: 0;
    margin-top: -20px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 20px;
    margin-top: 0px !important;
  }
`;
