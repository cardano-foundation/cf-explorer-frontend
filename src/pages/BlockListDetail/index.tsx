import React from "react";

import TransactionLists from "../../components/TransactionLists";
import BlockListDetail from "../../components/BlockListDetail";

import styles from "./index.module.scss";

const BlockList = () => {
  return (
    <div className={styles.container}>
      <BlockListDetail />
      <TransactionLists />
    </div>
  );
};

export default BlockList;
