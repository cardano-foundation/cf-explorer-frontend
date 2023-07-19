import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import TokenOverview from "src/components/TokenDetail/TokenOverview";
import TokenTableData from "src/components/TokenDetail/TokenTableData";
import TokenAnalytics from "src/components/TokenDetail/TokenAnalytics";

import { StyledContainer } from "./styles";

interface IOverviewMetadataContext {
  txCountRealtime: number;
  setTxCountRealtime: React.Dispatch<React.SetStateAction<number>>;
}

export const OverviewMetadataTokenContext = createContext<IOverviewMetadataContext>({
  txCountRealtime: 0,
  setTxCountRealtime: () => 0
});

const TokenDetail: React.FC = () => {
  const mainRef = useRef(document.querySelector("#main"));
  const { tokenId } = useParams<{ tokenId: string }>();
  const { state } = useLocation<{ data?: IToken }>();
  const { data, loading, initialized, error } = useFetch<IToken>(
    state?.data ? "" : `${API.TOKEN.LIST}/${tokenId}`,
    state?.data
  );

  const [txCountRealtime, setTxCountRealtime] = useState<number>(0);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Token ${tokenId} | Cardano Explorer`;
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tokenId]);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <OverviewMetadataTokenContext.Provider
      value={{
        txCountRealtime,
        setTxCountRealtime
      }}
    >
      <StyledContainer>
        <TokenOverview data={data} loading={loading} />
        <TokenAnalytics />
        <TokenTableData totalSupply={data?.supply} metadata={data?.metadata} metadataJson={data?.metadataJson} />
      </StyledContainer>
    </OverviewMetadataTokenContext.Provider>
  );
};

export default TokenDetail;
