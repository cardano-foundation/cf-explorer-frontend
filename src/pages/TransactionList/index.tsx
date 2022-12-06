import React from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";

import useFetchList from "../../commons/hooks/useFetchList";
import TransactionList from "../../components/TransactionLists";
import styles from "./index.module.scss";

interface Props {}

const Transactions: React.FC<Props> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

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
  });

  return (
    <div className={styles.container}>
      <TransactionList
        currentPage={currentPage}
        loading={transactionsLoading}
        initialized={initialized}
        transactions={transactions}
        total={total}
        totalPage={totalPage}
      />
    </div>
  );
};

export default Transactions;
