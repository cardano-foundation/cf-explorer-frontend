import { TabContext, TabList, TabPanel } from "@mui/lab";
import { alpha, Box, Tab, useTheme } from "@mui/material";
import React from "react";
import { ReactComponent as UtxoIcon } from "../../../commons/resources/images/utxoIcon.svg";
import { TabListStyled, TabTitle } from "./styles";
import TokenTransaction from "./TokenTransaction";
import { useHistory, useParams } from "react-router-dom";
import { details } from "../../../commons/routers";

const ContractDetailContent: React.FC = () => {
  const { tabActive = "transaction", address } = useParams<{
    tabActive: "transaction" | "transcript";
    address: string;
  }>();
  const history = useHistory();
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, tab: "transaction" | "transcript") => {
    history.push({ pathname: details.contract(address, tab) });
  };

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <TabTitle className={tabActive === "transaction" ? "active" : ""}>
          <Box display={"flex"} alignItems='center'>
            <UtxoIcon fill={tabActive === "transaction" ? theme.palette.primary.main : theme.palette.text.hint} />
            <Box pl={1}>Transaction</Box>
          </Box>
        </TabTitle>
      ),
      key: "transaction",
      children: <TokenTransaction />
    }
  ];

  return (
    <TabContext value={tabActive}>
      <Box>
        <TabListStyled
          onChange={handleChange}
          TabIndicatorProps={{ sx: { background: (theme) => theme.palette.primary.main, height: 3 } }}
        >
          {tabs?.map((item) => (
            <Tab key={item.key} label={item.label} value={item.key} sx={{
              padding: "12px 0",
            }}/>
          ))}
        </TabListStyled>
      </Box>
      {tabs.map((item) => (
        <TabPanel
          sx={{ padding: 0, borderTop: (theme) => `1px solid ${alpha(theme.palette.green[800], 0.1)}` }}
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
