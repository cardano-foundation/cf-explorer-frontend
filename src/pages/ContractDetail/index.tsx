import React from "react";

import AddressOverview from "../../components/ContractDetail/AddressOverview";
import ContractDetailContent from "../../components/ContractDetail/ContractDetailContent";

import { StyledContainer } from "./styles";

const ContractDetail: React.FC = () => {
  return (
    <StyledContainer>
      <AddressOverview />
      <ContractDetailContent />
    </StyledContainer>
  );
};

export default ContractDetail;
