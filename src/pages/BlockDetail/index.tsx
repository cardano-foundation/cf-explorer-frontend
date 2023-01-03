import { useParams } from "react-router-dom";

import TransactionLists from "../../components/TransactionLists";
import BlockOverview from "../../components/BlockDetail/BlockOverview";
import useFetch from "../../commons/hooks/useFetch";
import { StyledContainer } from "./styles";

const BlockDetail = () => {
  const { blockId } = useParams<{ blockId: string }>();
  const { data, loading } = useFetch<BlockDetail>(`block/${blockId}`);

  return (
    <StyledContainer>
      <BlockOverview data={data} loading={loading} />
      <TransactionLists underline={true} url={`tx/list?blockNo=${blockId}`} />
    </StyledContainer>
  );
};

export default BlockDetail;
