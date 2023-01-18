import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { ReactComponent as UtxoIcon } from "../../../commons/resources/images/utxoIcon.svg";
import { TabTitle } from "./styles";
import TokenTransaction from "./TokenTransaction";
import { useHistory, useParams } from "react-router-dom";
import { details } from "../../../commons/routers";

const ContractDetailContent: React.FC = () => {
  const { tabActive = "transaction", address } = useParams<{
    tabActive: "transaction" | "transcript";
    address: string;
  }>();
  const history = useHistory();

  const handleChange = (event: React.SyntheticEvent, tab: "transaction" | "transcript") => {
    history.push({ pathname: details.contract(address, tab) });
  };

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <TabTitle className={tabActive === "transaction" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <UtxoIcon fill={tabActive === "transaction" ? "#438F68" : "#98A2B3"} />
            <Box pl={1}>Transaction</Box>
          </Box>
        </TabTitle>
      ),
      key: "transaction",
      children: <TokenTransaction />,
    },
    // {
    //   label: (
    //     <TabTitle className={tabActive === "transcript" ? "active" : ""}>
    //       <Box display={"flex"} alignItems="center">
    //         <Script fill={tabActive === "transcript" ? "#438F68" : "#98A2B3"} />
    //         <Box pl={1}>Transcript</Box>
    //       </Box>
    //     </TabTitle>
    //   ),
    //   key: "transcript",
    //   children: <TokenTransaction />,
    // },
  ];

  return (
    <TabContext value={tabActive}>
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
        <TabPanel sx={{ padding: 0, borderTop: "1px solid rgba(24, 76, 120, 0.1)" }} key={item.key} value={item.key}>
          {item.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default ContractDetailContent;
