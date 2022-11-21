import { parse } from "qs";
import { useLocation } from "react-router-dom";

import useFetchList from "../../commons/hooks/useFetchList";
import BlockListTable from "../../components/BlockLists/index";

import styles from "./index.module.scss";

const BlockList = () => {
  //TO DO
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const { data, loading, total, totalPage, currentPage } =
    useFetchList<Block>("block/list", {
      page: query.page ? +query.page - 1 : 0,
      size: query.size ? (query.size as string) : 10,
    });

  return (
    <div className={styles.container}>
      <BlockListTable
        blockLists={data}
        total={total}
        totalPage={totalPage}
        currentPage={currentPage}
        loading={loading}
      />
    </div>
  );
};

export default BlockList;
