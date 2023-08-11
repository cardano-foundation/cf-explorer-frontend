import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import TransactionListsFull from "src/components/TransactionListsFull";
import BlockOverview from "src/components/BlockDetail/BlockOverview";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";
import { REFRESH_TIMES } from "src/commons/utils/constants";

import { StyledContainer } from "./styles";

const BlockDetail = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const { state } = useLocation<{ data?: BlockDetail }>();
  const { data, loading, initialized, error, lastUpdated } = useFetch<BlockDetail>(
    `${API.BLOCK.DETAIL}/${blockId}`,
    state?.data,
    false,
    REFRESH_TIMES.BLOCK_DETAIL
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Block ${blockId} | Cardano Blockchain Explorer`;
  }, [blockId]);

  if (!initialized) {
    return null;
  }

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <BlockOverview data={data} loading={loading} lastUpdated={lastUpdated} />
      <TransactionListsFull underline={true} url={`${API.BLOCK.DETAIL}/${blockId}/txs`} />
    </StyledContainer>
  );
};

export default BlockDetail;
