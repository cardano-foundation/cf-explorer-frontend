import React, { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import AddressOverview from "src/components/ContractDetail/AddressOverview";
import ContractDetailContent from "src/components/ContractDetail/ContractDetailContent";

import { BackButton, BackText, StyledContainer, WrapHeader } from "./styles";

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
          <HiArrowLongLeft fontSize="16px" />
          <BackText>Back</BackText>
        </BackButton>
      </WrapHeader>
      <AddressOverview data={data} loading={loading} />
      <ContractDetailContent />
    </StyledContainer>
  );
};

export default ContractDetail;
