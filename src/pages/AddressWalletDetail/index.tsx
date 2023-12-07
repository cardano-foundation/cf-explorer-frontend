import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled, Container, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import QueryString from "qs";

import AddressTransactionList from "src/components/AddressTransactionList";
import AddressHeader from "src/components/AddressDetail/AddressHeader";
import AddressAnalytics from "src/components/AddressDetail/AddressAnalytics";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";
import useADAHandle from "src/commons/hooks/useADAHandle";

const AddressWalletDetail = () => {
  const { address } = useParams<{ address: string }>();
  const [addressWallet, setAddressWallet] = useState("");
  const { state, search } = useLocation<{ data?: WalletAddress }>();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const queryParams = QueryString.parse(search.slice(1, search.length));

  const [{ data: adaHandle, loading: adaHandleLoading, initialized: ADAHandleInitialized }] = useADAHandle(address);

  useEffect(() => {
    if (ADAHandleInitialized) {
      if (adaHandle?.paymentAddress && queryParams?.isADAHanlde) {
        setAddressWallet(adaHandle?.paymentAddress);
      } else {
        setAddressWallet(address);
      }
    }
  }, [JSON.stringify(adaHandle), adaHandleLoading, address]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Address ${address} | Cardano Blockchain Explorer`;
    document.documentElement.scrollTop = 0;
  }, [address]);

  const { data, loading, initialized, error } = useFetch<WalletAddress>(
    addressWallet ? `${API.ADDRESS.DETAIL}/${addressWallet}` : "",
    state?.data,
    false,
    blockKey
  );

  if (!initialized && !state?.data) {
    return null;
  }
  if (adaHandleLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  if (initialized && (!data || error) && !loading) return <NoRecord />;

  return (
    <ContainerBox>
      <AddressHeader adaHanldeData={adaHandle} data={data} loading={loading} />
      <AddressAnalytics address={addressWallet} />
      <AddressTransactionList address={addressWallet} />
    </ContainerBox>
  );
};

export default AddressWalletDetail;

const ContainerBox = styled(Container)`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    margin-top: -20px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    margin-top: 0px !important;
  }
`;
