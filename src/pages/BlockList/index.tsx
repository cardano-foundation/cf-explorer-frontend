import React from "react";

import BlockListTable from "../../components/BlockLists";

import styles from "./index.module.scss";

const BlockList = () => {
  return (
    <div className={styles.container}>
      <BlockListTable />
    </div>
  );
};

export default BlockList;
