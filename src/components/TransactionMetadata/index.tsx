// import type { TabsProps } from "antd";
import { Tabs } from "antd";
import React from "react";
import styles from "./index.module.scss";
import "./index.css";
import UTXO from "./UTXO";

interface Props {}

const items = [
    { label: "Summary", key: "item-1", children: "This is children" },
    { label: "UTXOs", key: "item-2", children: <UTXO /> },
    { label: `Contracts (${1})`, key: "item-3", children: "" },
    { label: `Collateral (${1})`, key: "item-4", children: "" },
    { label: `Notes (${1})`, key: "item-5", children: "" },
];

const TransactionMetadata: React.FC<Props> = () => (
    <Tabs items={items} className={styles.tab} defaultActiveKey="item-1" />
);

export default TransactionMetadata;
