import { useLocation, useParams } from "react-router-dom";
import { parse } from "qs";

import TransactionLists from "../../components/TransactionListsFull";
import BlockOverview from "../../components/BlockDetail/BlockOverview";
import useFetch from "../../commons/hooks/useFetch";
import useFetchList from "../../commons/hooks/useFetchList";

import { StyledContainer } from "./styles";

const BlockDetail = () => {
  const params = useParams<{ blockId: string }>();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const { data: blockDetail, loading: blockDetailLoading } = useFetch<BlockDetail>(`block/${params.blockId}`);
  const {
    data: transactions,
    loading: transactionsLoading,
    initialized,
    total,
    totalPage,
    currentPage,
  } = useFetchList<Transactions>("tx/list", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
    blockNo: params.blockId,
  });

  return (
    <StyledContainer>
      <BlockOverview data={blockDetail} loading={blockDetailLoading} />
      <TransactionLists
        underline={true}
        currentPage={currentPage}
        loading={transactionsLoading}
        initialized={initialized}
        transactions={transactions}
        total={total}
        totalPage={totalPage}
      />
    </StyledContainer>
  );
};

export default BlockDetail;
