import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as UtxoIcon } from "../../../commons/resources/images/utxoIcon.svg";
import { ReactComponent as Script } from "../../../commons/resources/images/script.svg";
import { TabTitle } from "./styles";
import TokenTransaction from "./TokenTransaction";

const ContractDetailContent: React.FC = data => {
  const [activeTab, setActiveTab] = useState("transaction");

  const handleChange = (event: React.SyntheticEvent, tabs: string) => {
    setActiveTab(tabs);
  };

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <TabTitle className={activeTab === "transaction" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <UtxoIcon fill={activeTab === "transaction" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Transaction</Box>
          </Box>
        </TabTitle>
      ),
      key: "transaction",
      children: <TokenTransaction active={true} tokenId="asset1c6t4elexwkpuzq08ssylhhmc78ahlz0sgw5a7y" />,
    },
    {
      label: (
        <TabTitle className={activeTab === "transcript" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <Script fill={activeTab === "transcript" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Transcript</Box>
          </Box>
        </TabTitle>
      ),
      key: "transcript",
      children: <TokenTransaction active={true} tokenId="asset1c6t4elexwkpuzq08ssylhhmc78ahlz0sgw5a7y" />,
    },
  ];

  return (
    <TabContext value={activeTab}>
      <Box>
        <TabList
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "#438f68", color: "#438f68", height: "3px" } }}
        >
          {tabs?.map(item => (
            <Tab key={item.key} label={item.label} value={item.key} />
          ))}
        </TabList>
      </Box>
      {tabs.map(item => (
        <TabPanel
          sx={{ padding: 0, borderTop: "1px solid rgba(24, 76, 120, 0.1)" }}
          key={item.key}
          value={item.key}
        >
          {item.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default ContractDetailContent;
