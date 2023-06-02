import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../commons/hooks/useFetch";
import { API } from "../../commons/utils/api";
import NoRecord from "../../components/commons/NoRecord";
import TokenOverview from "../../components/TokenDetail/TokenOverview";
import TokenTableData from "../../components/TokenDetail/TokenTableData";
import TokenAnalytics from "../../components/TokenDetail/TokenAnalytics";
import { AnalyticSkeleton, DataTableSkeleton, StyledContainer } from "./styles";

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
    mainRef.current?.scrollTo(0, 0);
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
        <TokenTableData totalSupply={data?.supply} metadata={data?.metadata} />
      </StyledContainer>
    </OverviewMetadataTokenContext.Provider>
  );
};

export default TokenDetail;
