import React from "react";
import { useParams } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";

import TransactionOverview from "../../components/TransactionDetail/TransactionOverview";
import TransactionMetadata from "../../components/TransactionDetail/TransactionMetadata";
import styles from "./index.module.scss";
import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";

interface Props {}

const Transaction: React.FC<Props> = () => {
  const params = useParams<{ trxHash: string }>();
  const { data: transactionDetail, loading } = useFetch<Transaction>(`tx/${params.trxHash}`);

  return (
    <div className={styles.container}>
      <TransactionOverview data={transactionDetail} loading={loading} />
      <Box>
        {loading && <TransactionMetadataSekeleton />}
        {!loading && <TransactionMetadata data={transactionDetail} loading={loading} />}
      </Box>
    </div>
  );
};

export default Transaction;

const TransactionMetadataSekeleton = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" className={styles.header} />
      <Skeleton variant="rectangular" className={styles.body} />
    </Card>
  );
};
