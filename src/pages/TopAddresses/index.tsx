import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, alpha, useTheme } from "@mui/material";
import React, { useEffect } from "react";

import Card from "src/components/commons/Card";
import TopAddressesByADABalance from "src/components/TopAddresses/ByADABalance";
import TopAddressesByAmountStaked from "src/components/TopAddresses/ByAmountStaked";
import { ADAbalanceIcon, ClockIcon } from "src/commons/resources";

import { StyledContainer, TabTitle } from "./styles";

const TopAddresses = () => {
  const [tabActive, setTabActive] = React.useState<"ada-balance" | "amount-staked">("ada-balance");
  const theme = useTheme();
  useEffect(() => {
    document.title = `Top Addresses | Cardano Explorer`;
  }, []);

  const handleChange = (event: React.SyntheticEvent, tab: "ada-balance" | "amount-staked") => {
    setTabActive(tab);
  };
  const tabs: {
    label: string;
    key: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    children: React.ReactNode;
  }[] = [
    {
      label: "By Address ADA Balance",
      key: "ada-balance",
      icon: ADAbalanceIcon,
      children: <TopAddressesByADABalance />
    },
    {
      label: "By Amount Staked",
      key: "amount-staked",
      icon: ClockIcon,
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
              {tabs?.map(({ key, icon: Icon, label }) => (
                <Tab
                  key={key}
                  label={
                    <Box display={"flex"} alignItems="center">
                      <Icon fill={key === tabActive ? theme.palette.green[700] : theme.palette.grey[500]} />
                      <TabTitle className={tabActive === "ada-balance" ? "active" : ""}>
                        <Box>{label}</Box>
                      </TabTitle>
                    </Box>
                  }
                  value={key}
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
              sx={{ padding: 0, borderTop: (theme) => `1px solid ${alpha(theme.palette.green[800], 0.1)}` }}
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
