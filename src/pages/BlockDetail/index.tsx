import { useParams } from "react-router-dom";

import TransactionListsFull from "../../components/TransactionListsFull";
import BlockOverview from "../../components/BlockDetail/BlockOverview";
import useFetch from "../../commons/hooks/useFetch";
import { StyledContainer } from "./styles";

const BlockDetail = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const { data, loading } = useFetch<BlockDetail>(`block/${blockId}`);

  return (
    <StyledContainer>
      <BlockOverview data={data} loading={loading} />
      <TransactionListsFull underline={true} url={`tx/list?blockNo=${blockId}`} />
    </StyledContainer>
  );
};

export default BlockDetail;
