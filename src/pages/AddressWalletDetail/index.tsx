import { useLocation, useParams } from "react-router-dom";
import { styled, Container, Button } from "@mui/material";
import AddressTransactionList from "../../components/AddressTransactionList";
import AddressHeader from "../../components/AddressDetail/AddressHeader";
import AddressAnalytics from "../../components/AddressDetail/AddressAnalytics";
import useFetch from "../../commons/hooks/useFetch";
import NoRecord from "../../components/commons/NoRecord";
import { useEffect, useRef } from "react";

const AddressWalletDetail = () => {
  const { address } = useParams<{ address: string }>();
  const { state } = useLocation<{ data?: WalletAddress }>();
  const { data, loading, initialized, error } = useFetch<WalletAddress>(
    state?.data ? "" : `/address/${address}`,
    state?.data
  );

  const refBox = useRef(null);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    refBox.current && (refBox.current as any).scrollIntoView({ behavior: "smooth", block: "start" });
    document.title = `Address ${address} | Cardano Explorer`;
  }, [address]);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <ContainerBox ref={refBox}>
      <AddressHeader data={data} loading={loading} />
      <AddressAnalytics />
      <Button
      // onClick={scrollToTop}
      >
        scroll
      </Button>
      <AddressTransactionList url={`/address/${address}/txs`} />
    </ContainerBox>
  );
};

export default AddressWalletDetail;

const ContainerBox = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;
