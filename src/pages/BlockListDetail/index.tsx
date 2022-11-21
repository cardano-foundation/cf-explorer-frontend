import React from "react";

import TransactionLists from "../../components/TransactionLists";
import BlockOverview from "../../components/BlockOverview";

import styles from "./index.module.scss";

const BlockList = () => {
  return (
    <div className={styles.container}>
      {/* <BlockOverview /> */}
      <TransactionLists />
    </div>
  );
};

export default BlockList;
