import React from "react";
import TransactionList from "../../components/TransactionLists";
import styles from "./index.module.scss";

interface Props {}

const Transactions: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <TransactionList />
    </div>
  );
};

export default Transactions;
