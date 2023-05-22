import React, { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import { API } from "../../commons/utils/api";
import NoRecord from "../../components/commons/NoRecord";
import AddressOverview from "../../components/ContractDetail/AddressOverview";
import ContractDetailContent from "../../components/ContractDetail/ContractDetailContent";
import { BackButton, BackText, StyledContainer, WrapHeader } from "./styles";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Box } from "@mui/material";

const ContractDetail: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const history = useHistory();
  const { state } = useLocation<{ data?: WalletAddress }>();
  const { data, loading, initialized, error } = useFetch<WalletAddress>(
    state?.data ? "" : `${API.ADDRESS.DETAIL}/${address}`,
    state?.data
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Contract ${address} | Cardano Explorer`;
  }, [address]);

  if (!initialized) {
    return null;
  }

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <WrapHeader textAlign={"left"}>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft fontSize='16px' />
          <BackText>Back</BackText>
        </BackButton>
      </WrapHeader>
      <AddressOverview data={data} loading={loading} />
      <ContractDetailContent />
    </StyledContainer>
  );
};

export default ContractDetail;
