import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import AddressOverview from "../../components/ContractDetail/AddressOverview";
import ContractDetailContent from "../../components/ContractDetail/ContractDetailContent";

import { StyledContainer } from "./styles";

interface ITokenDetail {}

const TokenDetail: React.FC<ITokenDetail> = () => {
  const params = useParams<{ tokenId: string }>();
  const { data: tokenOverview } = useFetch<ITokenOverview>(`tokens/${params.tokenId}`);

  useEffect(() => {
    async function loadMetadata() {
      if (tokenOverview) {
        try {
          const {
            data: { subjects },
          } = await axios.post("/metadata/query", {
            subjects: [`${tokenOverview.policy}${tokenOverview.name}`],
            properties: ["policy", "logo", "decimals"],
          });
        } catch (err) {}
      }
      return true;
    }
    loadMetadata();
  }, [tokenOverview]);

  return (
    <StyledContainer>
      <AddressOverview />
      <ContractDetailContent />
    </StyledContainer>
  );
};

export default TokenDetail;
