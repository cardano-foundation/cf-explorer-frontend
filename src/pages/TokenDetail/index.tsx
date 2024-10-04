import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import NoRecord from "src/components/commons/NoRecord";
import TokenOverview from "src/components/TokenDetail/TokenOverview";
import TokenTableData from "src/components/TokenDetail/TokenTableData";
import TokenAnalytics from "src/components/TokenDetail/TokenAnalytics";
import FetchDataErr from "src/components/commons/FetchDataErr";

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
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const { data, loading, initialized, error, lastUpdated, statusError } = useFetch<IToken>(
    state?.data ? "" : `${API.TOKEN.LIST}/${tokenId}`,
    state?.data,
    false,
    blockKey
  );

  const [txCountRealtime, setTxCountRealtime] = useState<number>(0);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Token ${tokenId} | Cardano Blockchain Explorer`;
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tokenId]);

  if (error && (statusError || 0) >= 500) return <FetchDataErr />;
  if ((initialized && !data) || (error && (statusError || 0) < 500)) return <NoRecord />;

  return (
    <OverviewMetadataTokenContext.Provider
      value={{
        txCountRealtime,
        setTxCountRealtime
      }}
    >
      <StyledContainer>
        <TokenOverview data={data} loading={loading} lastUpdated={lastUpdated} />
        <TokenAnalytics dataToken={data} />
        <TokenTableData
          totalSupply={data?.supply}
          metadata={data?.metadata}
          metadataJson={data?.metadataJson}
          loading={loading}
          metadataCIP25={data?.metadataCIP25}
          metadataCIP60={data?.metadataCIP60}
        />
      </StyledContainer>
    </OverviewMetadataTokenContext.Provider>
  );
};

export default TokenDetail;
