import { parse } from "qs";
import { useLocation } from "react-router-dom";

import useFetchList from "../../commons/hooks/useFetchList";
import BlockListTable from "../../components/BlockLists";

import { Container } from "./styles";

const BlockList = () => {
  //TO DO
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const { data, loading, initialized, total, totalPage, currentPage } = useFetchList<Block>("block/list", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  return (
    <Container>
      <BlockListTable
        blockLists={data}
        total={total}
        totalPage={totalPage}
        currentPage={currentPage}
        loading={loading}
        initialized={initialized}
      />
    </Container>
  );
};

export default BlockList;
