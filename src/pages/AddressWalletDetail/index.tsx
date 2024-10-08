import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled, Container, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";

import AddressTransactionList from "src/components/AddressTransactionList";
import AddressHeader from "src/components/AddressDetail/AddressHeader";
import AddressAnalytics from "src/components/AddressDetail/AddressAnalytics";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";
import useADAHandle from "src/commons/hooks/useADAHandle";
import FetchDataErr from "src/components/commons/FetchDataErr";

const AddressWalletDetail = () => {
  const { address } = useParams<{ address: string }>();
  const [addressWallet, setAddressWallet] = useState("");
  const { state } = useLocation<{ data?: WalletAddress }>();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const [{ data: adaHandle, loading: adaHandleLoading, initialized: ADAHandleInitialized }] = useADAHandle(address);

  useEffect(() => {
    if (ADAHandleInitialized) {
      if (adaHandle?.paymentAddress) {
        setAddressWallet(adaHandle?.paymentAddress);
      } else {
        setAddressWallet(address);
      }
    }
  }, [JSON.stringify(adaHandle), adaHandleLoading, address, ADAHandleInitialized]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Address ${address} | Cardano Blockchain Explorer`;
    document.documentElement.scrollTop = 0;
  }, [address]);

  const { data, loading, initialized, error, statusError } = useFetch<WalletAddress>(
    addressWallet ? `${API.ADDRESS.DETAIL}/${addressWallet}` : "",
    state?.data,
    false,
    blockKey
  );

  if (adaHandleLoading || loading || !initialized || (!ADAHandleInitialized && !state?.data)) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  if (error && (statusError || 0) >= 500) return <FetchDataErr />;
  if (initialized && (!data || (error && (statusError || 0) < 500)) && !loading) return <NoRecord />;

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
