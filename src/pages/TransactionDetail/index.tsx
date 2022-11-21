import React from "react";
import TransactionOverview from "../../components/TransactionOverview";
import TransactionMetadata from "../../components/TransactionMetadata";
import styles from "./index.module.scss";

interface Props {}

const Transaction: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <TransactionOverview />
      <TransactionMetadata />
    </div>
  );
};

export default Transaction;
