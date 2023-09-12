import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Card from "src/components/commons/Card";
import TopAddressesByADABalance from "src/components/TopAddresses/ByADABalance";
import TopAddressesByAmountStaked from "src/components/TopAddresses/ByAmountStaked";
import { DelegationHistoryIcon, StakeKeyHistoryIcon } from "src/commons/resources";

import { StyledContainer, TabTitle } from "./styles";

const TopAddresses = () => {
  const { t } = useTranslation();
  const [tabActive, setTabActive] = React.useState<"ada-balance" | "amount-staked">("ada-balance");
  const theme = useTheme();
  useEffect(() => {
    document.title = `Top Addresses | Cardano Blockchain Explorer`;
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
      label: t("adrress.byAddressADABalance"),
      key: "ada-balance",
      icon: DelegationHistoryIcon,
      children: <TopAddressesByADABalance />
    },
    {
      label: t("address.byAmountStaked"),
      key: "amount-staked",
      icon: StakeKeyHistoryIcon,
      children: <TopAddressesByAmountStaked />
    }
  ];

  return (
    <TabContext value={tabActive}>
      <StyledContainer>
        <Card title={t("glossary.topAdaHolder")}>
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
                      <Icon fill={key === tabActive ? theme.palette.primary.main : theme.palette.secondary.light} />
                      <TabTitle className={key === tabActive ? "active" : ""}>
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
              sx={{ padding: 0, borderTop: (theme) => `1px solid ${theme.palette.primary[200]}` }}
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
