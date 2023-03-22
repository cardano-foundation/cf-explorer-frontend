import { useLocation, useParams } from "react-router-dom";
import TransactionListsFull from "../../components/TransactionListsFull";
import BlockOverview from "../../components/BlockDetail/BlockOverview";
import useFetch from "../../commons/hooks/useFetch";
import { StyledContainer } from "./styles";
import NoRecord from "../../components/commons/NoRecord";
import { useEffect } from "react";
import { API } from "../../commons/utils/api";

const BlockDetail = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const { state } = useLocation<{ data?: BlockDetail }>();
  const { data, loading, initialized, error } = useFetch<BlockDetail>(
    state?.data ? "" : `${API.BLOCK.DETAIL}/${blockId}`,
    state?.data
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Block ${blockId} | Cardano Explorer`;
  }, [blockId]);

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <BlockOverview data={data} loading={loading} />
      <TransactionListsFull
        underline={true}
        url={`${API.BLOCK.DETAIL}/${blockId}/txs`}
      />
    </StyledContainer>
  );
};

export default BlockDetail;
