import React from "react";
import { Tab, Box } from "@mui/material";
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
import { ReactComponent as SummaryIcon } from "../../../commons/resources/images/summaryIcon.svg";
import { ReactComponent as UtxoIcon } from "../../../commons/resources/images/utxoIcon.svg";
import { ReactComponent as ContractIcon } from "../../../commons/resources/images/contractIcon.svg";
import { ReactComponent as CollateralIcon } from "../../../commons/resources/images/collateralIcon.svg";
import { ReactComponent as NoteIcon } from "../../../commons/resources/images/noteIcon.svg";
import { ReactComponent as WithdrawalIcon } from "../../../commons/resources/images/WithdrawalIcon.svg";
import { ReactComponent as MintingIcon } from "../../../commons/resources/images/mintingIcon.svg";
import { ReactComponent as DelegationIcon } from "../../../commons/resources/images/DelegationIcon.svg";

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
          <Box display={"flex"} alignItems="center">
            <SummaryIcon fill={activeTab === "summary" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Summary</Box>
          </Box>
        </h3>
      ),
      key: "summary",
      children: <Summary data={data?.summary || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "utxOs" && styles.active}`}>
          <Box display={"flex"} alignItems="center">
            <UtxoIcon fill={activeTab === "utxOs" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}> UTXOs</Box>
          </Box>
        </h3>
      ),
      key: "utxOs",
      children: <UTXO data={data?.utxOs || null} fee={data?.tx.fee || 0} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "contracts" && styles.active}`}>
          <Box display={"flex"} alignItems="center">
            <ContractIcon fill={activeTab === "contracts" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}> Contracts({data?.contracts?.length || 0})</Box>
          </Box>
        </h3>
      ),
      key: "contracts",
      children: <Contracts data={data?.contracts || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "collaterals" && styles.active}`}>
          <Box display={"flex"} alignItems="center">
            <CollateralIcon fill={activeTab === "collaterals" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}> Collaterals({data?.collaterals?.length || 0})</Box>
          </Box>
        </h3>
      ),
      key: "collaterals",
      children: <Collaterals data={data?.collaterals || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "notes" && styles.active}`}>
          <Box display={"flex"} alignItems="center">
            <NoteIcon fill={activeTab === "notes" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}> Notes({data?.notes?.length || 0})</Box>
          </Box>
        </h3>
      ),
      key: "notes",
      children: "",
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "withdrawals" && styles.active}`}>
          <Box display={"flex"} alignItems="center">
            <WithdrawalIcon fill={activeTab === "withdrawals" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Withdrawals({data?.withdrawals?.length || 0})</Box>
          </Box>
        </h3>
      ),
      key: "withdrawals",
      children: <Withdrawals data={data?.withdrawals || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "delegations" && styles.active}`}>
          <Box display={"flex"} alignItems="center">
            <DelegationIcon fill={activeTab === "delegations" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}> Delegations({data?.delegations?.length || 0})</Box>
          </Box>
        </h3>
      ),
      key: "delegations",
      children: <Delegations data={data?.delegations || null} />,
    },
    {
      label: (
        <h3 className={`${styles.title} ${activeTab === "mints" && styles.active}`}>
          <Box display={"flex"} alignItems="center">
            <MintingIcon fill={activeTab === "mints" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Minting</Box>
          </Box>
        </h3>
      ),
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
            TabIndicatorProps={{ style: { background: "#438f68", color: "#438f68" } }}
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
