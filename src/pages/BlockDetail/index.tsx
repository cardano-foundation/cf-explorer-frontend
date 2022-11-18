import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { parse } from "qs";

import TransactionLists from "../../components/TransactionLists";
import BlockOverview from "../../components/BlockOverview";

import styles from "./index.module.scss";
import useFetch from "../../commons/hooks/useFetch";
import useFetchList from "../../commons/hooks/useFetchList";

const BlockDetail = () => {
  const params = useParams<{ blockId: string }>();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const { data: blockDetail, loading: blockDetailLoading } =
    useFetch<BlockDetail>(
      `http://172.16.1.230:8033/api/v1/block/${params.blockId}`
    );
  //TO DO
  const {
    data: transactions,
    loading: transactionsLoading,
    total,
    totalPage,
    currentPage,
  } = useFetchList<Transactions>("http://172.16.1.230:8033/api/v1/tx/list", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
    blockNo: params.blockId,
  });
  return (
    <div className={styles.container}>
      <BlockOverview data={blockDetail} loading={blockDetailLoading} />
      <TransactionLists
        currentPage={currentPage}
        loading={transactionsLoading}
        transactions={transactions}
        total={total}
        totalPage={totalPage}
      />
    </div>
  );
};

export default BlockDetail;
