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
  const tabs: { label: React.ReactNode; key: keyof Transaction; children: React.ReactNode }[] = [
    {
      label: <h3 className={styles.title}>Summary</h3>,
      key: "summary",
      children: <Summary data={data?.summary || null} />,
    },
    {
      label: <h3 className={styles.title}>UTXOs</h3>,
      key: "utxOs",
      children: <UTXO data={data?.utxOs || null} fee={data?.tx.fee || 0} />,
    },
    {
      label: <h3 className={styles.title}>Contracts({data?.contracts?.length || 0})</h3>,
      key: "contracts",
      children: <Contracts data={data?.contracts || null} />,
    },
    {
      label: <h3 className={styles.title}>Collaterals({data?.collaterals?.length || 0})</h3>,
      key: "collaterals",
      children: <Collaterals data={data?.collaterals || null} />,
    },
    {
      label: <h3 className={styles.title}>Notes({data?.notes?.length || 0})</h3>,
      key: "notes",
      children: "",
    },
    {
      label: <h3 className={styles.title}>Withdrawals({data?.withdrawals?.length || 0})</h3>,
      key: "withdrawals",
      children: <Withdrawals data={data?.withdrawals || null} />,
    },
    {
      label: <h3 className={styles.title}>Delegations({data?.delegations?.length || 0})</h3>,
      key: "delegations",
      children: <Delegations data={data?.delegations || null} />,
    },
    {
      label: <h3 className={styles.title}>Minting</h3>,
      key: "mints",
      children: <Minting data={data?.mints || null} />,
    },
  ];

  const items = tabs.filter(item => data?.[item.key]);

  return <Tabs items={items} style={{ fontSize: 24 }} className={styles.tab} defaultActiveKey="summary" />;
};

export default TransactionMetadata;
