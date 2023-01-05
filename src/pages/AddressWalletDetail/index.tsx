import { useParams } from "react-router-dom";
import { styled, Container } from "@mui/material";
import AddressTransactionList from "../../components/AddressTransactionList";
import AddressHeader from "../../components/AddressDetail/AddressHeader";
import AddressAnalytics from "../../components/AddressDetail/AddressAnalytics";

const AddressWalletDetail = () => {
  const { address } = useParams<{ address: string }>();
  return (
    <ContainerBox>
      <AddressHeader />
      <AddressAnalytics />
      <AddressTransactionList url={`/address/${address}/txs`} />
    </ContainerBox>
  );
};

export default AddressWalletDetail;

const ContainerBox = styled(Container)`
  padding-top: 30px;
  padding-bottom: 40px;
`;
