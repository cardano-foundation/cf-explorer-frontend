import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import NoRecord from "../../components/commons/NoRecord";
import TokenOverview from "../../components/TokenDetail/TokenOverview";
import TokenTableData from "../../components/TokenDetail/TokenTableData";
import { StyledContainer } from "./styles";

const TokenDetail: React.FC = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const { state } = useLocation<{ data?: IToken }>();
  const { data, loading, initialized, error } = useFetch<IToken>(state?.data ? "" : `tokens/${tokenId}`, state?.data);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Token ${tokenId} | Cardano Explorer`;
  }, []);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <TokenOverview data={data} loading={loading} />
      <TokenTableData totalSupply={data?.supply} />
    </StyledContainer>
  );
};

export default TokenDetail;
