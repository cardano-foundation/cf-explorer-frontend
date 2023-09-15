import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TransactionListsFull from "src/components/TransactionListsFull";
import BlockOverview from "src/components/BlockDetail/BlockOverview";
import useFetch from "src/commons/hooks/useFetch";
import NoRecord from "src/components/commons/NoRecord";
import { API } from "src/commons/utils/api";

import { StyledContainer } from "./styles";

const BlockDetail = () => {
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { blockId } = useParams<{ blockId: string }>();
  const { state } = useLocation<{ data?: BlockDetail }>();
  const { data, loading, initialized, error, lastUpdated } = useFetch<BlockDetail>(
    `${API.BLOCK.DETAIL}/${blockId}`,
    state?.data,
    false,
    blockKey
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
