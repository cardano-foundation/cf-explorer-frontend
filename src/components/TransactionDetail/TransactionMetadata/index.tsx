import React from "react";
import { Tab, Box, styled } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

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
  const [activeTab, setActiveTab] = React.useState("summary");

  const handleChange = (event: React.SyntheticEvent, tabs: keyof Transaction) => {
    setActiveTab(tabs);
  };
  const tabs: { label: React.ReactNode; key: keyof Transaction; children: React.ReactNode }[] = [
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "summary" && styles.active}`}>
          <Box component={"span"} ml={1} textAlign="left">
            Summary
          </Box>
        </h3>
      ),
      key: "summary",
      children: <Summary data={data?.summary || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "utxOs" && styles.active}`}>
          <Box component={"span"} ml={1}>
            UTXOs
          </Box>
        </h3>
      ),
      key: "utxOs",
      children: <UTXO data={data?.utxOs || null} fee={data?.tx.fee || 0} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "contracts" && styles.active}`}>
          Contracts({data?.contracts?.length || 0})
        </h3>
      ),
      key: "contracts",
      children: <Contracts data={data?.contracts || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "collaterals" && styles.active}`}>
          Collaterals({data?.collaterals?.length || 0})
        </h3>
      ),
      key: "collaterals",
      children: <Collaterals data={data?.collaterals || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "notes" && styles.active}`}>
          Notes({data?.notes?.length || 0})
        </h3>
      ),
      key: "notes",
      children: "",
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "withdrawals" && styles.active}`}>
          <Box component={"span"} ml={1}>
            Withdrawals({data?.withdrawals?.length || 0})
          </Box>
        </h3>
      ),
      key: "withdrawals",
      children: <Withdrawals data={data?.withdrawals || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "delegations" && styles.active}`}>
          Delegations({data?.delegations?.length || 0})
        </h3>
      ),
      key: "delegations",
      children: <Delegations data={data?.delegations || null} />,
    },
    {
      label: <h3 className={`${styles.title} ${activeTab === "mints" && styles.active}`}>Minting</h3>,
      key: "mints",
      children: <Minting data={data?.mints || null} />,
    },
  ];

  const items = tabs.filter(item => data?.[item.key]);

  return (
    <>
      <TabContext value={activeTab}>
        <Box className={styles.tab} paddingX={3}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{ style: { background: "#438f68", color: "#438f68" } }}
            style={{ paddingBottom: 0 }}
          >
            {items?.map(item => (
              <Tab key={item.key} label={item.label} value={item.key} />
            ))}
          </TabList>
        </Box>
        {items.map(item => (
          <TabPanel key={item.key} value={item.key}>
            {item.children}
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
};

export default TransactionMetadata;
