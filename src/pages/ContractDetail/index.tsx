import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import NoRecord from "../../components/commons/NoRecord";
import AddressOverview from "../../components/ContractDetail/AddressOverview";
import ContractDetailContent from "../../components/ContractDetail/ContractDetailContent";
import { StyledContainer } from "./styles";

const ContractDetail: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { state } = useLocation<{ data?: WalletAddress }>();
  const { data, loading, initialized, error } = useFetch<WalletAddress>(
    state?.data ? "" : `address/${address}`,
    state?.data
  );

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <AddressOverview data={data} loading={loading} />
      <ContractDetailContent />
    </StyledContainer>
  );
};

export default ContractDetail;
