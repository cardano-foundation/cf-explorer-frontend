import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import TokenOverview from "../../components/TokenDetail/TokenOverview";
import TokenTableData from "../../components/TokenDetail/TokenTableData";

import { StyledContainer } from "./styles";

interface ITokenDetail {}

const TokenDetail: React.FC<ITokenDetail> = () => {
  const params = useParams<{ tokenId: string }>();
  const { data, loading } = useFetch<IToken>(`tokens/${params.tokenId}`);

  return (
    <StyledContainer>
      <TokenOverview data={data} loading={loading} />
      <TokenTableData totalSupply={data?.supply} />
    </StyledContainer>
  );
};

export default TokenDetail;
