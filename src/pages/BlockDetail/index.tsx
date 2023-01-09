import { useLocation, useParams } from "react-router-dom";
import TransactionListsFull from "../../components/TransactionListsFull";
import BlockOverview from "../../components/BlockDetail/BlockOverview";
import useFetch from "../../commons/hooks/useFetch";
import { StyledContainer } from "./styles";
import NoRecord from "../../components/commons/NoRecord";

const BlockDetail = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const { state } = useLocation<{ data?: BlockDetail }>();
  const { data, loading, initialized, error } = useFetch<BlockDetail>(
    state?.data ? "" : `block/${blockId}`,
    state?.data
  );

  if ((initialized && !data) || error) return <NoRecord />;

  return (
    <StyledContainer>
      <BlockOverview data={data} loading={loading} />
      <TransactionListsFull underline={true} url={`tx/list?blockNo=${blockId}`} />
    </StyledContainer>
  );
};

export default BlockDetail;
