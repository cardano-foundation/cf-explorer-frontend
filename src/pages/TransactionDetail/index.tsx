import React from "react";
import { useParams } from "react-router-dom";

import TransactionOverview from "../../components/TransactionDetail/TransactionOverview";
import TransactionMetadata from "../../components/TransactionDetail/TransactionMetadata";
import styles from "./index.module.scss";
import useFetch from "../../commons/hooks/useFetch";
import { Skeleton } from "antd";
import Card from "../../components/commons/Card";

interface Props {}

const Transaction: React.FC<Props> = () => {
  const params = useParams<{ trxHash: string }>();
  const { data: transactionDetail, loading } = useFetch<Transaction>(`tx/${params.trxHash}`);

  return (
    <div className={styles.container}>
      <TransactionOverview data={transactionDetail} loading={loading} />
      {loading && <TransactionMetadataSekeleton />}
      {!loading && <TransactionMetadata data={transactionDetail} loading={loading} />}
    </div>
  );
};

export default Transaction;

const TransactionMetadataSekeleton = () => {
  return (
    <Card>
      <Skeleton.Input block active className={styles.header} />
      <Skeleton.Input block active className={styles.body} />
    </Card>
  );
};
