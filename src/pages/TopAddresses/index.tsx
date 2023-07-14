import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, alpha } from "@mui/material";
import React, { useEffect } from "react";

import Card from "src/components/commons/Card";
import TopAddressesByADABalance from "src/components/TopAddresses/ByADABalance";
import TopAddressesByAmountStaked from "src/components/TopAddresses/ByAmountStaked";

import { StyledContainer, TabTitle } from "./styles";

const TopAddresses = () => {
  const [tabActive, setTabActive] = React.useState<"ada-balance" | "amount-staked">("ada-balance");

  useEffect(() => {
    document.title = `Top Addresses | Cardano Explorer`;
  }, []);

  const handleChange = (event: React.SyntheticEvent, tab: "ada-balance" | "amount-staked") => {
    setTabActive(tab);
  };

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <TabTitle className={tabActive === "ada-balance" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <Box>By Address ADA Balance</Box>
          </Box>
        </TabTitle>
      ),
      key: "ada-balance",
      children: <TopAddressesByADABalance />
    },
    {
      label: (
        <TabTitle className={tabActive === "amount-staked" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <Box>By Amount Staked</Box>
          </Box>
        </TabTitle>
      ),
      key: "amount-staked",
      children: <TopAddressesByAmountStaked />
    }
  ];

  return (
    <TabContext value={tabActive}>
      <StyledContainer>
        <Card title={"Top ADA Holders"}>
          <Box>
            <TabList
              onChange={handleChange}
              TabIndicatorProps={{ sx: { background: (theme) => theme.palette.primary.main, height: 3 } }}
            >
              {tabs?.map((item) => (
                <Tab
                  key={item.key}
                  label={item.label}
                  value={item.key}
                  sx={{
                    padding: "12px 0px",
                    marginRight: "24px"
                  }}
                />
              ))}
            </TabList>
          </Box>
          {tabs.map((item) => (
            <TabPanel
              sx={{ padding: 0, borderTop: (theme) => `1px solid ${alpha(theme.palette.green[300], 0.1)}` }}
              key={item.key}
              value={item.key}
            >
              {item.children}
            </TabPanel>
          ))}
        </Card>
      </StyledContainer>
    </TabContext>
  );
};

export default TopAddresses;
