import React from "react";
import { Tabs } from "antd";

import styles from "./index.module.scss";
import "./index.css";
import UTXO from "./UTXOs";
import Summary from "./Summary";
import Contracts from "./Contracts";
import Collaterals from "./Collaterals";
import Withdrawals from "./Withdrawals";
import Delegations from "./Delegations";
import Minting from "./Minting";

interface TransactionMetadataProps {
  data: Transaction | null;
  loading: boolean;
}

const TransactionMetadata: React.FC<TransactionMetadataProps> = ({ data, loading }) => {
  const tabs: { label: string; key: keyof Transaction; children: React.ReactNode }[] = [
    {
      label: "Summary",
      key: "summary",
      children: <Summary data={(data && data["summary"]) || null} />,
    },
    {
      label: "UTXOs",
      key: "utxOs",
      children: <UTXO data={(data && data["utxOs"]) || null} fee={data?.tx.fee || 0} />,
    },
    {
      label: `Contracts(${data?.contracts?.length || 0})`,
      key: "contracts",
      children: <Contracts data={(data && data["contracts"]) || null} />,
    },
    {
      label: `Collaterals(${data?.collaterals?.length || 0})`,
      key: "collaterals",
      children: <Collaterals data={(data && data["collaterals"]) || null} />,
    },
    {
      label: `Notes(${data?.notes?.length || 0})`,
      key: "notes",
      children: "",
    },
    {
      label: `Withdrawals(${data?.withdrawals?.length || 0})`,
      key: "withdrawals",
      children: <Withdrawals data={(data && data["withdrawals"]) || null} />,
    },
    {
      label: `Delegations(${data?.delegations?.length || 0})`,
      key: "delegations",
      children: <Delegations data={(data && data["delegations"]) || null} />,
    },
    {
      label: `Mints(${data?.mints?.length || 0})`,
      key: "mints",
      children: <Minting data={(data && data["mints"]) || null} />,
    },
  ];

  const items = tabs.filter(item => data?.[item.key]);

  return <Tabs items={items} style={{ fontSize: 24 }} className={styles.tab} defaultActiveKey="summary" />;
};

export default TransactionMetadata;
